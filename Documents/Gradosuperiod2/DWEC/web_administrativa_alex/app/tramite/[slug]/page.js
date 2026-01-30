'use client';

import { use } from 'react';
import Link from 'next/link';
import ChatBox from '@/components/ChatBox';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { useLanguage } from '@/lib/LanguageContext';
import { CONTACT_CONFIG } from '@/lib/contact-config';

export default function TramitePage({ params }) {
    // Desempaquetar params (Next.js 15 los hace asíncronos)
    const { slug } = use(params);
    const { t, tramites } = useLanguage();

    const tramite = tramites[slug] || {
        titulo: 'Trámite no encontrado',
        descripcion: 'El trámite solicitado no existe',
        contenido: []
    };

    // Crear mensaje personalizado para WhatsApp (para el botón del sidebar)
    const whatsappMessage = encodeURIComponent(
        `Hola, necesito ayuda con el trámite de ${tramite.titulo}`
    );
    const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-12 text-blue-50">
            <FloatingWhatsApp tramiteTitulo={tramite.titulo} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                        {t.tramitePage.breadcrumb.home}
                    </Link>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-400">{t.tramitePage.breadcrumb.tramites}</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-white font-semibold">{tramite.titulo}</span>
                </nav>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-2xl shadow-2xl p-6 md:p-12 mb-8 text-white border border-blue-500/20 backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                        {tramite.titulo}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-200/90">
                        {tramite.descripcion}
                    </p>
                </div>

                {/* Contenido Principal - Chat ocupa la mayor parte */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna Principal - ChatBox */}
                    <div className="lg:col-span-2">
                        <ChatBox slug={slug} />
                    </div>

                    {/* Sidebar - Info adicional */}
                    <div className="space-y-6">
                        {/* Botón destacado de WhatsApp del Sidebar (Mantenemos como opción secundaria visible) */}
                        <div className="bg-slate-900/80 rounded-2xl shadow-xl p-6 border border-green-500/30 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                                ¿Necesitas Ayuda Personalizada?
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 text-center">
                                Contáctame directamente por WhatsApp para resolver tus dudas
                            </p>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
                            >
                                {/* Icono de WhatsApp */}
                                <svg
                                    className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span className="text-lg">Contactar por WhatsApp</span>
                            </a>
                        </div>

                        {/* Trámites disponibles */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {t.tramitePage.available}
                            </h2>
                            <ul className="space-y-3">
                                {tramite.contenido.map((item, index) => (
                                    <li key={index} className="flex items-start space-x-2 group">
                                        <div className="shrink-0 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Enlaces útiles */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                </svg>
                                {t.tramitePage.officialLinks}
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center">
                                        <span className="mr-2">→</span>
                                        {t.tramitePage.official}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center">
                                        <span className="mr-2">→</span>
                                        {t.tramitePage.electronic}
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center">
                                        <span className="mr-2">→</span>
                                        {t.tramitePage.guides}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Consejos */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {t.tramitePage.tips}
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{t.tramitePage.tip1}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{t.tramitePage.tip2}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{t.tramitePage.tip3}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
