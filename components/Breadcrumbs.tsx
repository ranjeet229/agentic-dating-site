'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const labels:Record<string,string>={demo:'Demo',onboard:'Add participant',rankings:'Rankings',people:'Agent profile',dates:'Agent date'};
export function Breadcrumbs(){
  const pathname=usePathname(); const router=useRouter();
  if(pathname==='/')return null;
  const parts=pathname.split('/').filter(Boolean);
  const items=parts.map((part,index)=>({name:labels[part]|| (parts[index-1]==='people'?'Profile':parts[index-1]==='dates'?'Simulation':part),href:'/'+parts.slice(0,index+1).join('/')}));
  const goBack=()=>window.history.length>1?router.back():router.push('/');
  return <div className="shell mb-8 flex items-center gap-2 py-2 text-sm"><button onClick={goBack} className="flex items-center gap-1 rounded-lg py-1 text-pink-200 transition hover:bg-white/10"><ArrowLeft size={16}/>Back</button>{items.map((item,i)=><span className="flex items-center gap-2" key={item.href}><ChevronRight size={15} className="text-white/30"/><span className={i===items.length-1?'text-white':'muted'}>{item.name}</span></span>)}</div>
}
