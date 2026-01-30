'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
    const { language, changeLanguage, t } = useLanguage();

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-all duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-2xl font-bold text-white tracking-tight group-hover:text-yellow-300 transition-colors duration-300 line-clamp-1">
                                {t.navbar.title}
                            </span>
                            <span className="hidden sm:inline-block text-xs text-blue-200 font-medium">{t.navbar.subtitle}</span>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-6">
                        {/* Language Selector */}
                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-lg p-2">
                            <button
                                onClick={() => changeLanguage('es')}
                                className={`px-3 py-1 rounded-md font-medium transition-all duration-300 ${language === 'es'
                                    ? 'bg-yellow-400 text-blue-900 shadow-md'
                                    : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                🇪🇸 ES
                            </button>
                            <button
                                onClick={() => changeLanguage('ro')}
                                className={`px-3 py-1 rounded-md font-medium transition-all duration-300 ${language === 'ro'
                                    ? 'bg-yellow-400 text-blue-900 shadow-md'
                                    : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                🇷🇴 RO
                            </button>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/" className="text-white hover:text-yellow-300 font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10">
                                {t.navbar.home}
                            </Link>
                            <Link href="/about" className="text-white hover:text-yellow-300 font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10">
                                {t.navbar.about}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
