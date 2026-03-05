import { Mail, GitHub, Linkedin } from "react-feather";
import { FileText } from "lucide-react";


const RESUME_URL = "https://docs.google.com/document/d/1h_Fyrm2cc0_HqdkOWUQHCLoy9kvQYR2t49BvZBorps4/export?format=pdf";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 px-6 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800">
      <nav className="h-full flex items-center justify-between mx-auto  ">

          <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-95" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="font-mono text-xs text-zinc-500 tracking-widest">AVAILABLE FOR WORK</span>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          {/* Resume button */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs tracking-widest uppercase border border-zinc-700 text-zinc-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors mr-2"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden />
            Resume
          </a>

          <a href="mailto:alecfitzgerald90@gmail.com" className="inline-flex items-center p-2 text-zinc-500 hover:text-zinc-200 transition-colors">
            <Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            <span className="sr-only">Email</span>
          </a>

          <a href="https://github.com/fitzcoderepo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center p-2 text-zinc-500 hover:text-purple-600 transition-colors">
            <GitHub className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            <span className="sr-only">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/alec-fitzgerald-76557b1b7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center p-2 text-zinc-500 hover:text-sky-500 transition-colors">
            <Linkedin className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>

      </nav>
    </header>
  );
}