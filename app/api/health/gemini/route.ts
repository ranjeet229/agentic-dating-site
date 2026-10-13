import { NextResponse } from 'next/server';
import { checkGemini } from '@/lib/agent/gemini';

export async function GET(){
  const result=await checkGemini();
  return NextResponse.json(result,{status:result.ok?200:503});
}
