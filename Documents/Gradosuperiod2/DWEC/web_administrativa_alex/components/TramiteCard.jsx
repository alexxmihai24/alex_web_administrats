import Link from 'next/link';

export default function TramiteCard({ titulo, descripcion, slug, icono }) {
    return (
        <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-400 transform hover:-translate-y-2">
            {/* Efecto de brillo al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative p-8 space-y-6">
                {/* Icono */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {icono}
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {titulo}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 leading-relaxed min-h-[4rem]">
                    {descripcion}
                </p>

                {/* Botón */}
                <Link
                    href={`/tramite/${slug}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn"
                >
                    <span>Consultar</span>
                    <svg
                        className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Borde decorativo animado */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
    );
}
