require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("🔍 Buscando modelos disponibles...");
    try {
        // En la versión actual de la librería, listModels() puede no estar expuesto directamente 
        // o requerir rest. Vamos a probar un fetch directo limpio para listar.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log("\n✅ MODELOS DISPONIBLES PARA TU KEY:");
            data.models.forEach(model => {
                // Filtramos solo los que sirven para generar contenido (chat)
                if (model.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`👉 ${model.name.replace('models/', '')}`);
                }
            });
        } else {
            console.error("❌ No se recibieron modelos:", data);
        }
    } catch (error) {
        console.error("❌ Error listando modelos:", error.message);
    }
}

listModels();
