import mongoose from 'mongoose';
const uri=process.env.MONGODB_URI; let cached=(global as typeof globalThis & {mongooseConn?:Promise<typeof mongoose>}).mongooseConn;
export async function connectDb(){if(!uri) return null;if(!cached) cached=mongoose.connect(uri,{serverSelectionTimeoutMS:4000});try{return await cached}catch{return null}}
