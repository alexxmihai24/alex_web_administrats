'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ChatBox({ slug }) {
    const { t } = useLanguage();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll al último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Agregar mensaje del usuario
        setMessages(prev => [...prev, {
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        }]);

        setIsLoading(true);

        try {
            // Llamar a la API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    slug: slug
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ Error API:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                });

                // Manejo de errores HTTP específicos
                if (response.status === 500) {
                    throw new Error('connection');
                } else if (response.status === 404) {
                    throw new Error('notfound');
                } else {
                    throw new Error(`general (${response.status})`);
                }
            }

            const data = await response.json();

            // Verificar si hay error en la respuesta
            if (data.error) {
                throw new Error('connection');
            }

            // Agregar respuesta de la IA
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response,
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error('Error:', error);

            // Mensajes de error específicos según el tipo
            let errorMessage = t.chat.errorGeneral;

            if (error.message === 'connection' || error.message === 'Failed to fetch') {
                errorMessage = t.chat.errorConnection;
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage,
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
            {/* Header del Chat */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-wide">{t.chat.title}</h2>
                        <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">AI Assistant</p>
                    </div>
                </div>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-950/50" style={{ maxHeight: "400px", minHeight: "300px" }}>
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <svg className="w-12 h-12 mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium">{t.chat.placeholder}</p>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm ${message.role === 'user'
                                        ? 'bg-gradient-to-tr from-blue-600 to-indigo-700 text-white rounded-tr-sm'
                                        : message.isError
                                            ? 'bg-red-900/50 text-red-200 border border-red-500/30'
                                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                                        }`}
                                >
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                                    <span className="text-[10px] opacity-50 mt-1 block text-right font-mono">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 shadow-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex space-x-1">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input de Mensaje */}
            <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-slate-700">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t.chat.placeholder}
                        disabled={isLoading}
                        className="flex-grow px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 text-white placeholder-slate-500 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white w-12 h-12 rounded-xl shadow-lg hover:shadow-blue-500/25 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                        <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
