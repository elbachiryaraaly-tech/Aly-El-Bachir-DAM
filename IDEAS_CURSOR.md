# Ideas de Valor "Ultra Bestial" para Cursor Editor

Este documento recopila estrategias de alto impacto para maximizar la productividad y el valor económico utilizando Cursor.

## 1. Modernización y Migración de Código Legacy (Alto Valor Económico)
El mantenimiento de código antiguo es costoso. Usa Cursor para:
- **Migración de Frameworks:** "Migra este componente de clase de React a Functional Component con Hooks y TypeScript."
- **Cambio de Lenguaje:** "Reescribe este script de procesamiento de datos de Python a Rust para mejorar el rendimiento, manteniendo la misma lógica de negocio."
- **Eliminación de Deuda Técnica:** "Analiza este archivo, identifica código muerto, variables no usadas y patrones ineficientes, y refactorízalo para que sea limpio y mantenible."

## 2. Generación de Suites de Pruebas Robustas (Calidad y Estabilidad)
Reduce bugs en producción y costos de QA.
- **Cobertura de Casos Borde:** "Genera tests unitarios para esta función de cálculo financiero. Asegúrate de cubrir casos extremos como números negativos, división por cero y desbordamiento de enteros."
- **Tests de Integración:** "Crea un test de integración que simule un flujo completo de usuario: registro, login, añadir al carrito y checkout."
- **TDD Inverso:** "Escribe los tests para una función que debe hacer X, Y y Z. Luego, implementa la función para que pasen los tests."

## 3. Aceleración de Desarrollo de MVPs y SaaS (Velocidad de Mercado)
Lanza productos más rápido.
- **Scaffolding Completo:** "Genera la estructura de directorios y archivos base para una API REST con Node.js, Express y TypeScript, incluyendo configuración de Docker y conexión a PostgreSQL."
- **Funcionalidades CRUD Instantáneas:** "Crea los controladores, modelos y rutas para una entidad 'Producto' con campos nombre, precio, stock y categoría."
- **Integración de Servicios:** "Implementa una integración con la API de Stripe para procesar pagos recurrentes, incluyendo el manejo de webhooks."

## 4. Documentación y Entendimiento de Codebases Complejas (Onboarding y Mantenimiento)
Ahorra horas de lectura de código.
- **Explicación de Lógica Compleja:** Selecciona un bloque de código difícil y pregunta: "¿Qué hace exactamente este algoritmo y cuáles son sus dependencias?"
- **Generación de Documentación de API:** "Genera una especificación OpenAPI (Swagger) basada en las rutas y controladores de mi API actual."
- **README Automático:** "Escribe un README.md profesional para este proyecto, explicando cómo instalarlo, configurarlo y usarlo, basándote en el `package.json` y el código fuente."

## 5. Optimización de Rendimiento y Seguridad (Reducción de Costos)
Mejora la eficiencia y protege tus datos.
- **Optimización SQL:** "Analiza esta consulta SQL compleja y sugiere índices o reescrituras para optimizar su tiempo de ejecución."
- **Auditoría de Seguridad:** "Revisa este código en busca de vulnerabilidades comunes como inyección SQL, XSS o exposición de datos sensibles."
- **Refactorización de Algoritmos:** "Esta función es O(n^2). ¿Puedes proponer una versión optimizada que sea O(n log n) o O(n)?"

## 6. Infraestructura como Código (DevOps Automatizado)
- **Dockerización:** "Escribe un Dockerfile optimizado multi-stage para esta aplicación de Next.js."
- **Terraform/Kubernetes:** "Genera los manifiestos de Kubernetes para desplegar esta aplicación con 3 réplicas y un LoadBalancer."
