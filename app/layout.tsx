import './globals.css';
import Link from 'next/link';
import { Heart } from 'lucide-react'; import { Breadcrumbs } from '@/components/Breadcrumbs'; import { DemoTour } from '@/components/DemoTour';
export const metadata={title:'Pairwise Agents',description:'Consent-first agentic dating demo'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className="grid-bg"><nav className="shell flex h-20 items-center justify-between"><Link href="/" className="flex items-center gap-2 font-bold text-lg"><span className="rounded-xl bg-rose p-2"><Heart size={18}/></span>Pairwise Agents</Link><div className="flex gap-5 text-sm muted"><Link href="/demo">Demo</Link><Link href="/my-participants">My participants</Link><Link href="/rankings">Rankings</Link><Link href="/onboard">Add participant</Link></div></nav><Breadcrumbs/>{children}<DemoTour/></body></html> }
