'use client';

import Link from 'next/link';
import ChatBox from '@/components/ChatBox';
import { useLanguage } from '@/lib/LanguageContext';

export default function TramitePage({ params }) {
    const { slug } = params;
    const { t, tramites } = useLanguage();

    const tramite = tramites[slug] || {
        titulo: 'Trámite no encontrado',
        descripcion: 'El trámite solicitado no existe',
        contenido: []
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                        {t.tramitePage.breadcrumb.home}
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">{t.tramitePage.breadcrumb.tramites}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 font-semibold">{tramite.titulo}</span>
                </nav>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl shadow-2xl p-12 mb-8 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        {tramite.titulo}
                    </h1>
                    <p className="text-xl text-blue-100">
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
