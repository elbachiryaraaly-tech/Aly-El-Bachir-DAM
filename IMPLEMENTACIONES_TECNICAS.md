# Implementaciones Técnicas para yara-labs.com
## Código y Configuraciones Específicas

---

## 1. SCHEMA.ORG STRUCTURED DATA

### A. ProfessionalService Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "YaraLabs",
  "alternateName": "Yara Labs",
  "description": "Full-Stack Development | AI/ML Solutions | Web Scraping | Mobile Apps | Blockchain | DevOps. Transforming impossible ideas into production-ready code.",
  "url": "https://yara-labs.com",
  "logo": "https://yara-labs.com/logo.png",
  "image": "https://yara-labs.com/og-image.png",
  "telephone": "+34-XXX-XXX-XXX",
  "email": "contact@yara-labs.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle [Dirección]",
    "addressLocality": "Sevilla",
    "addressRegion": "Andalucía",
    "postalCode": "41000",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "37.3891",
    "longitude": "-5.9845"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Worldwide"
  },
  "serviceType": [
    "Web Development",
    "Full-Stack Development",
    "AI Solutions",
    "Machine Learning",
    "Web Scraping",
    "Mobile App Development",
    "Blockchain Development",
    "DevOps Services"
  ],
  "priceRange": "$$",
  "sameAs": [
    "https://github.com/elbachiryaraaly-tech",
    "https://linkedin.com/company/yaralabs",
    "https://twitter.com/yaralabs"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "25"
  }
}
```

### B. Service Schema (Páginas de Servicios)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Full-Stack Web Development",
  "provider": {
    "@type": "ProfessionalService",
    "name": "YaraLabs"
  },
  "areaServed": "Worldwide",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://yara-labs.com/services/full-stack",
    "servicePhone": "+34-XXX-XXX-XXX"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

### C. Article Schema (Blog Posts)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título del Artículo",
  "description": "Descripción del artículo",
  "image": "https://yara-labs.com/blog/imagen.jpg",
  "author": {
    "@type": "Person",
    "name": "Aly El Bachir",
    "url": "https://yara-labs.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YaraLabs",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yara-labs.com/logo.png"
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15"
}
```

### D. FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta desarrollar una aplicación web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El costo varía según la complejidad del proyecto. Un MVP puede costar entre X€ y Y€, mientras que aplicaciones empresariales pueden superar Z€. Ofrecemos consultas gratuitas para evaluar tu proyecto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tecnologías utilizan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Utilizamos tecnologías modernas como Next.js 15, TypeScript, React, Node.js, PostgreSQL, AWS, Docker, y más. Adaptamos la stack tecnológica según las necesidades de cada proyecto."
      }
    }
  ]
}
```

---

## 2. OPTIMIZACIÓN DE META TAGS

### Mejoras Recomendadas en el HTML:

```html
<!-- Meta Description Mejorada -->
<meta name="description" content="YaraLabs: Desarrolladores Full-Stack en Sevilla. Especialistas en Next.js, AI/ML, Web Scraping, Mobile Apps y Blockchain. Transformamos ideas imposibles en código de producción. Consulta gratuita.">

<!-- Keywords Mejoradas (aunque menos importante, sigue siendo útil) -->
<meta name="keywords" content="desarrollador full stack sevilla, desarrollo web sevilla, desarrollador next.js españa, integración IA web, web scraping españa, desarrollo mobile app react native, blockchain developer sevilla, devops sevilla, desarrollo software sevilla, freelance developer sevilla">

<!-- Open Graph Mejorado -->
<meta property="og:title" content="YaraLabs - Desarrollo Full-Stack | AI/ML | Web Scraping | Sevilla">
<meta property="og:description" content="Desarrolladores Full-Stack en Sevilla especializados en Next.js, AI/ML, Web Scraping y Blockchain. Consulta gratuita.">
<meta property="og:locale" content="es_ES">
<meta property="og:locale:alternate" content="en_US">

<!-- Twitter Card Mejorada -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@yaralabs">
<meta name="twitter:creator" content="@yaralabs">
```

---

## 3. ROBOTS.TXT OPTIMIZADO

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemaps
Sitemap: https://yara-labs.com/sitemap.xml
Sitemap: https://yara-labs.com/blog/sitemap.xml
```

---

## 4. SITEMAP.XML ESTRUCTURA

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
  <url>
    <loc>https://yara-labs.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Servicios -->
  <url>
    <loc>https://yara-labs.com/services</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://yara-labs.com/services/full-stack</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://yara-labs.com/services/ai-ml</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Portfolio -->
  <url>
    <loc>https://yara-labs.com/work</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog -->
  <url>
    <loc>https://yara-labs.com/blog</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contacto -->
  <url>
    <loc>https://yara-labs.com/contact</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
</urlset>
```

---

## 5. COMPONENTE DE TESTIMONIOS (React/Next.js)

```tsx
// components/Testimonials.tsx
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Juan Pérez",
    role: "CEO",
    company: "TechStartup",
    image: "/testimonials/juan.jpg",
    content: "YaraLabs transformó nuestra idea en una aplicación funcional en tiempo récord. Profesionales excepcionales.",
    rating: 5,
    project: "SaaS Platform"
  },
  // Más testimonios...
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-code-void">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-code-cyan">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass rounded-lg p-6 border border-code-cyan/20"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-code-cyan">★</span>
                ))}
              </div>
              <p className="text-code-text-secondary mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-code-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-code-text-secondary">
                    {testimonial.role}, {testimonial.company}
                  </p>
                  {testimonial.project && (
                    <p className="text-xs text-code-cyan mt-1">
                      Proyecto: {testimonial.project}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 6. COMPONENTE DE CALCULADORA DE PRESUPUESTO

```tsx
// components/BudgetCalculator.tsx
'use client';

import { useState } from 'react';

interface BudgetResult {
  min: number;
  max: number;
  estimated: number;
}

export default function BudgetCalculator() {
  const [projectType, setProjectType] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [result, setResult] = useState<BudgetResult | null>(null);

  const calculateBudget = () => {
    // Lógica de cálculo basada en selecciones
    let basePrice = 0;
    
    switch (projectType) {
      case 'mvp':
        basePrice = 5000;
        break;
      case 'web-app':
        basePrice = 10000;
        break;
      case 'ecommerce':
        basePrice = 15000;
        break;
      case 'enterprise':
        basePrice = 50000;
        break;
    }

    const featureMultiplier = features.length * 0.2;
    const timelineMultiplier = timeline === 'urgent' ? 1.5 : 1;

    const estimated = Math.round(basePrice * (1 + featureMultiplier) * timelineMultiplier);
    const min = Math.round(estimated * 0.8);
    const max = Math.round(estimated * 1.3);

    setResult({ min, max, estimated });
  };

  return (
    <section className="py-20 bg-code-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-code-cyan">
          Calcula el Presupuesto de tu Proyecto
        </h2>
        <div className="max-w-2xl mx-auto glass rounded-lg p-8 border border-code-cyan/20">
          {/* Formulario de cálculo */}
          <div className="space-y-6">
            <div>
              <label className="block text-code-text-primary mb-2">
                Tipo de Proyecto
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-code-surface border border-code-cyan/30 rounded p-3 text-code-text-primary"
              >
                <option value="">Selecciona...</option>
                <option value="mvp">MVP / Prototipo</option>
                <option value="web-app">Aplicación Web</option>
                <option value="ecommerce">E-commerce</option>
                <option value="enterprise">Aplicación Empresarial</option>
              </select>
            </div>

            {/* Más campos... */}

            <button
              onClick={calculateBudget}
              className="w-full bg-code-cyan text-code-black py-3 rounded font-bold hover:bg-code-cyan-glow transition"
            >
              Calcular Presupuesto
            </button>

            {result && (
              <div className="mt-6 p-6 bg-code-surface rounded border border-code-cyan/30">
                <h3 className="text-xl font-bold text-code-cyan mb-4">
                  Estimación de Presupuesto
                </h3>
                <p className="text-2xl font-bold text-code-text-primary mb-2">
                  €{result.estimated.toLocaleString()}
                </p>
                <p className="text-code-text-secondary">
                  Rango estimado: €{result.min.toLocaleString()} - €{result.max.toLocaleString()}
                </p>
                <p className="text-sm text-code-text-secondary mt-4">
                  * Esta es una estimación aproximada. Contacta con nosotros para una cotización precisa.
                </p>
                <a
                  href="/contact"
                  className="inline-block mt-4 bg-code-cyan text-code-black px-6 py-2 rounded font-bold hover:bg-code-cyan-glow transition"
                >
                  Solicitar Cotización Detallada
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 7. OPTIMIZACIÓN DE PERFORMANCE

### next.config.js Mejoras

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compresión
  compress: true,
  
  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  
  // Experimental features para performance
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;
```

---

## 8. GOOGLE ANALYTICS 4 EVENTOS PERSONALIZADOS

```typescript
// lib/analytics.ts
export const GA_TRACKING_ID = 'G-TL8Z4HRTSH';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos específicos para conversión
export const trackContactFormSubmit = () => {
  event({
    action: 'submit',
    category: 'Contact Form',
    label: 'Homepage Contact Form',
  });
};

export const trackServiceClick = (serviceName: string) => {
  event({
    action: 'click',
    category: 'Service',
    label: serviceName,
  });
};

export const trackBudgetCalculator = (estimatedBudget: number) => {
  event({
    action: 'calculate',
    category: 'Budget Calculator',
    label: 'Budget Calculated',
    value: estimatedBudget,
  });
};
```

---

## 9. COMPONENTE DE CHATBOT BÁSICO

```tsx
// components/Chatbot.tsx
'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: '¡Hola! 👋 Soy el asistente de YaraLabs. ¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Añadir mensaje del usuario
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    // Simular respuesta del bot (en producción, conectar con API de IA)
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('precio') || lowerInput.includes('costo')) {
      return 'Los precios varían según el proyecto. ¿Podrías contarme más sobre lo que necesitas? O puedes usar nuestra calculadora de presupuesto.';
    }
    
    if (lowerInput.includes('servicio') || lowerInput.includes('qué hacen')) {
      return 'Ofrecemos desarrollo Full-Stack, integración de IA/ML, Web Scraping, desarrollo móvil, Blockchain y DevOps. ¿Hay algún servicio específico que te interese?';
    }
    
    if (lowerInput.includes('contacto') || lowerInput.includes('hablar')) {
      return 'Puedes contactarnos a través del formulario en /contact o escribirnos directamente. ¿Te gustaría que te ayude a agendar una consulta?';
    }
    
    return 'Entiendo. ¿Te gustaría que te conecte con nuestro equipo para una consulta más detallada?';
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-96 h-96 bg-code-surface border border-code-cyan/30 rounded-lg shadow-lg flex flex-col z-[9999]">
          <div className="bg-code-cyan p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-code-black">YaraLabs Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-code-black hover:text-code-void"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded ${
                    msg.role === 'user'
                      ? 'bg-code-cyan text-code-black'
                      : 'bg-code-elevated text-code-text-primary'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-code-cyan/30 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-code-black border border-code-cyan/30 rounded p-2 text-code-text-primary"
            />
            <button
              onClick={handleSend}
              className="bg-code-cyan text-code-black px-4 rounded font-bold hover:bg-code-cyan-glow"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-code-cyan text-code-black w-16 h-16 rounded-full shadow-lg hover:bg-code-cyan-glow transition z-[9999] flex items-center justify-center text-2xl"
        aria-label="Abrir chat"
      >
        💬
      </button>
    </>
  );
}
```

---

## 10. CONFIGURACIÓN DE GOOGLE BUSINESS PROFILE

### Información a Configurar:

```
Nombre: YaraLabs
Categoría: Desarrollador de software
Dirección: [Dirección completa en Sevilla]
Teléfono: [Número de teléfono]
Sitio web: https://yara-labs.com
Horario: [Horario de atención]

Descripción:
YaraLabs es una empresa de desarrollo full-stack ubicada en Sevilla, especializada en:
- Desarrollo web con Next.js y TypeScript
- Integración de IA y Machine Learning
- Web Scraping avanzado
- Desarrollo de aplicaciones móviles
- Soluciones Blockchain y Web3
- DevOps y Cloud Computing

Servicios:
- Desarrollo Full-Stack
- Integración de IA/ML
- Web Scraping
- Desarrollo Mobile
- Blockchain Development
- DevOps & Cloud

Fotos:
- Logo de la empresa
- Oficina/espacio de trabajo
- Equipo (si aplica)
- Proyectos destacados
- Eventos o conferencias
```

---

## 11. EMAIL TEMPLATE PARA NEWSLETTER

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YaraLabs Newsletter</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <header style="background: #00FFD1; padding: 20px; text-align: center;">
    <h1 style="color: #000; margin: 0;">YaraLabs</h1>
    <p style="color: #000; margin: 5px 0 0 0;">Code is our language. Impossible is our motivation.</p>
  </header>
  
  <main style="padding: 20px; background: #f9f9f9;">
    <h2 style="color: #00FFD1;">¡Hola [Nombre]! 👋</h2>
    
    <p>Esta semana en YaraLabs:</p>
    
    <article style="background: white; padding: 15px; margin: 20px 0; border-left: 4px solid #00FFD1;">
      <h3 style="margin-top: 0;">📝 Nuevo Artículo del Blog</h3>
      <h4><a href="[LINK]" style="color: #00FFD1;">Título del Artículo</a></h4>
      <p>Descripción breve del artículo...</p>
    </article>
    
    <article style="background: white; padding: 15px; margin: 20px 0; border-left: 4px solid #00FFD1;">
      <h3 style="margin-top: 0;">💼 Caso de Estudio</h3>
      <h4><a href="[LINK]" style="color: #00FFD1;">Proyecto Destacado</a></h4>
      <p>Descripción del proyecto...</p>
    </article>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://yara-labs.com/contact" style="background: #00FFD1; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        ¿Tienes un Proyecto?
      </a>
    </div>
  </main>
  
  <footer style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>YaraLabs - Sevilla, España</p>
    <p>
      <a href="[UNSUBSCRIBE]" style="color: #666;">Darse de baja</a> |
      <a href="https://yara-labs.com" style="color: #666;">Visitar sitio web</a>
    </p>
  </footer>
  
</body>
</html>
```

---

## 12. CONFIGURACIÓN DE GOOGLE ADS (Estructura Sugerida)

### Campaña 1: Búsqueda - Servicios Principales
- **Grupo de Anuncios**: Desarrollo Full-Stack
  - Keywords: "desarrollador full stack sevilla", "desarrollo web sevilla", "desarrollador next.js"
  - Anuncios: 3-5 variaciones
  - Landing Page: /services/full-stack

### Campaña 2: Búsqueda - Servicios Específicos
- **Grupo de Anuncios**: IA/ML
  - Keywords: "integración IA web", "desarrollador machine learning"
  - Landing Page: /services/ai-ml

### Campaña 3: Display - Remarketing
- Target: Visitantes que no convirtieron
- Anuncios: Casos de estudio, testimonios
- Landing Page: /contact

### Campaña 4: YouTube - Awareness
- Videos: Tutoriales técnicos, demos de proyectos
- Target: Intereses tecnológicos
- CTA: Suscribirse al canal, visitar blog

---

## NOTAS DE IMPLEMENTACIÓN

1. **Priorizar Mobile**: Asegurar que todos los componentes sean completamente responsive
2. **Testing**: Probar todos los formularios y CTAs antes de lanzar
3. **Analytics**: Configurar eventos de conversión en GA4
4. **A/B Testing**: Probar diferentes versiones de CTAs y headlines
5. **Seguridad**: Validar y sanitizar todas las entradas de usuario
6. **Accesibilidad**: Probar con lectores de pantalla y navegación por teclado

---

*Documento de implementaciones técnicas para yara-labs.com*
