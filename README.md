# Omar Arabic Perfume - Tienda Online de Élite

Una tienda online profesional y moderna para perfumes árabes de élite desde Tindouf, Argelia.

## 🎨 Características

- **Diseño Premium**: Interfaz elegante con colores azul turquesa y blanco
- **20 Productos**: Catálogo completo de perfumes árabes de alta calidad
- **Carrito de Compras**: Sistema completo de gestión de carrito
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Internacional**: Preparado para ventas mundiales
- **SEO Optimizado**: Meta tags y estructura optimizada para buscadores

## 🚀 Tecnologías

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Estilos modernos y responsivos
- **Zustand**: Gestión de estado del carrito
- **React Icons**: Iconos elegantes

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🌐 Páginas

- **/** - Página de inicio con productos destacados
- **/products** - Catálogo completo de productos con filtros
- **/products/[id]** - Detalle de producto individual
- **/cart** - Carrito de compras
- **/about** - Sobre nosotros
- **/contact** - Página de contacto

## 🎯 Funcionalidades

### Productos
- 20 productos de ejemplo con información completa
- Categorías: Oud, Amber, Musk, Floral, Woody, Luxury
- Sistema de filtrado por categoría
- Productos destacados
- Precios con descuentos
- Calificaciones y reseñas

### Carrito
- Añadir/eliminar productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia en sesión

### Diseño
- Colores: Azul turquesa (#00e6c4) y blanco
- Animaciones suaves
- Efectos hover elegantes
- Tipografía premium (Playfair Display + Inter)

## 📱 Responsive

La tienda está completamente optimizada para:
- Móviles
- Tablets
- Desktop
- Pantallas grandes

## 🌍 Internacionalización

Preparado para:
- Múltiples idiomas (estructura lista para expansión)
- Múltiples monedas
- Envíos internacionales

## 📝 Estructura del Proyecto

```
├── app/                 # Páginas y rutas
│   ├── page.tsx        # Página principal
│   ├── products/       # Páginas de productos
│   ├── cart/          # Carrito
│   ├── about/         # Sobre nosotros
│   └── contact/       # Contacto
├── components/         # Componentes reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── Hero.tsx
├── data/              # Datos de productos
├── store/             # Estado global (Zustand)
├── types/             # Tipos TypeScript
└── public/            # Archivos estáticos
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en `tailwind.config.js`:
- Turquoise: #00e6c4
- Turquoise Dark: #00b39e
- Turquoise Light: #80ffe6

### Productos
Los productos se pueden editar en `data/products.ts`. Cada producto incluye:
- Nombre (español y árabe)
- Descripción
- Precio
- Imágenes
- Categoría
- Notas de fragancia
- Calificaciones

## 📧 Contacto

Para más información sobre la tienda, visita la página de contacto en `/contact`.

## 📄 Licencia

Todos los derechos reservados © 2024 Omar Arabic Perfume
