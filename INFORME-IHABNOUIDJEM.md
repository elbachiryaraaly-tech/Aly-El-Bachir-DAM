# Informe Completo: Analisis de ihabnouidjem.com

## 1. Estado Actual del Dominio

**Estado**: El dominio `ihabnouidjem.com` esta **CAIDO / NO REGISTRADO** (NXDOMAIN).
- El DNS devuelve NXDOMAIN, lo que significa que el dominio ya no esta registrado o ha expirado.
- La ultima version activa del sitio fue capturada por el Wayback Machine el **25 de mayo de 2024**, pero en ese momento ya era un dominio aparcado (parked domain).
- La version real y funcional del portfolio fue capturada el **22 de julio de 2023**.

**Sitio activo actualmente**: El portfolio se ha movido a **https://ihabnouidjem.vercel.app** y esta completamente funcional.

---

## 2. Quien es Ihab Nouidjem

| Campo | Informacion |
|-------|-------------|
| **Nombre completo** | Ihab Nouidjem |
| **Edad** | 23 anos (segun su bio de GitHub) |
| **Profesion** | Ingeniero de telecomunicaciones, desarrollador web full stack, disenador UI/UX |
| **Ubicacion** | Argelia |
| **Email** | ihab.nouidjem01@gmail.com |
| **Telefono** | 0699608119 |
| **GitHub** | https://github.com/ihabnouidjem |
| **Instagram** | https://www.instagram.com/ihab_ndj/ |
| **Twitter/X** | https://twitter.com/NouidjemIhab |
| **Cuenta GitHub creada** | 23 de abril de 2021 |
| **Repos publicos** | 11 |
| **Seguidores GitHub** | 0 |
| **Siguiendo en GitHub** | 4 |

---

## 3. Tecnologias del Sitio Web

### 3.1 Version Original (ihabnouidjem.com - Julio 2023)

| Tecnologia | Detalle |
|------------|---------|
| **Framework** | Next.js (Pages Router) |
| **Renderizado** | SSG (Static Site Generation) - `nextExport: true` |
| **Build ID** | `rJMDYgkBTlrTiOPWdfvOJ` |
| **Lenguaje** | JavaScript |
| **CSS** | CSS puro con variables CSS personalizadas (custom properties) |
| **Tipografias** | Google Fonts: **Quicksand** (400, 500) y **Rubik** (300, 400, 500) |
| **Diseno UI/UX** | Disenado en **Figma** |
| **Base de datos** | **MongoDB** (mencionado en la pagina About) |
| **Iconos** | SVG inline (react-icons) |
| **Imagenes** | Next.js Image Optimization (`next/image`) |
| **Paleta de colores** | Inspirada en **vercel.com** |
| **Imagenes stock** | Pexels.com (fotografos: Malcolm Garret y Daniel Putzer) |
| **Hosting original** | IP `54.36.232.187` (servidor **OVH/OVHcloud**, Francia) |

### 3.2 Version Actual (ihabnouidjem.vercel.app - Activa)

| Tecnologia | Detalle |
|------------|---------|
| **Framework** | Next.js (App Router - version mas nueva) |
| **Renderizado** | RSC (React Server Components) |
| **CSS Framework** | **Tailwind CSS** (clases como `bg-zinc-950`, `flex`, `grid`, etc.) |
| **Tipografias** | Fuentes personalizadas precargadas via woff2 (7 archivos de fuentes) |
| **Hosting** | **Vercel** (IP: 216.198.79.3, Cleveland region `cle1`) |
| **SSL/TLS** | HSTS habilitado con `max-age=63072000` (2 anos), includeSubDomains, preload |
| **Cache** | Vercel Edge Cache con `x-vercel-cache: HIT` |
| **Iconos** | SVG inline (react-icons) |
| **Imagenes** | Next.js Image Optimization |
| **Marca** | Se renombro a **"INTECH"** / **"IN"** como logo |

---

## 4. Estructura del Sitio Web

### Version Original (2023)
- `/` - Pagina principal (portfolio)
- `/about` - Pagina "Acerca de"
- Secciones: About Me, UI/UX Design, Web Development, Contact Me

### Version Actual (Vercel)
- `/` - Home (presentacion principal con titulo "INTECH")
- `/uiux` - Disenos UI/UX
- `/web` - Desarrollo Web
- `/contact` - Contacto

---

## 5. Caracteristicas Tecnicas del CSS (Version Original)

### Variables CSS personalizadas:
```
--black: #000
--white: #fff
--red: #ff1d1d
--light-red: #ff9e6e
--blue: #0070f3
--light-blue: #2dd4bf
--green: #0f0
--light-green: #dfffa8
--white-blue: #bfeefc
```

### Caracteristicas de diseno:
- **Header fijo** con `backdrop-filter: blur(5px)` (efecto glassmorphism)
- **Animaciones CSS** personalizadas (`animateBannerItems`, `animateItems`, `animatedColor`, `fade`)
- **Gradientes animados** con `background-position` animation
- **Scroll behavior smooth** nativo
- **Scrollbar personalizado** con gradientes
- **Responsive design** con 3 breakpoints: 1200px, 600px
- **Grid layout** para secciones como about-me y contact-me
- **Slider horizontal** con `scroll-snap-type: x mandatory`
- **Tipografia responsive** que cambia en cada breakpoint

---

## 6. Repositorios de GitHub

| Repositorio | Lenguaje | Creado | Descripcion | Homepage |
|-------------|----------|--------|-------------|----------|
| **CoffeeShop** | TypeScript | 2024-11-12 | - | - |
| **inui** | - | 2024-09-19 | - | - |
| **ihabui** | - | 2024-09-18 | Libreria UI open source de componentes React reutilizables | - |
| **EXAMENTPAR** | TypeScript | 2024-02-15 | - | - |
| **INSTORE** | JavaScript | 2023-10-14 | - | https://instore-eta.vercel.app |
| **doctorin** | JavaScript | 2023-08-03 | - | https://doctorin.vercel.app |
| **FINANCEE** | JavaScript | 2023-03-06 | - | - |
| **cube-watch** | CSS | 2023-02-03 | - | - |
| **cube** | JavaScript | 2022-10-14 | - | - |
| **bugatti** | CSS | 2022-10-14 | - | - |
| **chatapp** | JavaScript | 2022-08-19 | - | chatapp-khaki.vercel.app |

---

## 7. Stack Tecnologico Completo

### Frontend
- **React** (via Next.js)
- **Next.js** (Pages Router en v1, App Router en v2)
- **Tailwind CSS** (version actual)
- **CSS puro** con variables personalizadas (version original)
- **Google Fonts** (Quicksand, Rubik)
- **SVG icons** (react-icons)
- **TypeScript** (proyectos mas recientes como CoffeeShop, EXAMENTPAR)
- **JavaScript** (proyectos anteriores)

### Backend
- **MongoDB** (mencionado como tecnologia del sitio original)
- **Next.js API Routes** (probablemente para el formulario de contacto)

### Hosting e Infraestructura
- **Vercel** (hosting actual, deploy automatico desde GitHub)
- **OVH/OVHcloud** (hosting original del dominio .com, IP francesa 54.36.232.187)
- **HTTPS** con HSTS strict
- **Vercel Edge Network** con cache distribuido

### Herramientas de Diseno
- **Figma** (para diseno UI/UX)

### Proyectos desplegados en Vercel
- ihabnouidjem.vercel.app (portfolio principal)
- instore-eta.vercel.app (INSTORE)
- doctorin.vercel.app (doctorin)
- chatapp-khaki.vercel.app (Chat App)

---

## 8. Historial del Dominio

| Fecha | Evento |
|-------|--------|
| ~2022 | Ihab comienza a programar (primeros repos en GitHub: chatapp, bugatti, cube) |
| Julio 2023 | `ihabnouidjem.com` activo con portfolio Next.js, hospedado en OVH (IP: 54.36.232.187) |
| Mayo 2024 | El dominio pasa a ser un dominio aparcado (parked domain) |
| 2024 | El portfolio se mueve a `ihabnouidjem.vercel.app` con rediseno completo |
| Feb 2026 | El dominio `ihabnouidjem.com` ya no esta registrado (NXDOMAIN) |

---

## 9. Resumen Ejecutivo

**Ihab Nouidjem** es un ingeniero de telecomunicaciones de 23 anos de Argelia que trabaja como desarrollador web full stack y disenador UI/UX. Su portfolio original en `ihabnouidjem.com` fue construido con **Next.js (Pages Router)**, **CSS puro** con variables personalizadas, **MongoDB**, y estaba hospedado en un servidor **OVH** en Francia. El diseno fue creado en **Figma** con una estetica oscura inspirada en vercel.com.

Posteriormente, el sitio fue rediseñado completamente y migrado a **Vercel** bajo el subdominio `ihabnouidjem.vercel.app`, ahora utilizando **Next.js App Router** con **React Server Components** y **Tailwind CSS**. El nuevo sitio tiene una marca llamada **"INTECH"** y mantiene secciones de UI/UX Design, Web Development y Contact.

Sus principales lenguajes son **JavaScript** y **TypeScript**, y todos sus proyectos web estan desplegados en **Vercel**. Tambien ha desarrollado una libreria de componentes React de codigo abierto llamada **ihabui**.
