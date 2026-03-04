# Gym Starter Kit

Plantilla HTML/CSS/JavaScript vanilla para crear sitios web de gimnasios. **Sin dependencias, sin React, sin Tailwind.** Solo copia y personaliza.

## ¿Por qué vanilla?

- ✅ Sin instalación de dependencias (`npm install` opcional)
- ✅ Sin compilación - sirve archivos directamente
- ✅ Personalización simple - un archivo JSON para cambiar todo
- ✅ Rendimiento máximo
- ✅ Fácil de copiar-pegar para cada cliente

## Estructura

```
gym-starter-kit/
├── index.html          # HTML semántico (estructura)
├── config.json         # 🔑 CAMBIAR AQUÍ: Nombre gym, colores, horarios, clases
├── css/
│   ├── styles.css      # Variables, componentes base, utilidades
│   └── layout.css      # Estilos de secciones (navbar, hero, etc)
├── js/
│   └── main.js         # Lógica: carga config.json, renderiza contenido
└── assets/
    └── images/         # Tus imágenes aquí
```

## Inicio Rápido

### Opción 1: Sin servidor (local)
1. Abre `index.html` en el navegador

### Opción 2: Con servidor local (recomendado)

**Windows (PowerShell):**
```powershell
python -m http.server 5173
```

**Mac/Linux:**
```bash
python3 -m http.server 5173
```

Luego abre `http://localhost:5173`

### Opción 3: Usando `npx`
```bash
npx http-server -p 5173
```

## Personalización (Lo más importante)

Todo se cambia en **`config.json`**. No toques HTML ni CSS.

### 1. Cambiar nombre y colores del gimnasio

```json
{
  "gym": {
    "name": "Tu Gym Aquí",
    "logo": {
      "text": "TG"  // Letras para el logo
    }
  },
  "colors": {
    "primary": "#2563eb",      // Color principal (azul)
    "secondary": "#1e40af",
    "accent": "#3b82f6",
    "background": "#0f172a",
    "surface": "#1e293b",
    "text": "#f8fafc",
    "textSecondary": "#94a3b8"
  }
}
```

### 2. Cambiar contacto y ubicación

```json
{
  "contact": {
    "whatsapp": "+34 600 123 456",
    "phone": "+34 600 123 456",
    "email": "info@tugymnasio.com",
    "address": "Calle Principal 123, Madrid",
    "googleMapsUrl": "https://maps.google.com/?q=..."
  }
}
```

### 3. Cambiar horarios

```json
{
  "schedule": {
    "monday": { "open": "06:00", "close": "23:00" },
    "tuesday": { "open": "06:00", "close": "23:00" },
    ...
  }
}
```

### 4. Cambiar clases

```json
{
  "classes": [
    {
      "name": "Tu Clase",
      "description": "Descripción corta",
      "image": "https://url-imagen.jpg",
      "intensity": "Alta",        // Baja-Media, Media, Media-Alta, Alta, Muy Alta
      "duration": "60 min",
      "instructor": "Nombre",
      "schedule": ["Lunes 18:00", "Miércoles 18:00"]
    }
  ]
}
```

### 5. Cambiar redes sociales

```json
{
  "socialMedia": {
    "instagram": "https://instagram.com/tugymnasio",
    "facebook": "https://facebook.com/tugymnasio",
    "twitter": "https://twitter.com/tugymnasio"
  }
}
```

## Cambios visuales (CSS)

Si quieres ajustar espaciado, tamaños de fuente, etc.:

**Para cambiar variables globales** → Edita `css/styles.css` (sección `:root`)
**Para cambiar componentes específicos** → Edita `css/layout.css`

Ejemplo de variable CSS:
```css
:root {
  --spacing-lg: 2rem;      /* Aumentar/disminuir espacios */
  --font-heading: 'Oswald'; /* Cambiar tipografía */
}
```

## Agregar imágenes locales

1. Coloca tus imágenes en `assets/images/`
2. En `config.json`, cambia las URLs:

```json
{
  "classes": [
    {
      "image": "assets/images/mi-clase.jpg"  // Ruta local
    }
  ]
}
```

## Desplegar (Hosting)

### Opción 1: Netlify (Recomendado - Gratis)
1. Crea una carpeta vacía en Netlify Drop
2. Arrastra la carpeta `gym-starter-kit` completa
3. ¡Listo! Tu sitio está online

### Opción 2: GitHub Pages (Gratis)
1. Push a GitHub: `git push origin main`
2. En Settings → Pages → Branch: main
3. Tu sitio está en `usuario.github.io/gym-starter-kit`

### Opción 3: Hosting tradicional (Hostinger, etc)
1. Copia todos los archivos al servidor FTP
2. Asegúrate que `index.html` esté en la raíz

## Solución de problemas

### Las imágenes no cargan
- Verifica la URL en `config.json`
- Si usas rutas locales: `assets/images/nombre.jpg`

### Los colores no cambian
- Revisa `config.json` - deben ser códigos hex válidos: `#RRGGBB`

### Botones de WhatsApp no funcionan
- Verifica el número en formato: `+34 600 123 456` (con espacios y +)
- El código país es obligatorio

## Estructuras de Archivos NO Necesarios (puedes eliminar)

```
src/                    # Carpeta de React (ELIMINAR)
  - components/
  - config/
  - etc.

vite.config.js          # Configuración de Vite (ELIMINAR)
postcss.config.js       # PostCSS (ELIMINAR)
tailwind.config.js      # Tailwind (ELIMINAR)
eslint.config.js        # ESLint (ELIMINAR)
package-lock.json       # (ELIMINAR)
```

## Tips Finales

1. **Copia el proyecto completo** para cada cliente
2. **Solo edita `config.json`** - ¡No rompas el HTML!
3. **Usa imágenes Unsplash/Pexels** si no tienes fotos
4. **Testea en móvil** antes de entregar
5. **Backup del config.json** antes de cambios grandes

## Licencia

MIT - Úsalo libremente en tus clientes

---

¿Preguntas? Lee `config.json` - está todo documentado ahí.
