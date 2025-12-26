# 🤝 Guía de Contribución - CarDiag Pro Ultra

¡Gracias por tu interés en contribuir a CarDiag Pro Ultra! Este documento te guiará en el proceso.

## 📋 Tabla de Contenidos
1. [Código de Conducta](#código-de-conducta)
2. [Cómo Puedes Contribuir](#cómo-puedes-contribuir)
3. [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
4. [Proceso de Contribución](#proceso-de-contribución)
5. [Guías de Estilo](#guías-de-estilo)
6. [Reportar Bugs](#reportar-bugs)
7. [Sugerir Features](#sugerir-features)

---

## Código de Conducta

### Nuestro Compromiso
- Crear un ambiente acogedor para todos
- Respetar diferentes puntos de vista
- Aceptar críticas constructivas
- Enfocarse en lo mejor para la comunidad

### Comportamiento Esperado
✅ Usar lenguaje acogedor e inclusivo
✅ Respetar puntos de vista diferentes
✅ Aceptar críticas constructivas
✅ Enfocarse en el bien de la comunidad
✅ Mostrar empatía hacia otros miembros

### Comportamiento Inaceptable
❌ Lenguaje o imágenes sexualizadas
❌ Trolling o comentarios insultantes
❌ Ataques personales o políticos
❌ Acoso público o privado
❌ Publicar información privada de otros

---

## Cómo Puedes Contribuir

### 🐛 Reportar Bugs
¿Encontraste un error? Ayúdanos a mejorarlo:
1. Busca si ya existe un issue similar
2. Si no existe, crea uno nuevo
3. Incluye toda la información posible

### 💡 Sugerir Features
¿Tienes una idea genial?
1. Busca si ya fue sugerida
2. Crea un issue con etiqueta "feature request"
3. Describe claramente el beneficio

### 📝 Mejorar Documentación
- Corregir typos
- Aclarar explicaciones
- Agregar ejemplos
- Traducir a otros idiomas

### 💻 Contribuir Código
- Corregir bugs
- Implementar features
- Optimizar rendimiento
- Agregar tests

### 🎨 Diseño
- Mejorar UI/UX
- Crear iconos
- Diseñar mockups
- Proponer temas

---

## Configuración del Entorno de Desarrollo

### 1. Fork y Clone
```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU-USUARIO/cardiag-pro-ultra.git
cd cardiag-pro-ultra

# Agrega el repositorio original como upstream
git remote add upstream https://github.com/ORIGINAL/cardiag-pro-ultra.git
```

### 2. Instala Dependencias
```bash
npm run install:all
```

### 3. Crea una Rama
```bash
git checkout -b feature/mi-nueva-caracteristica
# O para bugs
git checkout -b fix/correccion-del-bug
```

### 4. Configura Pre-commit Hooks (Opcional)
```bash
npm install -g husky
npm run prepare
```

---

## Proceso de Contribución

### 1. Mantén tu Fork Actualizado
```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Realiza tus Cambios
- Escribe código limpio y comentado
- Sigue las guías de estilo
- Agrega tests si es posible
- Actualiza documentación si es necesario

### 3. Commit tus Cambios
```bash
# Usa commits semánticos
git add .
git commit -m "feat: agregar nueva característica X"
```

#### Tipos de Commit
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato (no afecta el código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### 4. Push a tu Fork
```bash
git push origin feature/mi-nueva-caracteristica
```

### 5. Crea un Pull Request
1. Ve a GitHub
2. Click en "New Pull Request"
3. Selecciona tu rama
4. Completa la plantilla de PR
5. Espera revisión

---

## Guías de Estilo

### TypeScript/JavaScript

#### Naming Conventions
```typescript
// Variables y funciones: camelCase
const myVariable = 'value';
function myFunction() {}

// Clases: PascalCase
class MyClass {}

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Interfaces: PascalCase con prefijo I (opcional)
interface IVehicle {}
```

#### Formato
```typescript
// Usar 2 espacios para indentación
function example() {
  if (condition) {
    doSomething();
  }
}

// Punto y coma al final
const x = 5;

// Comillas simples para strings
const message = 'Hello World';

// Template literals para interpolación
const greeting = `Hello, ${name}!`;
```

#### Comentarios
```typescript
// Comentarios inline para explicaciones breves
const speed = 100; // km/h

/**
 * Comentarios de documentación para funciones/clases
 * @param rpm - Revoluciones por minuto
 * @returns Potencia calculada en HP
 */
function calculatePower(rpm: number): number {
  return rpm * 0.05;
}
```

### React/JSX

#### Componentes
```tsx
// Componentes funcionales con arrow functions
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return (
    <div className="my-class">
      {/* Contenido */}
    </div>
  );
};

// Props destructuradas
interface Props {
  title: string;
  value: number;
}
```

#### Hooks
```tsx
// useState al inicio del componente
const [state, setState] = useState<Type>(initialValue);

// useEffect con dependencies claras
useEffect(() => {
  // Effect
  return () => {
    // Cleanup
  };
}, [dependency]);
```

### CSS/Tailwind

```tsx
// Preferir Tailwind classes
<div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
  
// Para estilos complejos, usar clases CSS custom
<div className="glass card-hover">

// Orden de clases Tailwind: Layout > Spacing > Colors > Effects
className="flex flex-col gap-4 p-6 bg-blue-500 rounded-xl shadow-lg"
```

---

## Reportar Bugs

### Antes de Reportar
1. Actualiza a la última versión
2. Busca si ya fue reportado
3. Intenta reproducir el bug

### Información a Incluir
```markdown
## Descripción del Bug
[Descripción clara y concisa]

## Pasos para Reproducir
1. Ir a '...'
2. Click en '...'
3. Ver error

## Comportamiento Esperado
[Qué debería pasar]

## Comportamiento Actual
[Qué está pasando]

## Screenshots
[Si es posible]

## Entorno
- OS: [Windows 11 / macOS 13 / Ubuntu 22.04]
- Browser: [Chrome 120]
- Versión: [1.0.0]

## Información Adicional
[Logs, mensajes de error, etc.]
```

---

## Sugerir Features

### Template de Feature Request
```markdown
## Feature Propuesto
[Título claro]

## Problema a Resolver
[¿Qué problema resuelve?]

## Solución Propuesta
[Cómo debería funcionar]

## Alternativas Consideradas
[Otras formas de resolver el problema]

## Beneficios
- Beneficio 1
- Beneficio 2

## Mockups/Ejemplos
[Imágenes, diagramas, etc.]
```

---

## Testing

### Ejecutar Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# E2E tests
npm run test:e2e
```

### Escribir Tests
```typescript
describe('MyComponent', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle click events', () => {
    // Test implementation
  });
});
```

---

## Revisión de Pull Requests

### Qué Esperamos
- ✅ Código funcional y testeado
- ✅ Documentación actualizada
- ✅ Sin conflictos con main
- ✅ Tests pasando
- ✅ Cumple guías de estilo

### Proceso de Revisión
1. Un mantenedor revisará tu PR
2. Pueden solicitar cambios
3. Realiza los cambios solicitados
4. Una vez aprobado, será merged

### Tiempos
- PRs pequeños: 1-3 días
- PRs medianos: 3-7 días
- PRs grandes: 1-2 semanas

---

## Reconocimientos

Todos los contribuidores serán agregados a:
- README.md (sección Contributors)
- About page de la aplicación
- Release notes correspondiente

---

## Preguntas?

- 💬 Discord: [discord.gg/cardiagpro](https://discord.gg/cardiagpro)
- 📧 Email: contributors@cardiagpro.com
- 🐦 Twitter: [@CarDiagPro](https://twitter.com/CarDiagPro)

---

¡Gracias por contribuir a CarDiag Pro Ultra! 🚗💨
