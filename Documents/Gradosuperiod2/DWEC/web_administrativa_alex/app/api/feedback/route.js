import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const { consultaId, rating, comentario } = await request.json();

        if (!consultaId || !rating) {
            return NextResponse.json(
                { error: 'Faltan parámetros requeridos' },
                { status: 400 }
            );
        }

        // Validar rating (1-5)
        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: 'Rating debe ser entre 1 y 5' },
                { status: 400 }
            );
        }

        // Guardar el feedback
        const feedback = await prisma.feedback.create({
            data: {
                consultaId: parseInt(consultaId),
                rating: parseInt(rating),
                comentario: comentario || null,
            },
        });

        console.log(`👍 Feedback recibido: ${rating}/5 estrellas para consulta #${consultaId}`);

        return NextResponse.json({
            success: true,
            feedbackId: feedback.id,
            message: 'Gracias por tu feedback'
        });

    } catch (error) {
        console.error('Error al guardar feedback:', error);

        return NextResponse.json(
            { error: 'Error al guardar el feedback', details: error.message },
            { status: 500 }
        );
    }
}
