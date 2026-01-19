import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden text-center p-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--color-eucalyptus-50)_0%,_transparent_70%)] opacity-70" />
        
        <div className="z-10 space-y-6 md:space-y-10">
          <p className="text-sm md:text-base uppercase tracking-[0.4em] text-eucalyptus-600 animate-pulse">
            Save The Date
          </p>
          
          <h1 className="text-6xl md:text-9xl font-serif text-eucalyptus-900 leading-none tracking-tight">
            Ana <span className="text-eucalyptus-400 font-light">&</span> Carlos
          </h1>
          
          <div className="w-24 h-[1px] bg-eucalyptus-300 mx-auto" />
          
          <p className="text-2xl md:text-4xl font-light font-serif text-eucalyptus-800">
            10 de Octubre, 2026
          </p>
          
          <div className="pt-12 md:pt-20">
            <Countdown />
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 text-center animate-bounce">
          <span className="text-eucalyptus-400 text-xs tracking-[0.3em] uppercase">Desliza</span>
        </div>
      </section>

      {/* Story / Intro */}
      <section className="py-24 md:py-32 px-4 bg-white text-center relative">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-eucalyptus-800 mb-8">El Comienzo</h2>
          <p className="text-lg md:text-2xl text-eucalyptus-700 leading-relaxed font-light">
            "Lo mejor de la vida es encontrar a alguien que conoce todos tus defectos y aún así piensa que eres increíble."
          </p>
          <p className="text-base text-eucalyptus-600 leading-relaxed">
            Queremos celebrar nuestro amor rodeados de las personas más importantes de nuestras vidas.
          </p>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 md:py-32 px-4 bg-eucalyptus-50/50 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-eucalyptus-400 uppercase tracking-widest text-sm font-semibold">RSVP</span>
            <h2 className="text-4xl md:text-6xl font-serif text-eucalyptus-800 mt-4 mb-6">Confirmar Asistencia</h2>
            <p className="text-eucalyptus-600 max-w-lg mx-auto">
              Te pedimos confirmar antes del 1 de Septiembre para ayudarnos a organizar todo perfecto.
            </p>
          </div>
          <RsvpForm />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-eucalyptus-900 text-eucalyptus-100 py-16 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <h3 className="font-serif text-3xl md:text-5xl mb-6">A & C</h3>
          <p className="font-serif italic text-xl md:text-2xl opacity-80 mb-8">#BodaElite2026</p>
          
          <div className="w-full h-[1px] bg-eucalyptus-800 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-50 gap-4">
             <p>© 2026 Boda Elite. Todos los derechos reservados.</p>
             <Link href="/admin" className="hover:text-white hover:opacity-100 transition-all uppercase tracking-widest text-xs">
                Acceso Admin
             </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
