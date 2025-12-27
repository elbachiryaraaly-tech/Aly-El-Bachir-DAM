# 🚀 Instrucciones Rápidas - Omar Arabic Perfume

## Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📝 Personalizar Productos

Edita el archivo `data/products.ts` para modificar o agregar productos. Cada producto incluye:

- Nombre en español y árabe
- Descripción
- Precio y precio original (para descuentos)
- Imagen (URL)
- Categoría
- Notas de fragancia
- Calificación y reseñas

## 🎨 Personalizar Colores

Los colores principales están en `tailwind.config.js`:
- **Turquoise**: #00e6c4 (azul turquesa principal)
- **Turquoise Dark**: #00b39e (azul turquesa oscuro)
- **Turquoise Light**: #80ffe6 (azul turquesa claro)

## 🌐 Agregar Más Idiomas

Para agregar soporte multiidioma:

1. Instala `next-intl` o similar
2. Crea archivos de traducción en `/locales`
3. Actualiza los componentes para usar las traducciones

## 💳 Integrar Pasarela de Pago

Para agregar pagos:

1. Elige una pasarela (Stripe, PayPal, etc.)
2. Crea una API route en `/app/api/checkout`
3. Conecta el botón "Proceder al Pago" en `/app/cart/page.tsx`

## 📦 Desplegar

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Otras plataformas
```bash
npm run build
npm start
```

## 🔧 Configuración Adicional

- **SEO**: Edita `app/layout.tsx` para meta tags personalizados
- **Analytics**: Agrega Google Analytics o similar en `app/layout.tsx`
- **Email**: Configura servicio de email para el formulario de contacto

## 📞 Soporte

Para cualquier pregunta sobre la implementación, consulta la documentación de Next.js 14.
