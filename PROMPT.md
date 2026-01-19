# Super Mega Prompt para Boda Elite 2026

**Rol:** Eres un Ingeniero de Software Senior experto en UX/UI "Award-Winning", especializado en Awwwards y sitios web de alto impacto emocional. Tu stack preferido es Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion y Supabase/PostgreSQL.

**Objetivo:** Crear una página web de boda de "Nivel Élite" para el 10 de Octubre de 2026. La página debe evocar elegancia, exclusividad y mucha ilusión. No es una web simple, es una experiencia.

**Estética y Diseño:**
- **Paleta de Colores:**
  - Primario: Verde Eucalipto (elegante, orgánico, profundo). Ejemplo: `#577C6E`
  - Fondo/Base: Blanco Roto / Crema (cálido, textura papel). Ejemplo: `#F9F8F4`
  - Acentos: Dorado sutil o tipografía Serif moderna de alto contraste (Playfair Display o similar).
- **Estilo:** Minimalismo de lujo. Mucho espacio en blanco (whitespace). Tipografías grandes y cinemáticas.
- **Interacciones:** Scroll suave (Lenis scroll), animaciones de entrada con Framer Motion (fade-up, reveal), micro-interacciones en botones. La página debe sentirse "viva".

**Funcionalidades Clave:**

1.  **Hero Section de Impacto:**
    - Fecha gigante: 10 Octubre 2026.
    - Cuenta atrás (Countdown) elegante y funcional (Días, Horas, Minutos, Segundos).
    - Fondo con video sutil o fotografía de alta calidad con efecto parallax.

2.  **Historia / "Our Story":**
    - Timeline interactivo o narrativa visual de la pareja.

3.  **Formulario de RSVP (Inscripción) Avanzado:**
    - Validación en tiempo real (Zod).
    - Campos:
        - Nombre completo.
        - ¿Asistirá? (Sí/No).
        - Acompañante (Nombre del +1).
        - Menú: Carne, Pescado, Vegano.
        - Alergias e Intolerancias (Text area).
        - ¿Llevas niños? (Sí/No, Cuántos, Edades).
        - Canción sugerida para la fiesta.
    - Animación de confirmación exitosa (confeti elegante o mensaje emotivo).

4.  **Información del Evento (Timeline):**
    - Horarios (Ceremonia, Cóctel, Cena, Fiesta).
    - Mapas interactivos (Google Maps embed estilizado).
    - Recomendaciones de hoteles y transporte.

5.  **Panel de Administración (Privado):**
    - Ruta protegida (ej: `/admin`) con contraseña simple o autenticación.
    - Dashboard visual:
        - Total de confirmados vs invitados.
        - Gráfico de Carnes vs Pescados.
        - Lista completa de asistentes en tabla ordenable y filtrable.
        - Capacidad de exportar a CSV (opcional pero deseable).

**Requerimientos Técnicos:**
- **Framework:** Next.js 14 (App Router).
- **Lenguaje:** TypeScript.
- **Estilos:** Tailwind CSS.
- **Animaciones:** Framer Motion.
- **Base de Datos:** Simulación con LocalStorage o JSON Server para desarrollo, estructura lista para Supabase.
- **Componentes:** Modulares, reutilizables. Usa componentes tipo Shadcn/UI para inputs y tablas.

**Instrucciones Adicionales:**
- El código debe ser limpio, comentado y seguir principios SOLID.
- La experiencia móvil (Responsive) debe ser perfecta.
- Implementa manejo de errores elegante.
- "Sorpréndeme": Añade detalles que no pedí pero que elevan el nivel (ej: modo oscuro sutil, cursor personalizado, música de fondo opcional con botón de mute, galería de fotos tipo masonry).

**Output Esperado:**
Genera la estructura del proyecto, los componentes principales, la configuración de Tailwind y las páginas clave (`page.tsx`, `layout.tsx`, `components/rsvp-form.tsx`, `app/admin/page.tsx`). ¡Haz que sea inolvidable!
