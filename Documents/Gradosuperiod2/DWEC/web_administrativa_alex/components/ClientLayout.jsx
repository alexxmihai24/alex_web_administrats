'use client';

import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}
