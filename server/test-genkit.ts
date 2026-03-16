import { ai } from './src/lib/genkit-config';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing genkit model:', ai.model);

async function testGenkit() {
  try {
    const prompt = 'Tell me a short joke.';
    
    const result = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: prompt
    });
    console.log('Result:', result.text);
  } catch (error) {
    console.error('Genkit Generate Error:', error);
  }
}

testGenkit();
