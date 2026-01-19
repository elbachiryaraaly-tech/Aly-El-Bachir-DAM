"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader2, Check, Music, Utensils, Heart } from "lucide-react";
import clsx from "clsx";

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().min(2, "El apellido es obligatorio"),
  email: z.string().email("Email inválido"),
  attending: z.enum(["yes", "no"], { required_error: "Por favor confirma tu asistencia" }),
  plusOneName: z.string().optional(),
  mealPreference: z.enum(["meat", "fish", "vegan"], { required_error: "Selecciona un menú" }).optional(),
  allergies: z.string().optional(),
  hasKids: z.enum(["yes", "no"]).default("no"),
  kidsDetails: z.string().optional(),
  songRequest: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RsvpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasKids: "no",
    },
  });

  const attending = form.watch("attending");
  const hasKids = form.watch("hasKids");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // In a real app, save to database here
    console.log("RSVP Data:", data);
    
    // Save to local storage for "admin" demo
    const existing = JSON.parse(localStorage.getItem("rsvp_registrations") || "[]");
    localStorage.setItem("rsvp_registrations", JSON.stringify([...existing, { ...data, id: Date.now() }]));

    setIsSubmitting(false);
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-xl shadow-2xl text-center max-w-lg mx-auto border border-eucalyptus-100"
      >
        <div className="w-20 h-20 bg-eucalyptus-100 rounded-full flex items-center justify-center mx-auto mb-6 text-eucalyptus-600">
          <Check size={40} />
        </div>
        <h3 className="text-3xl font-serif text-eucalyptus-800 mb-4">¡Gracias por confirmar!</h3>
        <p className="text-eucalyptus-600 mb-8">
          Estamos contando los días para celebrar contigo. Hemos registrado tu respuesta correctamente.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-sm uppercase tracking-widest text-eucalyptus-500 hover:text-eucalyptus-800 transition-colors border-b border-transparent hover:border-eucalyptus-800 pb-1"
        >
          Enviar otra respuesta
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nombre" error={form.formState.errors.firstName?.message} {...form.register("firstName")} />
        <Input label="Apellido" error={form.formState.errors.lastName?.message} {...form.register("lastName")} />
      </div>

      <Input label="Email" type="email" error={form.formState.errors.email?.message} {...form.register("email")} />

      <div className="space-y-3">
        <label className="block text-sm font-medium uppercase tracking-wider text-eucalyptus-700">¿Podrás acompañarnos?</label>
        <div className="flex gap-4">
          <label className={clsx(
            "flex-1 p-4 border rounded-lg cursor-pointer transition-all text-center",
            attending === "yes" ? "border-eucalyptus-500 bg-eucalyptus-50 text-eucalyptus-900" : "border-gray-200 hover:border-eucalyptus-300"
          )}>
            <input type="radio" value="yes" className="hidden" {...form.register("attending")} />
            <span className="font-serif text-lg">Sí, allí estaré</span>
          </label>
          <label className={clsx(
            "flex-1 p-4 border rounded-lg cursor-pointer transition-all text-center",
            attending === "no" ? "border-eucalyptus-500 bg-eucalyptus-50 text-eucalyptus-900" : "border-gray-200 hover:border-eucalyptus-300"
          )}>
            <input type="radio" value="no" className="hidden" {...form.register("attending")} />
            <span className="font-serif text-lg">No podré asistir</span>
          </label>
        </div>
        {form.formState.errors.attending && <p className="text-red-400 text-xs mt-1">{form.formState.errors.attending.message}</p>}
      </div>

      <AnimatePresence>
        {attending === "yes" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8 overflow-hidden"
          >
            <div className="pt-4 border-t border-eucalyptus-100 space-y-6">
              <h4 className="font-serif text-xl text-eucalyptus-800 flex items-center gap-2">
                <Utensils size={20} className="text-eucalyptus-400" />
                Preferencias
              </h4>
              
              <Input 
                label="Nombre de tu acompañante (+1)" 
                placeholder="Deja en blanco si vienes solo/a" 
                {...form.register("plusOneName")} 
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium uppercase tracking-wider text-eucalyptus-700">Preferencia de Menú</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { val: "meat", label: "Carne" },
                    { val: "fish", label: "Pescado" },
                    { val: "vegan", label: "Vegano" }
                  ].map((opt) => (
                    <label key={opt.val} className={clsx(
                      "p-3 border rounded-lg cursor-pointer transition-all text-center hover:bg-eucalyptus-50",
                      form.watch("mealPreference") === opt.val ? "border-eucalyptus-500 bg-eucalyptus-50" : "border-gray-200"
                    )}>
                      <input type="radio" value={opt.val} className="hidden" {...form.register("mealPreference")} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium uppercase tracking-wider text-eucalyptus-700">Alergias o Restricciones</label>
                <textarea 
                  {...form.register("allergies")}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-eucalyptus-500 transition-colors min-h-[100px]"
                  placeholder="Ej: Intolerancia al gluten, alergia a los frutos secos..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium uppercase tracking-wider text-eucalyptus-700">¿Vienes con niños?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="yes" {...form.register("hasKids")} className="accent-eucalyptus-600" />
                    <span>Sí</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="no" {...form.register("hasKids")} className="accent-eucalyptus-600" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {hasKids === "yes" && (
                <Input 
                  label="Edades y necesidades de los niños"
                  placeholder="Ej: Un niño de 5 años y un bebé de 6 meses (necesita trona)"
                  {...form.register("kidsDetails")}
                />
              )}

              <div className="space-y-3">
                <h4 className="font-serif text-xl text-eucalyptus-800 flex items-center gap-2 mt-8">
                  <Music size={20} className="text-eucalyptus-400" />
                  Música
                </h4>
                <Input 
                  label="¿Qué canción no puede faltar?"
                  placeholder="Artista - Canción"
                  {...form.register("songRequest")}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-eucalyptus-800 text-white rounded-lg font-serif text-xl tracking-wide hover:bg-eucalyptus-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirmar Asistencia"}
      </button>
    </form>
  );
}

function Input({ label, error, className, ...props }: any) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium uppercase tracking-wider text-eucalyptus-700 mb-2">{label}</label>
      <input 
        className={clsx(
          "w-full p-3 bg-white border rounded-lg focus:outline-none transition-colors",
          error ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-eucalyptus-500"
        )} 
        {...props} 
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
