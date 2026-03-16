import { ai } from './src/lib/genkit-config';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing genkit model:', ai.model);

async function testGenkit() {
  try {
    const prompt = 'Tell me a short joke.';
    console.log(`Sending prompt: "${prompt}"`);
    
    // According to Genkit docs, ai.generate takes an object with prompt property usually, but passing a string might work.
    const result = await ai.generate(prompt);
    console.log('Result:', result.text);
  } catch (error) {
    console.error('Genkit Generate Error:', error);
  }
}

testGenkit();
