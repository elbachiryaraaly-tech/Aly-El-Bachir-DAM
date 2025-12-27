# 🎯 SUPER MEGA PROMPT PARA CURSOR EDITOR
## Tienda Online Profesional de Perfumes Árabes

---

Crea una tienda online profesional y de élite para "Omar Arabic Perfume", una tienda de perfumes árabes ubicada en Tindouf, Argelia. La tienda debe estar diseñada para vender aproximadamente 20 productos de perfumes árabes de alta calidad en todo el mundo.

## 🎨 DISEÑO Y ESTILO

- **Colores principales**: Azul turquesa (#00e6c4) y blanco
- **Estilo**: Diseño premium, elegante y de élite
- **Tipografía**: Usa fuentes elegantes y modernas (Playfair Display para títulos, Inter para texto)
- **Efectos visuales**: Animaciones suaves, efectos hover elegantes, sombras turquesa, gradientes sutiles
- **Responsive**: Debe funcionar perfectamente en móviles, tablets y desktop

## 🛍️ FUNCIONALIDADES REQUERIDAS

### 1. Página de Inicio (/)
- Hero section impactante con texto llamativo sobre perfumes árabes del desierto
- Sección de características (Calidad Premium, Envío Mundial, Garantía, Autenticidad)
- Grid de productos destacados (6 productos)
- Sección "Sobre Nosotros" con imagen
- Sección de categorías con enlaces visuales
- Footer completo con información de contacto y redes sociales

### 2. Catálogo de Productos (/products)
- Grid responsive de todos los productos
- Sistema de filtrado por categorías (Oud, Amber, Musk, Floral, Woody, Luxury)
- Contador de productos mostrados
- Cada producto debe mostrar: imagen, nombre, precio, descuento si aplica, rating, botón de añadir al carrito

### 3. Página de Detalle de Producto (/products/[id])
- Imagen grande del producto
- Nombre en español y árabe
- Descripción completa
- Precio con descuento si aplica
- Notas de fragancia (tags)
- Rating y número de reseñas
- Selector de cantidad
- Botón "Añadir al Carrito"
- Sección de productos relacionados

### 4. Carrito de Compras (/cart)
- Lista de productos añadidos con imágenes
- Cantidad editable (aumentar/disminuir)
- Precio individual y total por producto
- Resumen del pedido con subtotal y total
- Botón "Proceder al Pago"
- Mensaje cuando el carrito está vacío con enlace a productos

### 5. Páginas Adicionales
- **Sobre Nosotros** (/about): Historia de la tienda, valores, misión
- **Contacto** (/contact): Formulario de contacto, información de ubicación (Tindouf), email, teléfono, horarios

## 📦 PRODUCTOS (20 productos de ejemplo)

Crea 20 productos de perfumes árabes con la siguiente estructura:

```typescript
{
  id: string;
  name: string; // Nombre en español
  nameAr?: string; // Nombre en árabe
  description: string; // Descripción en español
  descriptionAr?: string; // Descripción en árabe
  price: number; // Precio en euros
  originalPrice?: number; // Precio original para mostrar descuentos
  image: string; // URL de imagen (usa imágenes de Unsplash relacionadas con perfumes)
  category: string; // Oud, Amber, Musk, Floral, Woody, Luxury
  inStock: boolean;
  featured?: boolean; // Para productos destacados
  size?: string; // Ej: "50ml"
  notes?: string[]; // Notas de fragancia: ["Oud", "Rosa", "Azafrán"]
  rating?: number; // 1-5
  reviews?: number; // Número de reseñas
}
```

**Categorías de productos:**
- Oud (al menos 4 productos)
- Amber (al menos 3 productos)
- Musk (al menos 3 productos)
- Floral (al menos 4 productos)
- Woody (al menos 2 productos)
- Luxury (al menos 2 productos)

**Ejemplos de nombres de productos:**
- Oud Royal, Oud & Rose, Royal Oud, Oud Noir
- Amber Noir, Amber Luxe, Amber Blossom
- Musk Mystique, Musk Rose, Musk Supreme
- Rose de Sables, Desert Bloom, Jasmine Nights, Rose Petals, Desert Oasis
- Sandalwood Essence, Desert Wind
- Saffron Gold, Saffron Dreams, Saffron Royal

## 🛠️ STACK TECNOLÓGICO

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Zustand para el carrito de compras
- **Iconos**: React Icons (react-icons)
- **Imágenes**: Next.js Image component con imágenes de Unsplash

## 📱 COMPONENTES A CREAR

1. **Header.tsx**: 
   - Logo "Omar Arabic Perfume" con icono
   - Menú de navegación (Inicio, Productos, Sobre Nosotros, Contacto)
   - Icono de carrito con contador de items
   - Menú hamburguesa para móvil
   - Sticky header con efecto glass

2. **Footer.tsx**:
   - Información de la marca
   - Enlaces rápidos
   - Categorías
   - Información de contacto (Tindouf, Argelia)
   - Redes sociales
   - Copyright

3. **ProductCard.tsx**:
   - Imagen del producto con efecto hover
   - Badge "Destacado" si es featured
   - Badge de descuento si tiene originalPrice
   - Nombre y nombre en árabe
   - Rating con estrellas
   - Tags de notas de fragancia
   - Precio con descuento si aplica
   - Botón de añadir al carrito
   - Efecto hover con elevación

4. **Hero.tsx**:
   - Título grande y llamativo
   - Subtítulo descriptivo
   - Botones CTA (Explorar Productos, Nuestra Historia)
   - Fondos con gradientes turquesa
   - Elementos decorativos animados

## 🎯 CARACTERÍSTICAS ESPECIALES

- **Carrito persistente**: El carrito debe mantenerse durante la sesión
- **Animaciones**: Transiciones suaves en todos los elementos interactivos
- **Efectos visuales**: 
  - Sombras turquesa en elementos importantes
  - Gradientes turquesa en botones y elementos destacados
  - Efecto glass en el header
  - Hover effects con elevación
- **SEO**: Meta tags apropiados en layout.tsx
- **Accesibilidad**: Labels apropiados, aria-labels en botones

## 🌍 INTERNACIONALIZACIÓN

- Preparar estructura para múltiples idiomas (aunque inicialmente en español)
- Precios en euros (€)
- Preparado para envíos internacionales (mencionar en footer y páginas relevantes)

## 📋 ESTRUCTURA DE ARCHIVOS

```
/app
  /page.tsx (página principal)
  /layout.tsx (layout con metadata SEO)
  /globals.css (estilos globales con Tailwind)
  /products
    /page.tsx (catálogo)
    /[id]/page.tsx (detalle de producto)
  /cart/page.tsx (carrito)
  /about/page.tsx (sobre nosotros)
  /contact/page.tsx (contacto)
  /not-found.tsx (404)

/components
  Header.tsx
  Footer.tsx
  ProductCard.tsx
  Hero.tsx

/data
  products.ts (array con los 20 productos)

/store
  cartStore.ts (Zustand store para el carrito)

/types
  product.ts (tipos TypeScript)

/tailwind.config.js (configuración con colores turquesa)
/package.json (dependencias)
/tsconfig.json
/next.config.js
```

## 🎨 PALETA DE COLORES

```javascript
turquoise: {
  50: '#e6fffa',
  100: '#b2fff0',
  200: '#80ffe6',
  300: '#4dffdc',
  400: '#1affd2',
  500: '#00e6c4', // Color principal
  600: '#00b39e', // Color oscuro
  700: '#008078',
  800: '#004d52',
  900: '#001a2c',
}
```

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Configurar Next.js 14 con TypeScript
- [ ] Configurar Tailwind CSS con colores turquesa personalizados
- [ ] Crear tipos TypeScript para Product y CartItem
- [ ] Crear store de Zustand para el carrito
- [ ] Crear array con 20 productos de ejemplo
- [ ] Crear componente Header con carrito funcional
- [ ] Crear componente Footer completo
- [ ] Crear componente ProductCard con todos los detalles
- [ ] Crear componente Hero impactante
- [ ] Crear página de inicio con todas las secciones
- [ ] Crear página de catálogo con filtros
- [ ] Crear página de detalle de producto
- [ ] Crear página de carrito funcional
- [ ] Crear páginas About y Contact
- [ ] Añadir animaciones y efectos visuales
- [ ] Asegurar diseño responsive
- [ ] Configurar SEO básico
- [ ] Crear página 404 personalizada

## 🚀 INSTRUCCIONES FINALES

1. Crea todos los archivos necesarios siguiendo la estructura
2. Implementa todas las funcionalidades mencionadas
3. Asegúrate de que el diseño sea premium y elegante
4. Usa imágenes de Unsplash para los productos (búsqueda: "perfume", "arabic perfume", "oud", "amber")
5. El código debe estar limpio, bien organizado y comentado donde sea necesario
6. Todos los textos deben estar en español
7. Los nombres de productos deben tener versión en árabe cuando sea apropiado
8. El diseño debe ser completamente responsive

---

**IMPORTANTE**: Este es un proyecto completo de tienda online. Asegúrate de implementar TODAS las funcionalidades mencionadas y crear un diseño verdaderamente premium y profesional que refleje la calidad de los perfumes árabes de élite.
