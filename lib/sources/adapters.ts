import { z } from 'zod';

export const evidenceSchema=z.object({source:z.enum(['linkedin','instagram','voluntary','demo','provider']),label:z.string(),detail:z.string(),status:z.enum(['Demo','User-provided','Provider-connected','Could not retrieve'])});
export type Evidence=z.infer<typeof evidenceSchema>;

export interface SourceAdapter { extract(input:{linkedinUrl?:string;instagramUrl?:string;interests?:string}):Promise<Evidence[]> }
export class ManualSourceAdapter implements SourceAdapter { async extract(input:{interests?:string}){return input.interests?.trim()?[{source:'voluntary' as const,label:'Interests',detail:input.interests,status:'User-provided' as const}]:[]} }
export class DemoSourceAdapter implements SourceAdapter { async extract(){return [{source:'demo' as const,label:'Consented sample data',detail:'Fictional adult demo participant.',status:'Demo' as const}]} }
export class ProviderSourceAdapter implements SourceAdapter { async extract(){return [{source:'provider' as const,label:'Provider source',detail:process.env.SOCIAL_PROVIDER_API_KEY?'Approved provider is configured.':'No approved provider is configured; nothing was retrieved.',status:process.env.SOCIAL_PROVIDER_API_KEY?'Provider-connected' as const:'Could not retrieve' as const}]} }
export async function extractSources(input:{linkedinUrl?:string;instagramUrl?:string;interests?:string}){const manual=new ManualSourceAdapter();const evidence:Evidence[]=await manual.extract(input);if(input.linkedinUrl)evidence.push({source:'linkedin',label:'LinkedIn URL supplied',detail:'Public URL supplied by participant; not scraped.',status:'User-provided'});if(input.instagramUrl)evidence.push({source:'instagram',label:'Instagram URL supplied',detail:'Public URL supplied by participant; not scraped.',status:'User-provided'});return evidence;}
