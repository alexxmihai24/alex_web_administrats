// Función para calcular similitud entre dos textos (búsqueda simple)
export function calculateSimilarity(text1, text2) {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);

    const commonWords = words1.filter(word =>
        words2.includes(word) && word.length > 3 // Solo palabras de más de 3 letras
    );

    return commonWords.length / Math.max(words1.length, words2.length);
}

// Función para encontrar consultas similares previas (RAG)
export async function findSimilarQueries(prisma, currentMessage, slug, limit = 3) {
    try {
        // Obtener todas las consultas del mismo trámite
        const allQueries = await prisma.consulta.findMany({
            where: {
                slug: slug,
                respuestaIA: { not: null }, // Solo consultas con respuesta
            },
            orderBy: {
                timestamp: 'desc'
            },
            take: 50 // Últimas 50 consultas para analizar
        });

        // Calcular similitud con cada consulta
        const queriesWithSimilarity = allQueries.map(query => ({
            ...query,
            similarity: calculateSimilarity(currentMessage, query.mensajeUsuario)
        }));

        // Ordenar por similitud y tomar las top N
        const similarQueries = queriesWithSimilarity
            .filter(q => q.similarity > 0.2) // Mínimo 20% de similitud
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, limit);

        return similarQueries;
    } catch (error) {
        console.error('Error finding similar queries:', error);
        return [];
    }
}

// Función para construir contexto RAG
export function buildRAGContext(similarQueries) {
    if (similarQueries.length === 0) {
        return '';
    }

    let context = '\n\nCONSULTAS PREVIAS SIMILARES (aprende de estas respuestas):\n\n';

    similarQueries.forEach((query, index) => {
        context += `--- Consulta ${index + 1} (similitud: ${(query.similarity * 100).toFixed(0)}%) ---\n`;
        context += `Usuario preguntó: ${query.mensajeUsuario}\n`;
        context += `Respondiste: ${query.respuestaIA}\n\n`;
    });

    context += 'Usa estas consultas previas como referencia para mejorar tu respuesta actual.\n';
    context += 'Si la pregunta es muy similar, puedes adaptar la respuesta previa.\n\n';

    return context;
}
