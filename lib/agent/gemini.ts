import { GoogleGenerativeAI } from '@google/generative-ai';

/** Optional Gemini enhancement. Callers must validate returned JSON with Zod and
 * retain deterministic agent output whenever Gemini is unavailable or malformed. */
export async function geminiJson<T>(prompt:string):Promise<T|null>{
  const key=process.env.GEMINI_API_KEY;
  if(!key) return null;
  try {
    const client=new GoogleGenerativeAI(key);
    const model=client.getGenerativeModel({model:process.env.GEMINI_MODEL||'gemini-3.5-flash-lite'});
    const response=await model.generateContent(prompt);
    const text=response.response.text().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
    return JSON.parse(text) as T;
  } catch { return null; }
}

export async function checkGemini(){
  const key=process.env.GEMINI_API_KEY;
  const modelName=process.env.GEMINI_MODEL||'gemini-3.5-flash-lite';
  if(!key)return {ok:false,model:modelName,error:'GEMINI_API_KEY is not configured'};
  try { const client=new GoogleGenerativeAI(key); const model=client.getGenerativeModel({model:modelName}); await model.generateContent('Reply with the single word: ready'); return {ok:true,model:modelName}; }
  catch(error){const message=error instanceof Error?error.message:'Unknown Gemini error';return {ok:false,model:modelName,error:message.replaceAll(key,'[redacted]').slice(0,300)};}
}
