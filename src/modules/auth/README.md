# Módulo de Autenticación

Este módulo contiene toda la lógica de autenticación organizada de manera modular y escalable.

## 📁 Estructura

```
src/modules/auth/
├── core/                    # Lógica de negocio
│   ├── actions/            # Server actions
│   ├── interface/          # Interfaces TypeScript
│   ├── models/             # Modelos de datos
│   └── schema/             # Esquemas de validación
├── hooks/                   # Custom hooks
├── services/               # Servicios de API
├── ui/                     # Componentes UI
│   ├── components/         # Componentes de interfaz
│   └── pages/              # Páginas específicas
└── utils/                  # Utilidades del módulo
    ├── api-interceptors.ts # Interceptores de API
    └── token-helper.ts     # Helpers para tokens
```

## 🔧 Interceptores de API

### `baseApiInterceptor`
- **Propósito**: Comunicación con el backend externo (Django/FastAPI/etc.)
- **Funcionalidad**: 
  - Añade automáticamente el token Bearer
  - Detecta si está en cliente o servidor
  - Añade headers adicionales (Subscription-Key, etc.)

### `internalApiInterceptor`
- **Propósito**: Comunicación interna con API routes de NextJS
- **Funcionalidad**:
  - Maneja autenticación para endpoints internos
  - Optimizado para el contexto de NextJS

### `externalApiErrorResponseInterceptor`
- **Propósito**: Manejo de errores del backend externo
- **Funcionalidad**:
  - Maneja errores 401, 403, 422, 500, etc.
  - Redirige al login cuando es necesario

### `internalApiErrorResponseInterceptor`
- **Propósito**: Manejo de errores de APIs internas
- **Funcionalidad**:
  - Maneja errores específicos de NextJS
  - Rate limiting, permisos, etc.

## 🛠️ Token Helper

### `getApiToken()`
- Compatible cliente/servidor
- Detecta automáticamente el contexto
- Retorna el token de acceso actual

### `getApiTokenClient()`
- Optimizado solo para cliente
- Más rápido en contexto de navegador

### `getSessionInfo()`
- Obtiene información completa de la sesión
- Incluye tokens y estado de error

## 📝 Uso

### En servicios
```typescript
import { api } from '@/lib/api';

// api automáticamente usa baseApiInterceptor
const response = await api.get('/users');
```

### Para APIs internas
```typescript
import { internalApi } from '@/lib/api';

// internalApi usa internalApiInterceptor
const response = await internalApi.get('/internal-endpoint');
```

## ✅ Beneficios

1. **Organización**: Todo relacionado con auth en un módulo
2. **Separación**: APIs externa e interna con diferentes interceptores
3. **Automático**: Detección de cliente/servidor sin configuración
4. **Escalable**: Fácil añadir nuevos interceptores o modificar existentes
5. **Tipado**: Full TypeScript con tipos extendidos de NextAuth

## 🔄 Migración

- ✅ Eliminado `server-api.ts` (ya no necesario)
- ✅ `serverApi` reemplazado por `api` en todos los servicios
- ✅ Interceptores organizados en módulo auth
- ✅ Detección automática cliente/servidor 