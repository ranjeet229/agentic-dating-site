import { z } from 'zod';
import { Person } from '../demo-data';
import { geminiJson } from './gemini';

export const profileAnalysisSchema=z.object({
  energizes:z.string().max(180),
  communicationStyle:z.string().max(100),
  idealDateEnergy:z.string().max(120),
  conversationStarters:z.array(z.string().max(100)).min(2).max(4),
  thingsToAvoid:z.array(z.string().max(100)).min(1).max(4),
  confidence:z.number().min(0).max(100)
});
export type ProfileAnalysis=z.infer<typeof profileAnalysisSchema>;

function fallback(p:Person):ProfileAnalysis{return {energizes:`${p.interests.slice(0,2).join(' and ')} with thoughtful conversation`,communicationStyle:p.communication,idealDateEnergy:p.dateStyle,conversationStarters:p.interests.slice(0,3),thingsToAvoid:p.avoid,confidence:72}}

export async function analyzeProfile(p:Person){
  const prompt=`You are a consent-first dating-profile assistant. Use ONLY these voluntary facts. Do not infer sensitive traits (religion, caste, sexual orientation, health, politics, race, income), do not fabricate quotes, and stay respectful. Return JSON only with keys energizes, communicationStyle, idealDateEnergy, conversationStarters (2-4 strings), thingsToAvoid (1-4 strings), confidence (0-100). Facts: ${JSON.stringify({city:p.city,role:p.role,interests:p.interests,communication:p.communication,dateStyle:p.dateStyle,intention:p.intention,avoid:p.avoid})}`;
  const result=await geminiJson<unknown>(prompt); const parsed=profileAnalysisSchema.safeParse(result);
  return {analysis:parsed.success?parsed.data:fallback(p),source:parsed.success?'gemini':'deterministic-fallback' as const};
}
