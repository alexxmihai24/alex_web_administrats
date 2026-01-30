/**
 * Script de seed para insertar los 4 trámites iniciales en la base de datos
 * 
 * Para ejecutar este script:
 * 1. Asegúrate de que tu .env tiene la conexión correcta a Neon.tech
 * 2. Ejecuta: npx prisma db push (para crear las tablas)
 * 3. Ejecuta: node prisma/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...\n');

    // Datos de los 4 trámites con descripciones completas
    const tramites = [
        {
            nombre: 'SEPE',
            slug: 'sepe',
            descripcion: 'El Servicio Público de Empleo Estatal (SEPE) gestiona las prestaciones por desempleo en España. Los trámites principales incluyen: solicitud de prestación por desempleo, renovación mensual (sellar el paro), consulta de ofertas de empleo, obtención de certificados de prestaciones, y acceso a cursos de formación y capacitación profesional. Requiere estar inscrito como demandante de empleo y cumplir con los requisitos de cotización.',
        },
        {
            nombre: 'Hacienda',
            slug: 'hacienda',
            descripcion: 'La Agencia Tributaria (Hacienda) gestiona obligaciones fiscales y tributarias en España. Principales servicios: Declaración de la Renta (IRPF) anual, obtención y renovación de certificados digitales, consulta de datos fiscales, gestión del IVA para autónomos, Impuesto de Sociedades, devoluciones tributarias, y trámites relacionados con la Sede Electrónica. Es esencial para cumplir con las obligaciones tributarias de personas físicas y jurídicas.',
        },
        {
            nombre: 'Seguridad Social',
            slug: 'seguridad-social',
            descripcion: 'La Seguridad Social española gestiona la protección social de los trabajadores. Servicios principales: consulta de vida laboral (informe de cotizaciones), solicitud de afiliación y número de la seguridad social, trámites de jubilación y pensiones, gestión de incapacidad temporal y permanente, obtención de certificados, tarjeta sanitaria, y prestaciones familiares. Es fundamental para trabajadores por cuenta ajena y autónomos.',
        },
        {
            nombre: 'Consulados',
            slug: 'consulados',
            descripcion: 'Los Consulados de España en el extranjero ofrecen servicios a ciudadanos españoles fuera del país. Servicios principales: solicitud y renovación de pasaportes, trámites de visados, inscripción en el Registro de Matrícula Consular, certificados consulares (nacimiento, defunción, matrimonio), legalización de documentos, asesoramiento jurídico básico, y asistencia en situaciones de emergencia. Esencial para españoles residentes en el extranjero y extranjeros que desean viajar a España.',
        },
    ];

    console.log('📝 Insertando trámites...');

    // Insertar cada trámite
    for (const tramite of tramites) {
        const created = await prisma.tramite.upsert({
            where: { slug: tramite.slug },
            update: tramite,
            create: tramite,
        });
        console.log(`✅ Trámite creado/actualizado: ${created.nombre} (${created.slug})`);
    }

    console.log('\n✨ Seed completado exitosamente!\n');

    // Mostrar estadísticas
    const totalTramites = await prisma.tramite.count();
    const totalConsultas = await prisma.consulta.count();

    console.log('📊 Estadísticas de la base de datos:');
    console.log(`   - Total de trámites: ${totalTramites}`);
    console.log(`   - Total de consultas: ${totalConsultas}`);
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
