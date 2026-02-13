# SEGURIDAD Y CUMPLIMIENTO - SarafPro

## Sistema Elite de Cambio de Moneda

---

**Documento:** Política de Seguridad, Privacidad y Cumplimiento Normativo  
**Versión:** 1.0  
**Fecha:** Febrero 2026  

---

## 1. RESUMEN DE SEGURIDAD

### 1.1 Principios de Seguridad

SarafPro se diseña siguiendo el principio de **seguridad por defecto** y **defensa en profundidad**:

| Principio | Aplicación |
|-----------|-----------|
| **Mínimo privilegio** | Cada usuario solo accede a lo que necesita |
| **Defensa en profundidad** | Múltiples capas de protección |
| **Seguridad por defecto** | Las opciones por defecto son las más seguras |
| **Datos mínimos** | Solo se recopilan datos necesarios para la operación |
| **Fail-safe** | En caso de error, el sistema se bloquea (no se abre) |

### 1.2 Modelo de Amenazas

| # | Amenaza | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| 1 | Pérdida/robo del dispositivo | Media | CRÍTICO | Encriptación, borrado remoto, autenticación fuerte |
| 2 | Acceso no autorizado | Media | ALTO | PIN + biometría, bloqueo automático |
| 3 | Interceptación de datos en tránsito | Baja | ALTO | TLS 1.3, certificate pinning |
| 4 | Manipulación de transacciones | Baja | CRÍTICO | Log inmutable, hash de integridad |
| 5 | Pérdida de datos | Media | CRÍTICO | Backups redundantes (local + cloud) |
| 6 | Ingeniería social | Media | MEDIO | Formación, alertas de operaciones inusuales |
| 7 | Malware en el dispositivo | Baja | ALTO | Detección de root/jailbreak, integridad de la app |
| 8 | Fallo del servidor cloud | Baja | BAJO | Arquitectura offline-first, el cloud no es crítico |

---

## 2. AUTENTICACIÓN Y CONTROL DE ACCESO

### 2.1 Métodos de Autenticación

#### Acceso Rápido (día a día)

```
┌──────────────────────────────────────────┐
│          PANTALLA DE BLOQUEO              │
│                                           │
│        ┌───────────────────┐              │
│        │   [Logo SarafPro]  │              │
│        └───────────────────┘              │
│                                           │
│   Opción 1: PIN de 6 dígitos             │
│   ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐             │
│   │●│ │●│ │●│ │○│ │○│ │○│             │
│   └─┘ └─┘ └─┘ └─┘ └─┘ └─┘             │
│                                           │
│   Opción 2: Huella dactilar              │
│        [👆 Toque para desbloquear]        │
│                                           │
│   Opción 3: Face ID (si disponible)      │
│                                           │
│   ─────────────────────────               │
│   ¿Olvidó su PIN? → Contraseña maestra   │
└──────────────────────────────────────────┘
```

#### Especificaciones de PIN

| Aspecto | Especificación |
|---------|---------------|
| Longitud | 6 dígitos obligatorios |
| Almacenamiento | bcrypt hash con salt |
| Intentos máximos | 5 intentos → bloqueo de 5 minutos |
| Tras 10 intentos fallidos | Bloqueo total → requiere contraseña maestra |
| Cambio de PIN | Requiere PIN actual o contraseña maestra |
| PIN prohibidos | 000000, 123456, 111111, etc. |

#### Autenticación Biométrica

| Aspecto | Especificación |
|---------|---------------|
| Huella dactilar | Mediante API del sistema operativo (Android BiometricPrompt) |
| Face ID | Donde esté disponible |
| Fallback | Siempre se puede usar PIN como alternativa |
| Almacenamiento | Las credenciales biométricas no salen del dispositivo |

#### Contraseña Maestra (Recuperación)

| Aspecto | Especificación |
|---------|---------------|
| Longitud mínima | 12 caracteres |
| Complejidad | Al menos 1 mayúscula, 1 minúscula, 1 número |
| Uso | Solo para recuperación de PIN y operaciones sensibles |
| Almacenamiento | Argon2 hash |

### 2.2 Control de Sesión

| Aspecto | Especificación |
|---------|---------------|
| Timeout por inactividad | 2 minutos (configurable: 1-10 min) |
| Al minimizar la app | Pantalla de bloqueo inmediata |
| Al cambiar de app | Requiere autenticación al volver |
| Sesión máxima | 12 horas → re-autenticación obligatoria |
| Cierre de sesión | Manual disponible en cualquier momento |

### 2.3 Control de Acceso Basado en Roles (RBAC)

| Permiso | Admin | Operador | Visor |
|---------|-------|----------|-------|
| Realizar cambios | ✅ | ✅ (con límite) | ❌ |
| Ver transacciones | ✅ | ✅ (propias) | ✅ |
| Modificar tasas | ✅ | ❌ | ❌ |
| Gestionar caja | ✅ | ✅ (movimientos) | ❌ |
| Cierre de caja | ✅ | ✅ (iniciar) | ❌ |
| Aprobar cierres | ✅ | ❌ | ❌ |
| Gestionar clientes | ✅ | ✅ (básico) | ✅ (ver) |
| Ver analytics | ✅ | ✅ (limitado) | ✅ |
| Enviar notificaciones | ✅ | ✅ (recibos) | ❌ |
| Gestionar usuarios | ✅ | ❌ | ❌ |
| Configuración | ✅ | ❌ | ❌ |
| Ver logs de auditoría | ✅ | ❌ | ❌ |
| Anular operaciones | ✅ | ❌ | ❌ |
| Exportar datos | ✅ | ✅ (limitado) | ✅ |
| Backup/Restaurar | ✅ | ❌ | ❌ |

### 2.4 Aprobación Dual para Operaciones Sensibles

Las siguientes operaciones requieren confirmación adicional del administrador:

| Operación | Requiere Aprobación |
|-----------|-------------------|
| Operaciones superiores a umbral configurable | Sí (PIN del admin) |
| Anulación de transacciones | Sí |
| Ajustes de inventario | Sí |
| Borrado de datos | Sí (doble confirmación) |
| Exportación masiva de datos | Sí |
| Cambio de tasas (si se configura) | Opcional |

---

## 3. ENCRIPTACIÓN Y PROTECCIÓN DE DATOS

### 3.1 Datos en Reposo (Local)

| Componente | Método de Encriptación |
|-----------|----------------------|
| Base de datos SQLite | SQLCipher (AES-256-CBC) |
| Hive boxes | Cifrado AES-256 con clave derivada |
| Archivos de recibos (PDF) | Almacenamiento encriptado Android |
| Logs de auditoría | Encriptados con clave del sistema |
| Credenciales | Flutter Secure Storage (Android Keystore) |
| Backups locales | AES-256-GCM |

**Derivación de claves:**
```
Clave maestra = PBKDF2(contraseña_maestra, salt, 100000 iteraciones)
Clave de DB = HKDF(clave_maestra, "database")
Clave de files = HKDF(clave_maestra, "files")
Clave de backup = HKDF(clave_maestra, "backup")
```

### 3.2 Datos en Tránsito

| Aspecto | Especificación |
|---------|---------------|
| Protocolo | TLS 1.3 (mínimo TLS 1.2) |
| Certificate Pinning | Sí, para API de Supabase |
| API Keys | Almacenadas en Android Keystore, nunca en código |
| Headers sensibles | No se loguean |
| WhatsApp API | Comunicación vía HTTPS con token Bearer |

### 3.3 Datos en la Nube (Supabase)

| Aspecto | Especificación |
|---------|---------------|
| Encriptación en reposo | AES-256 (por defecto en Supabase/AWS) |
| Encriptación en tránsito | TLS 1.3 |
| Row Level Security (RLS) | Activada en todas las tablas |
| Acceso a datos | Solo el usuario autenticado accede a sus datos |
| Región del servidor | Europa (EU - Irlanda o Frankfurt) |
| Backups cloud | Encriptados con clave del cliente |

### 3.4 Políticas de Row Level Security (Supabase)

```sql
-- Ejemplo: Solo el propietario de los datos puede acceder
CREATE POLICY "usuarios_propios" ON transacciones
    FOR ALL
    USING (auth.uid() IN (
        SELECT id FROM usuarios WHERE negocio_id = transacciones.negocio_id
    ));

-- Los operadores solo ven sus propias transacciones
CREATE POLICY "operador_propias" ON transacciones
    FOR SELECT
    USING (
        operador_id = auth.uid() 
        OR 
        EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
    );
```

---

## 4. SEGURIDAD DEL DISPOSITIVO

### 4.1 Detección de Dispositivo Comprometido

| Verificación | Acción |
|-------------|--------|
| Dispositivo rooteado | Advertencia al iniciar + log |
| Emulador detectado | Bloqueo (en producción) |
| Depurador adjunto | Bloqueo (en producción) |
| App modificada (integridad) | Bloqueo + alerta |
| Versión de Android < 8 | Advertencia de seguridad |

### 4.2 Protección de Pantalla

| Función | Especificación |
|---------|---------------|
| Screenshot prevention | FLAG_SECURE en actividades sensibles |
| Task switcher | Pantalla en blanco al cambiar de app |
| Screen recording | Bloqueado en pantallas sensibles |
| Overlay detection | Alerta si se detectan overlays sospechosos |

### 4.3 Borrado Remoto

En caso de pérdida o robo del dispositivo:

1. El propietario accede al panel web
2. Marca el dispositivo como "perdido"
3. En la siguiente conexión a internet, la app:
   - Borra todos los datos locales de forma segura
   - Invalida todas las sesiones
   - Envía confirmación de borrado
4. Alternativa: El propietario cambia su contraseña en la web → invalida token del dispositivo

---

## 5. INTEGRIDAD Y AUDITORÍA

### 5.1 Integridad de Transacciones

Cada transacción incluye un hash de integridad:

```
hash = SHA-256(
    id + numero_referencia + tipo + moneda_origen + moneda_destino + 
    cantidad_origen + cantidad_destino + tasa_aplicada + 
    operador_id + created_at + salt_secreto
)
```

Esto permite verificar que ninguna transacción ha sido manipulada después de su registro.

### 5.2 Log de Auditoría

| Aspecto | Especificación |
|---------|---------------|
| Completitud | TODAS las acciones se registran |
| Inmutabilidad | Tabla append-only (INSERT ONLY, no UPDATE/DELETE) |
| Contenido | Quién, qué, cuándo, desde dónde, datos antes/después |
| Retención | 5 años mínimo |
| Exportación | CSV/PDF para auditoría externa |
| Acceso | Solo administrador |

### 5.3 Acciones Registradas en el Log

| Categoría | Acciones |
|-----------|---------|
| Autenticación | Login, logout, PIN incorrecto, bloqueo, desbloqueo |
| Transacciones | Crear, anular, corregir |
| Tasas | Crear, modificar |
| Inventario | Entrada, salida, ajuste |
| Cierres | Iniciar, aprobar, rechazar |
| Clientes | Crear, modificar, eliminar |
| Configuración | Cualquier cambio |
| Sistema | Backup, restauración, actualización, sync |
| Seguridad | Cambio de PIN, cambio de permisos, borrado remoto |

---

## 6. BACKUP Y RECUPERACIÓN

### 6.1 Estrategia de Backup

```
┌────────────────────────────────────────────────────────┐
│                 ESTRATEGIA DE BACKUP                     │
│                                                          │
│  NIVEL 1: Auto-guardado continuo                        │
│  └── Cada operación se persiste inmediatamente          │
│                                                          │
│  NIVEL 2: Backup local incremental                      │
│  └── Cada 6 horas (configurable)                        │
│  └── Se mantienen los últimos 30 días                   │
│                                                          │
│  NIVEL 3: Backup cloud                                   │
│  └── Cada 24 horas (cuando hay conexión)                │
│  └── Encriptado AES-256 antes de subir                  │
│  └── Se mantiene 1 año                                  │
│                                                          │
│  NIVEL 4: Backup manual                                  │
│  └── Bajo demanda del administrador                     │
│  └── Exportable a almacenamiento externo                │
│                                                          │
│  NIVEL 5: Sincronización continua                       │
│  └── Cada operación se encola para sync                 │
│  └── Se sincroniza cuando hay conexión                  │
└────────────────────────────────────────────────────────┘
```

### 6.2 Proceso de Backup Cloud

```
1. Trigger (automático o manual)
        ↓
2. Snapshot de la base de datos local
        ↓
3. Compresión (gzip)
        ↓
4. Encriptación (AES-256-GCM con clave del usuario)
        ↓
5. Subida a Supabase Storage (HTTPS)
        ↓
6. Verificación de integridad (checksum)
        ↓
7. Confirmación y log
```

### 6.3 Proceso de Restauración

| Desde | Tiempo Estimado | Pasos |
|-------|----------------|-------|
| Backup local | < 30 segundos | Seleccionar backup → Confirmar → Restaurar |
| Backup cloud | 2-5 minutos | Descargar → Desencriptar → Verificar → Restaurar |
| Nuevo dispositivo | 5-10 minutos | Login cloud → Descargar último backup → Restaurar |

### 6.4 Plan de Recuperación ante Desastres

| Escenario | RPO (datos perdidos) | RTO (tiempo recuperación) |
|-----------|---------------------|--------------------------|
| App se cierra inesperadamente | 0 (auto-guardado) | Inmediato |
| Dispositivo se reinicia | 0 | < 1 minuto |
| Dispositivo se pierde/rompe | Máx 24 horas | 10-30 minutos (nuevo dispositivo) |
| Cuenta Supabase comprometida | 0 (backup local) | 1-2 horas |
| Corrupción de datos | Último backup íntegro | 5-30 minutos |

---

## 7. CUMPLIMIENTO NORMATIVO

### 7.1 Marco Legal de Argelia

| Regulación | Aplicación a SarafPro | Estado |
|-----------|----------------------|--------|
| Ley 18-05 de Comercio Electrónico | Protección de datos personales de clientes | Aplicable |
| Ley 09-04 sobre Prevención del Blanqueo | Registro de operaciones, identificación de clientes | Aplicable |
| Banco de Argelia (regulaciones de cambio) | Cumplimiento con regulación cambiaria vigente | A consultar |
| Ordenanza 03-11 sobre Moneda y Crédito | Marco general de operaciones monetarias | A consultar |

**Nota importante:** Se recomienda al cliente consultar con un asesor legal local para asegurar que sus operaciones de cambio cumplen con la legislación vigente. SarafPro es una herramienta de gestión; la responsabilidad del cumplimiento legal recae en el operador.

### 7.2 Protección de Datos Personales

Aunque Argelia no tiene un equivalente exacto al GDPR europeo, SarafPro implementa las mejores prácticas internacionales:

| Principio GDPR | Implementación en SarafPro |
|---------------|---------------------------|
| Minimización de datos | Solo se recopilan datos necesarios para la operación |
| Limitación de propósito | Los datos se usan solo para la gestión del cambio |
| Exactitud | El cliente puede solicitar corrección de sus datos |
| Limitación de almacenamiento | Política de retención definida por tipo de dato |
| Integridad y confidencialidad | Encriptación en reposo y tránsito |
| Responsabilidad proactiva | Logs de auditoría, control de acceso |

### 7.3 Prevención de Blanqueo de Capitales (PBC/AML)

SarafPro incluye funcionalidades que facilitan el cumplimiento con normativas anti-blanqueo:

| Funcionalidad | Descripción |
|--------------|-------------|
| Registro de clientes | Identificación de clientes para operaciones significativas |
| Registro de operaciones | Trazabilidad completa de cada transacción |
| Alertas de operaciones inusuales | Detección de patrones sospechosos |
| Umbral de operación grande | Alerta configurable para montos elevados |
| Exportación de datos | Para presentar a autoridades si se requiere |
| Retención de registros | 5 años de historial completo |

### 7.4 Know Your Customer (KYC) Simplificado

Para clientes frecuentes, SarafPro permite registrar:

| Dato | Obligatorio | Uso |
|------|------------|-----|
| Nombre completo | Sí (si se registra) | Identificación |
| Número de teléfono | No | Contacto |
| Clasificación | Automática | Gestión |
| Historial de operaciones | Automático | Trazabilidad |
| Foto (opcional) | No | Reconocimiento |

**Nota:** El nivel de KYC depende de los requisitos legales locales y del volumen de operaciones. Se recomienda consultar con asesor legal.

---

## 8. SEGURIDAD DE LA COMUNICACIÓN (WhatsApp)

### 8.1 Protección de Datos en WhatsApp

| Aspecto | Medida |
|---------|--------|
| Cifrado end-to-end | Proporcionado por WhatsApp |
| Datos compartidos | Solo tasas (públicas) y recibos (mínimos datos) |
| Sin datos sensibles | Nunca se envían datos financieros completos por WhatsApp |
| Consentimiento | Solo se envían mensajes a clientes que lo han autorizado |
| Opt-out | Los clientes pueden darse de baja en cualquier momento |

### 8.2 Contenido de Mensajes

| Tipo de Mensaje | Datos Incluidos | Datos Excluidos |
|----------------|----------------|-----------------|
| Difusión de tasas | Tasas públicas, horario | Datos de clientes, volúmenes |
| Recibo | Nº referencia, monedas, montos de ESA operación | Datos de otros clientes |
| Alerta personal | Información genérica | Datos financieros detallados |

---

## 9. SEGURIDAD EN EL DESARROLLO

### 9.1 Prácticas de Desarrollo Seguro

| Práctica | Implementación |
|---------|---------------|
| Code review | Revisión obligatoria antes de merge |
| Static Analysis | Análisis estático con Dart analyzer |
| Dependency Audit | Revisión de dependencias con `pub outdated` |
| Secrets Management | Sin secrets en código → variables de entorno |
| OWASP Mobile Top 10 | Verificación contra checklist |
| Input Validation | Validación estricta en frontend y backend |
| SQL Injection | Prevenida con queries parametrizadas (drift) |

### 9.2 Gestión de Secretos

| Secreto | Almacenamiento |
|---------|---------------|
| API Keys de producción | GitHub Secrets → inyectadas en build |
| Clave de encriptación de DB | Derivada del PIN/contraseña del usuario |
| Token de Supabase | Rotación periódica, almacenado seguro |
| Certificados TLS | Embebidos en la app (pinning) |
| WhatsApp API Token | Supabase Vault (encriptado en servidor) |

### 9.3 Proceso de Release Seguro

```
1. Desarrollo en rama feature
        ↓
2. Code review por otro desarrollador
        ↓
3. Tests automatizados (unit + integration)
        ↓
4. Análisis estático de seguridad
        ↓
5. Build de release firmado
        ↓
6. QA manual en dispositivo real
        ↓
7. Firma del APK con keystore seguro
        ↓
8. Distribución controlada
```

---

## 10. PLAN DE RESPUESTA A INCIDENTES

### 10.1 Clasificación de Incidentes

| Nivel | Descripción | Tiempo de Respuesta | Ejemplo |
|-------|------------|--------------------|---------| 
| **P1 - Crítico** | Pérdida de datos, brecha de seguridad | < 2 horas | Dispositivo robado, datos expuestos |
| **P2 - Alto** | Funcionalidad comprometida | < 8 horas | App no arranca, datos corruptos |
| **P3 - Medio** | Funcionalidad degradada | < 24 horas | Sync no funciona, error en cálculo |
| **P4 - Bajo** | Inconveniente menor | < 72 horas | Error visual, traducción incorrecta |

### 10.2 Procedimiento ante Robo/Pérdida de Dispositivo

```
PASO 1: Reportar la pérdida (llamar al soporte)
    ↓
PASO 2: Activar borrado remoto desde panel web
    ↓
PASO 3: Cambiar contraseña de la cuenta cloud
    ↓
PASO 4: Revocar sesiones activas
    ↓
PASO 5: Obtener nuevo dispositivo
    ↓
PASO 6: Instalar SarafPro + restaurar desde backup cloud
    ↓
PASO 7: Verificar integridad de datos
    ↓
PASO 8: Reanudar operaciones
```

### 10.3 Procedimiento ante Sospecha de Acceso No Autorizado

```
PASO 1: Cambiar PIN inmediatamente
    ↓
PASO 2: Revisar log de auditoría (últimas 24-48h)
    ↓
PASO 3: Verificar integridad de transacciones
    ↓
PASO 4: Cambiar contraseña cloud
    ↓
PASO 5: Cerrar todas las sesiones activas
    ↓
PASO 6: Revisar y ajustar permisos de usuarios
    ↓
PASO 7: Contactar soporte si se detectan anomalías
```

---

## 11. CHECKLIST DE SEGURIDAD PRE-LANZAMIENTO

| # | Verificación | Estado |
|---|-------------|--------|
| 1 | Encriptación de DB local activada | ☐ |
| 2 | Encriptación de backups verificada | ☐ |
| 3 | PIN/contraseña almacenados como hash | ☐ |
| 4 | Certificate pinning implementado | ☐ |
| 5 | RLS activado en todas las tablas de Supabase | ☐ |
| 6 | Sin secretos hardcodeados en el código | ☐ |
| 7 | FLAG_SECURE en actividades sensibles | ☐ |
| 8 | Detección de root/jailbreak funcionando | ☐ |
| 9 | Timeout de sesión funcionando | ☐ |
| 10 | Log de auditoría registrando todas las acciones | ☐ |
| 11 | Backup cloud encriptado y verificado | ☐ |
| 12 | Borrado remoto funcional | ☐ |
| 13 | Inputs validados contra inyección | ☐ |
| 14 | Tests de seguridad OWASP Top 10 pasados | ☐ |
| 15 | APK firmado con keystore de producción | ☐ |
| 16 | ProGuard/R8 activado (ofuscación) | ☐ |
| 17 | Análisis de vulnerabilidades de dependencias | ☐ |
| 18 | Política de privacidad redactada | ☐ |

---

## 12. FORMACIÓN EN SEGURIDAD

### 12.1 Para el Propietario/Admin

| Tema | Duración | Contenido |
|------|----------|----------|
| Gestión de credenciales | 30 min | Importancia del PIN, contraseña maestra, no compartir |
| Backup y restauración | 30 min | Cómo funciona, cómo restaurar |
| Respuesta a incidentes | 30 min | Qué hacer si pierden el dispositivo o sospechan acceso |
| Gestión de usuarios | 30 min | Crear/desactivar usuarios, asignar roles |
| Borrado remoto | 15 min | Cómo activarlo si es necesario |

### 12.2 Para Operadores

| Tema | Duración | Contenido |
|------|----------|----------|
| Acceso seguro | 15 min | PIN personal, no compartir, bloqueo automático |
| Buenas prácticas | 15 min | No dejar el dispositivo desatendido, reportar anomalías |
| Qué hacer ante problemas | 15 min | A quién informar, qué no hacer |

---

## 13. MANTENIMIENTO DE SEGURIDAD

### 13.1 Actividades Periódicas

| Actividad | Frecuencia | Responsable |
|-----------|-----------|-------------|
| Actualización de dependencias | Mensual | Equipo de desarrollo |
| Revisión de logs de seguridad | Semanal | Admin del negocio |
| Rotación de tokens de API | Trimestral | Equipo de desarrollo |
| Auditoría de permisos de usuarios | Mensual | Admin del negocio |
| Verificación de backups | Semanal (automática) | Sistema |
| Actualización de la app | Según releases | Equipo de desarrollo |
| Revisión de política de seguridad | Semestral | Equipo de desarrollo |

### 13.2 Métricas de Seguridad

| Métrica | Objetivo | Medición |
|---------|---------|----------|
| Intentos de acceso fallidos | < 5/día | Automática |
| Tiempo medio sin actualizar | < 30 días | Automática |
| Backups exitosos | > 95% | Automática |
| Operaciones sin trazabilidad | 0 | Automática |
| Incidentes de seguridad | 0 | Manual |

---

*Este documento forma parte del informe completo de propuesta del proyecto SarafPro.*

---

**Documentos relacionados:**
- [Propuesta del Proyecto](PROPUESTA_PROYECTO.md)
- [Arquitectura Técnica](ARQUITECTURA_TECNICA.md)
- [Funcionalidades Detalladas](FUNCIONALIDADES.md)
- [Modelo de Datos](MODELO_DATOS.md)
- [Plan de Implementación y Presupuesto](PLAN_IMPLEMENTACION.md)
