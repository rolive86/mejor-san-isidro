# MEJOR San Isidro — App de Afiliación

PWA mobile-first para afiliación de ciudadanos.

---

## Estructura del proyecto

```
mejor-san-isidro/
├── app/
│   ├── api/
│   │   ├── padron/route.js       ← consulta al padrón
│   │   └── afiliacion/route.js   ← guarda la solicitud
│   ├── globals.css
│   ├── layout.js
│   └── page.js                   ← toda la app (4 pasos)
├── lib/
│   ├── padron.js                 ← servicio padrón (lectura)
│   └── afiliados.js              ← servicio afiliados (escritura)
├── public/
│   ├── manifest.json             ← PWA manifest
│   └── sw.js                     ← Service Worker
├── sql/
│   └── crear_tabla_afiliaciones.sql
├── .env.local                    ← variables de entorno (NO subir a git)
├── .gitignore
├── next.config.js
└── package.json
```

---

## Setup paso a paso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear tabla en Supabase AFILIADOS

Ir a: https://supabase.com/dashboard/project/dcrtzqjjfjdgmccrbyau/sql

Pegar y ejecutar el contenido de `sql/crear_tabla_afiliaciones.sql`

### 3. Correr en desarrollo

```bash
npm run dev
```

Abrir http://localhost:3000

### 4. Deploy en Vercel

```bash
npm install -g vercel
vercel
```

En Vercel → Settings → Environment Variables, agregar las mismas
variables que están en `.env.local` (Vercel no lee ese archivo en producción).

---

## Variables de entorno (Vercel)

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_PADRON_URL` | https://uegrtfyyentppgefuqdw.supabase.co |
| `NEXT_PUBLIC_SUPABASE_PADRON_ANON_KEY` | (ver .env.local) |
| `NEXT_PUBLIC_SUPABASE_PADRON_TABLE` | padron_disponible |
| `NEXT_PUBLIC_SUPABASE_AFILIADOS_URL` | https://dcrtzqjjfjdgmccrbyau.supabase.co |
| `NEXT_PUBLIC_SUPABASE_AFILIADOS_ANON_KEY` | (ver .env.local) |
| `SUPABASE_AFILIADOS_SERVICE_ROLE_KEY` | (ver .env.local) ⚠️ secreto |

---

## Seguridad

- El padrón solo se consulta con `anon key` (solo lectura)
- Los afiliados se escriben **únicamente desde el servidor** con `service_role key`
- RLS activado: ningún usuario puede acceder directo a la tabla `afiliaciones`
- Los archivos (DNI y firma) se guardan en buckets **privados** de Storage
- El `.env.local` está en `.gitignore` — nunca se sube al repositorio
