# PROMPT MEGA COMPLETO - TIENDA ONLINE OMAR ARABIC PERFUME

Crea una tienda online profesional y de élite para "Omar Arabic Perfume", una tienda de perfumes árabes ubicada en Tindouf que vende productos de alta calidad a nivel mundial.

## ESPECIFICACIONES TÉCNICAS

**Stack Tecnológico:**
- Frontend: React 18+ con TypeScript
- Framework: Next.js 14+ (App Router) para SEO y rendimiento óptimo
- Estilos: Tailwind CSS con diseño responsive
- Animaciones: Framer Motion para transiciones suaves
- Iconos: Lucide React o React Icons
- Formularios: React Hook Form con validación
- Carrito de compras: Context API o Zustand para gestión de estado
- Pagos: Integración con Stripe o PayPal (preparado para múltiples métodos)
- Internacionalización: next-intl o i18next para múltiples idiomas (Español, Árabe, Francés, Inglés)
- Base de datos: JSON local inicialmente, preparado para migrar a PostgreSQL/MongoDB
- Imágenes: Next.js Image Optimization con placeholder blur

## DISEÑO Y PALETA DE COLORES

**Paleta Principal:**
- Color primario: Azul Turquesa (#40E0D0, #48D1CC, #00CED1)
- Color secundario: Blanco (#FFFFFF)
- Color de acento: Azul Turquesa Oscuro (#008B8B)
- Color de texto: Gris oscuro (#1F2937) para contraste
- Color de fondo: Blanco con gradientes sutiles de turquesa
- Sombras: Turquesa translúcido con blur

**Estilo Visual:**
- Diseño minimalista y elegante tipo boutique de lujo
- Tipografía: Fuentes elegantes (Playfair Display o Cormorant Garamond para títulos, Inter o Poppins para texto)
- Espaciado generoso y respiración visual
- Cards de productos con efecto glassmorphism sutil
- Animaciones suaves y profesionales
- Imágenes de productos con efecto hover elegante
- Gradientes sutiles de turquesa a blanco

## ESTRUCTURA DE LA PÁGINA

### 1. HEADER/NAVBAR
- Logo "Omar Arabic Perfume" con tipografía elegante
- Menú de navegación: Inicio, Productos, Categorías, Sobre Nosotros, Contacto
- Selector de idioma (ES, AR, FR, EN)
- Icono de carrito con contador de items
- Botón de búsqueda de productos
- Diseño sticky que se vuelve translúcido al hacer scroll

### 2. HERO SECTION
- Imagen de fondo elegante con overlay turquesa translúcido
- Título principal: "Perfumes Árabes de Élite"
- Subtítulo: "Descubre la esencia del desierto"
- CTA principal: "Explorar Colección"
- Animación de entrada suave
- Indicadores de calidad: "100% Auténtico", "Envío Mundial", "Calidad Premium"

### 3. SECCIÓN DE CATEGORÍAS
- Cards con iconos elegantes para:
  - Perfumes Masculinos
  - Perfumes Femeninos
  - Perfumes Unisex
  - Aceites Esenciales
  - Sets de Regalo
- Efecto hover con elevación y sombra turquesa

### 4. PRODUCTOS DESTACADOS
- Grid responsive (1 columna móvil, 2 tablet, 3-4 desktop)
- Cada producto muestra:
  - Imagen de alta calidad con zoom al hover
  - Nombre del perfume
  - Notas olfativas (top, middle, base)
  - Precio en múltiples monedas (EUR, USD, MAD)
  - Botón "Añadir al Carrito"
  - Badge "Nuevo" o "Más Vendido" si aplica
  - Rating con estrellas
- Animación de aparición escalonada

### 5. SECCIÓN "SOBRE NOSOTROS"
- Historia de la tienda en Tindouf
- Valores: Autenticidad, Calidad, Tradición
- Imágenes de la tienda física
- Testimonios de clientes

### 6. PROCESO DE COMPRA
- Carrito de compras deslizable desde el lado derecho
- Checkout con pasos:
  1. Revisar carrito
  2. Información de envío (con cálculo de envío internacional)
  3. Método de pago
  4. Confirmación
- Formulario de envío con validación
- Cálculo automático de envío según país
- Opciones de envío: Estándar, Express, Premium

### 7. FOOTER
- Información de contacto
- Redes sociales (Instagram, Facebook, WhatsApp)
- Mapa de ubicación (Tindouf)
- Enlaces legales: Términos y condiciones, Política de privacidad, Política de envíos
- Newsletter signup
- Métodos de pago aceptados (iconos)

## PRODUCTOS (20 productos de ejemplo)

Crea un archivo JSON con 20 productos de perfumes árabes auténticos. Cada producto debe incluir:

```json
{
  "id": "unique-id",
  "name": "Nombre del Perfume",
  "nameAr": "اسم العطر",
  "category": "masculino" | "femenino" | "unisex",
  "price": 45.99,
  "currency": "EUR",
  "originalPrice": 59.99, // si hay descuento
  "images": ["url1", "url2", "url3"],
  "description": "Descripción detallada del perfume",
  "descriptionAr": "وصف مفصل",
  "notes": {
    "top": ["Nota 1", "Nota 2"],
    "middle": ["Nota 1", "Nota 2"],
    "base": ["Nota 1", "Nota 2"]
  },
  "size": "50ml" | "100ml",
  "stock": 50,
  "rating": 4.5,
  "reviews": 23,
  "featured": true,
  "new": false,
  "bestseller": false,
  "ingredients": ["Ingrediente 1", "Ingrediente 2"],
  "origin": "Emiratos Árabes Unidos",
  "longevity": "8-10 horas",
  "sillage": "Moderado-Alto"
}
```

**Ejemplos de productos a incluir:**
1. Oud Majestic - Perfume Masculino Premium
2. Rose Royale - Perfume Femenino de Lujo
3. Desert Bloom - Perfume Unisex
4. Amber Essence - Aceite Esencial
5. Musk Legend - Perfume Masculino Clásico
6. Jasmine Dreams - Perfume Femenino Elegante
7. Oud & Rose - Perfume Unisex Exclusivo
8. Sandalwood Royal - Perfume Masculino
9. White Flowers - Perfume Femenino Fresco
10. Spice Market - Perfume Unisex Aromático
11. Golden Oud - Perfume Masculino Premium
12. Velvet Rose - Perfume Femenino Seductor
13. Desert Night - Perfume Unisex Nocturno
14. Pure Musk - Aceite Esencial Puro
15. Royal Amber - Perfume Masculino Regio
16. Gardenia Blossom - Perfume Femenino Floral
17. Oud Fusion - Perfume Unisex Moderno
18. Cedar & Spice - Perfume Masculino Terroso
19. Oriental Pearl - Perfume Femenino Exótico
20. Luxury Gift Set - Set de Regalo Premium

## FUNCIONALIDADES REQUERIDAS

### Carrito de Compras
- Añadir/eliminar productos
- Actualizar cantidades
- Calcular totales automáticamente
- Persistencia en localStorage
- Notificaciones toast al añadir productos

### Búsqueda y Filtros
- Búsqueda por nombre
- Filtro por categoría
- Filtro por precio (rango)
- Filtro por notas olfativas
- Ordenar por: Precio, Popularidad, Nuevos, Rating

### Gestión de Productos
- Vista de lista y grid
- Vista detallada de producto con:
  - Galería de imágenes con zoom
  - Descripción completa
  - Notas olfativas expandibles
  - Reviews y ratings
  - Productos relacionados
  - Selector de tamaño

### Checkout y Pagos
- Formulario de envío completo
- Validación de campos
- Cálculo de envío por país
- Integración preparada para Stripe/PayPal
- Confirmación de pedido por email (preparado)

### SEO y Performance
- Meta tags optimizados
- Open Graph tags
- Schema.org markup para productos
- Sitemap.xml
- robots.txt
- Lazy loading de imágenes
- Code splitting
- Optimización de Core Web Vitals

### Responsive Design
- Mobile First approach
- Breakpoints: 320px, 768px, 1024px, 1280px
- Menú hamburguesa en móvil
- Carrito optimizado para móvil
- Touch gestures para galería

## ANIMACIONES Y EFECTOS

- Fade in al cargar página
- Scroll animations con Intersection Observer
- Hover effects en productos (elevación, sombra)
- Transiciones suaves entre páginas
- Loading skeletons mientras cargan datos
- Micro-interacciones en botones
- Parallax sutil en hero section

## INTERNACIONALIZACIÓN

- Soporte para 4 idiomas: Español, Árabe, Francés, Inglés
- Traducción completa de:
  - Navegación
  - Productos
  - Formularios
  - Mensajes de error/éxito
  - Footer
- Selector de idioma en header
- RTL support para árabe

## SEGURIDAD Y PRIVACIDAD

- Validación de formularios en frontend y backend
- Protección CSRF
- Sanitización de inputs
- Política de privacidad completa
- Términos y condiciones
- GDPR compliance (preparado)

## TESTING

- Tests unitarios para componentes críticos
- Tests de integración para flujo de compra
- Tests E2E para checkout completo

## DEPLOYMENT

- Configuración para Vercel/Netlify
- Variables de entorno para APIs
- CI/CD pipeline preparado
- Monitoreo de errores (Sentry preparado)

## EXTRAS PREMIUM

- Wishlist/Favoritos
- Comparador de productos
- Historial de pedidos
- Programa de puntos/fidelidad
- Chat en vivo (preparado)
- Blog de perfumes
- Guía de fragancias
- Video reviews de productos
- AR/VR preview (preparado para futuro)

## INSTRUCCIONES DE IMPLEMENTACIÓN

1. Crear estructura de proyecto Next.js con TypeScript
2. Configurar Tailwind CSS con colores personalizados
3. Crear componentes reutilizables (Button, Card, Input, etc.)
4. Implementar layout principal con Header y Footer
5. Crear páginas: Home, Products, Product Detail, Cart, Checkout, About, Contact
6. Implementar sistema de carrito con Context API
7. Crear archivo JSON con 20 productos
8. Implementar búsqueda y filtros
9. Añadir animaciones con Framer Motion
10. Configurar internacionalización
11. Optimizar para SEO
12. Añadir tests básicos
13. Preparar para deployment

## NOTAS FINALES

- El diseño debe transmitir lujo, elegancia y autenticidad
- La experiencia de usuario debe ser fluida y profesional
- Todos los textos deben ser profesionales y atractivos
- Las imágenes deben ser de alta calidad (usar placeholders inicialmente)
- El código debe ser limpio, comentado y mantenible
- La tienda debe estar lista para recibir pedidos reales

¡Crea una tienda online de perfumes árabes que sea verdaderamente de élite y que refleje la calidad y autenticidad de Omar Arabic Perfume!
