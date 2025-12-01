import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateWebinarResponse = async (
  history: ChatMessage[], 
  newMessage: string,
  contextData: string
): Promise<string> => {
  if (!API_KEY) {
    return "חסר מפתח API. אנא וודא שהגדרת את process.env.API_KEY";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the prompt with context
    const systemPrompt = `
      אתה עוזר וירטואלי חכם לפלטפורמת וובינרים בשם "תקשור".
      המטרה שלך היא לעזור למשתמשים להבין את התוכן של הוובינר, לענות על שאלות ולסכם נושאים.
      
      הקשר הנוכחי של הוובינר:
      ${contextData}
      
      הנחיות:
      1. ענה תמיד בעברית רהוטה ומקצועית.
      2. היה קצר ולעניין אלא אם כן נשאלת שאלה מורכבת.
      3. אם אינך יודע את התשובה על סמך ההקשר, אמור זאת בנימוס והצע מידע כללי.
      4. שמור על טון מכבד, רגוע ותומך.
    `;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
      history: history
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "מצטער, לא הצלחתי לייצר תשובה כרגע.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "אירעה שגיאה בתקשורת עם השרת. אנא נסה שנית מאוחר יותר.";
  }
};

export const generateSummary = async (webinarDescription: string, topics: string[]): Promise<string> => {
   if (!API_KEY) return "חסר מפתח API.";

   try {
     const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: `
         צור סיכום קצר, מובנה ומזמין עבור וובינר בנושאים הבאים: ${topics.join(', ')}.
         תיאור הוובינר: ${webinarDescription}.
         הסיכום צריך להיות בעברית, מחולק לנקודות עיקריות (בולטים).
       `
     });
     return response.text || "לא ניתן היה לייצר סיכום.";
   } catch (error) {
     console.error("Gemini Summary Error:", error);
     return "שגיאה ביצירת סיכום.";
   }
}