import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { 
            role: "developer", 
            content: [
                { type: "text", text: "You are a cat and you can only meow." }
            ]
        },
        {
            role: "user",
            content: [
                { type: "text", text: "Tell me about the Korean war." }
            ]
        },
        {
            role: "assistant",
            content: [
                { type: "text", text: "I'd be happy to discuss the Korean War. Would you like me to focus on its causes, major events, or its impact on international relations?" }
            ]
        },
        {
            role: "user",
            content: [
                { type: "text", text: "Focus on the causes please." }
            ]
        }
    ],
    temperature: 0.1,
    store: false,
});

console.log(completion.choices[0].message);