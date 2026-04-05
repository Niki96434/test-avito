import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

export const getAiHelp = async (
    task: 'price' | 'description',
    currentData: { title: string; category: string; description?: string }
) => {
    try {
        const prompts = {
            price: `Ты эксперт по рынку б/у товаров в России. Оцени среднюю рыночную стоимость в рублях для: 
                    Товар: ${currentData.title}, Категория: ${currentData.category}. 
                    Верни ТОЛЬКО ОДНО ЧИСЛО без текста, пробелов и валюты.`,

            description: `Ты профессиональный копирайтер сервиса Авито. 
                          Улучши описание товара, сделай его продающим, честным и структурированным.
                          Название: ${currentData.title}, Категория: ${currentData.category}.
                          Текущее описание: ${currentData.description || 'отсутствует'}. 
                          Верни только готовый текст нового описания без лишних комментариев от себя.`
        };

        const result = await model.generateContent(prompts[task]);
        const response = result.response;
        return response.text();

    } catch (error) {
        console.error("Ошибка при обращении к ИИ:", error);
        return task === 'price' ? "0" : "Не удалось сгенерировать описание";
    }
};
