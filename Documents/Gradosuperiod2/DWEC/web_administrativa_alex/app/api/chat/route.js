import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request) {
    try {
        const { message, slug } = await request.json();

        if (!message || !slug) {
            return NextResponse.json(
                { error: 'Faltan parámetros requeridos' },
                { status: 400 }
            );
        }

        // Consultar información del trámite en la base de datos
        const tramite = await prisma.tramite.findUnique({
            where: { slug: slug }
        });

        if (!tramite) {
            return NextResponse.json(
                { error: 'Trámite no encontrado' },
                { status: 404 }
            );
        }

        // System Instructions para Gemini - Comportamiento profesional
        const systemInstructions = `Eres un experto en trámites administrativos de España. 
Tu objetivo es ayudar al usuario con el trámite solicitado utilizando la información que te proporciono de la base de datos.

NORMAS IMPORTANTES:
1. Responde de forma clara, estructurada y profesional
2. Usa listas numeradas o con viñetas cuando sea apropiado
3. Si te preguntan algo fuera de temas administrativos, di amablemente: "Lo siento, solo puedo ayudarte con trámites administrativos en España"
4. Siempre basa tus respuestas en información oficial y actualizada
5. Si no estás seguro de algo, indícalo claramente
6. Menciona documentos necesarios, plazos y requisitos cuando sea relevante
7. Al final de cada respuesta importante, recuerda al usuario: "💡 Si necesitas ayuda personalizada, un experto puede hacerlo por ti. Usa el botón 'Habla con nosotros' en esta página."

INFORMACIÓN DEL TRÁMITE ACTUAL:
- Nombre: ${tramite.nombre}
- Descripción: ${tramite.descripcion || 'Trámite administrativo en España'}`;

        // Crear el prompt completo
        const prompt = `${systemInstructions}

PREGUNTA DEL USUARIO: ${message}

RESPUESTA (clara, estructurada y profesional):`;

        // Llamar a Gemini AI con configuración optimizada
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.7,  // Balance entre creatividad y precisión
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 1024,
            },
        });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const aiResponse = response.text();

        // Guardar la consulta en la base de datos
        await prisma.consulta.create({
            data: {
                mensajeUsuario: message,
                respuestaIA: aiResponse,
            },
        });

        return NextResponse.json({
            response: aiResponse,
            tramite: tramite.nombre,
        });

    } catch (error) {
        console.error('Error en la API de chat:', error);

        // Mensaje de error más específico
        if (error.message && error.message.includes('API key')) {
            return NextResponse.json(
                { error: 'API key de Gemini no configurada. Por favor, configura GEMINI_API_KEY en las variables de entorno.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Error al procesar la solicitud', details: error.message },
            { status: 500 }
        );
    }
}
