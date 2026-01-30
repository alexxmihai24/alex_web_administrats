import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';
import { findSimilarQueries, buildRAGContext } from '@/lib/ragHelpers';

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

        // 🧠 RAG: Encontrar consultas similares previas
        const similarQueries = await findSimilarQueries(prisma, message, slug, 3);
        const ragContext = buildRAGContext(similarQueries);

        console.log(`📚 RAG: Encontradas ${similarQueries.length} consultas similares para "${message.substring(0, 50)}..."`);

        // System Instructions para Gemini - Comportamiento profesional y personalizado
        const systemInstructions = `Eres un experto senior en trámites administrativos de España (Gestor Administrativo Colegiado).
Tu objetivo es ayudar al usuario con el trámite de **${tramite.nombre}** de forma efectiva.

PERSONALIDAD REQUERIDA PARA ESTE TRÁMITE (${tramite.nombre}):
${tramite.nombre.includes('Hacienda') ? '- Tono: Serio, preciso y enfocado en evitar multas. Los plazos son sagrados.' : ''}
${tramite.nombre.includes('Consulado') || tramite.nombre.includes('Extranjería') ? '- Tono: Empático, tranquilizador y claro. Muchos usuarios son extranjeros y pueden estar estresados con su residencia.' : ''}
${tramite.nombre.includes('SEPE') || tramite.nombre.includes('Empleo') ? '- Tono: Motivador pero realista. Enfocado en derechos del trabajador y prestaciones.' : ''}
${tramite.nombre.includes('Seguridad Social') ? '- Tono: Servicial y paciente. La burocracia aquí es compleja.' : ''}
- Si no encaja en los anteriores: Tono profesional, eficiente y resolutivo.

NORMAS IMPORTANTES:
1. Responde de forma clara, estructurada y profesional.
2. Usa emojis para hacer la lectura más amena (ej: 📄, 📅, 💰).
3. Si te preguntan algo fuera de temas administrativos, deriva educadamente al tema.
4. Siempre basa tus respuestas en normativa española vigente.
5. Menciona documentos necesarios y plazos claramente.
6. OBLIGATORIO: AL FINAL DE TU RESPUESTA, SIEMPRE AÑADE ESTE TEXTO EXACTO (con saltos de línea):
   
   "\n\n✨ **¿Te parece complicado?**\n👉 **Pincha en el icono de WhatsApp verde de la esquina** y yo me encargo de todo personalmente. ¡Sin citas previas ni esperas!"

INFORMACIÓN ADICIONAL DEL TRÁMITE:
- Descripción: ${tramite.descripcion || 'Trámite administrativo en España'}

${ragContext}`;

        // Crear el prompt completo (REST DIRECTO)
        const fullPrompt = `${systemInstructions}\n\nPREGUNTA DEL USUARIO: ${message}\n\nRESPUESTA (clara, estructurada y profesional):`;

        let aiResponse = "";

        try {
            console.log('📡 Conectando con Gemini API (Librería Oficial)...');

            // Usamos modelo gemini-2.0-flash-exp (Versión experimental más reciente)
            // La librería gestiona automáticamente el endpoint correcto
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-exp",
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            });

            const result = await model.generateContent(fullPrompt);
            const response = result.response;
            aiResponse = response.text();

        } catch (geminiError) {
            console.error('⚠️ Error conectando con Gemini (REST), usando respuesta de contingencia:', geminiError.message);

            // RESPUESTA DE CONTINGENCIA (FALLBACK)
            aiResponse = `[MODO SIN CONEXIÓN - REST] Lo siento, en este momento tengo dificultades para conectar con mi cerebro de IA, pero puedo darte información básica sobre **${tramite.nombre}**.

${tramite.descripcion}

**Trámites comunes:**
${tramite.nombre === 'Consulados' ? '- Renovación de pasaporte\n- Solicitud de visados\n- Registro de matrícula consular' : ''}
${tramite.nombre === 'SEPE' ? '- Solicitud de paro\n- Renovación de demanda\n- Cursos de formación' : ''}
${tramite.nombre === 'Seguridad Social' ? '- Vida laboral\n- Altas y bajas\n- Tarjeta Sanitaria Europea' : ''}
${tramite.nombre === 'Hacienda' ? '- Declaración de la Renta\n- Certificados tributarios\n- Alta de autónomos' : ''}

💡 Para una ayuda más personalizada, por favor usa el botón de **WhatsApp** que verás en esta página para hablar con un agente humano.`;
        }

        // Guardar la consulta en la base de datos
        let consultaId = null;
        try {
            const nuevaConsulta = await prisma.consulta.create({
                data: {
                    slug: slug,
                    mensajeUsuario: message,
                    respuestaIA: aiResponse,
                },
            });
            consultaId = nuevaConsulta.id;
        } catch (dbError) {
            console.error('Error al guardar en base de datos:', dbError);
        }

        return NextResponse.json({
            response: aiResponse,
            tramite: tramite.nombre,
            consultaId: consultaId,
            ragInfo: {
                similarQueriesFound: similarQueries.length,
                usedRAG: similarQueries.length > 0
            }
        });

    } catch (error) {
        console.error('🔥 Error CRÍTICO en API chat:', error);

        return NextResponse.json(
            {
                error: 'Error interno del servidor',
                details: error.message
            },
            { status: 500 }
        );
    }
}
