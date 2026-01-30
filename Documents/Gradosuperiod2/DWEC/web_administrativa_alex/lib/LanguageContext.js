'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, tramiteInfo } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('es');

    // Cargar idioma del localStorage al iniciar
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'ro')) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Guardar idioma en localStorage cuando cambia
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const value = {
        language,
        changeLanguage,
        t: translations[language],
        tramites: tramiteInfo[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
