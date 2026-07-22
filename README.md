# Break Reminder

Aplicación de escritorio para recordar pausas activas durante la jornada de trabajo.

La aplicación funciona en segundo plano y muestra un overlay cuando corresponde hacer una pausa:

* 🧍 Pararse y cambiar de postura.
* 💧 Tomar agua.
* 🚶 Caminar unos minutos.
* 🍎 Comer algo.

---

## Requisitos

* Windows 10/11
* Node.js instalado
* Dependencias instaladas con npm

---

# Desarrollo

## Instalar dependencias

Desde la carpeta del proyecto:

```bash
npm install
```

## Ejecutar en modo desarrollo

```bash
npm run dev
```

Esto abre la aplicación usando Vite + Electron.

---

# Modificar recordatorios

Los recordatorios están definidos en:

```
src/config/reminders.ts
```

Ejemplo:

```ts
{
  interval: 45 * 60 * 1000,
  reminder: {
    emoji: '🧍',
    title: 'Hora de pararte',
    message: 'Levantate y cambiá de postura.',
  },
}
```

## Cambiar frecuencia

El valor `interval` está expresado en milisegundos.

Ejemplos:

### Cada 30 minutos

```ts
interval: 30 * 60 * 1000
```

### Cada 1 hora

```ts
interval: 60 * 60 * 1000
```

### Cada 2 horas

```ts
interval: 120 * 60 * 1000
```

---

## Agregar un nuevo recordatorio

Agregar un nuevo elemento dentro del array:

```ts
{
  interval: 60 * 60 * 1000,
  reminder: {
    emoji: '👀',
    title: 'Descansá la vista',
    message: 'Mirar lejos durante unos segundos.',
  },
}
```

No hace falta modificar el scheduler.

---

# Horario de funcionamiento

El scheduler está configurado para funcionar:

* Lunes a viernes.
* Desde las 08:00 hasta las 19:00.

La lógica está en:

```
src/scheduler/scheduler.ts
```

Si querés cambiar el horario, modificar:

```ts
const workHour = hour >= 8 && hour < 19;
```

Por ejemplo, hasta las 20:

```ts
const workHour = hour >= 8 && hour < 20;
```

---

# Ejecutar automáticamente al iniciar Windows

La aplicación debe quedar configurada para iniciarse automáticamente.

Para verificarlo:

1. Abrir la aplicación.
2. Ir al menú del ícono de la bandeja del sistema.
3. Confirmar que queda ejecutándose en segundo plano.

Si se agregó correctamente el inicio automático, cada vez que prendas la computadora:

* Windows iniciará Break Reminder.
* La aplicación quedará en segundo plano.
* Los recordatorios aparecerán automáticamente durante la jornada.

---

# Crear una versión instalable

Para generar el instalador de Windows:

```bash
npm run build:win
```

El instalador generado aparecerá en la carpeta:

```
dist/
```

Después de instalar la aplicación, no necesitás abrirla manualmente si el inicio automático está configurado.

---

# Archivos importantes

```
src/
├── config/
│   └── reminders.ts
│       → Lista de recordatorios y frecuencias.
│
├── scheduler/
│   └── scheduler.ts
│       → Decide cuándo ejecutar recordatorios.
│
├── overlay/
│   └── overlay.ts
│       → Diseño y comportamiento del mensaje.
│
├── types/
│   └── reminder.ts
│       → Modelo de datos de los recordatorios.
│
electron/
├── main.ts
│   → Configuración de la ventana, tray e integración con Windows.
│
└── preload.ts
    → Comunicación segura entre Electron y la interfaz.
```

---

# Desarrollo rápido

Para probar un recordatorio sin esperar:

En `src/config/reminders.ts` cambiar temporalmente:

```ts
interval: 45 * 60 * 1000
```

por:

```ts
interval: 10 * 1000
```

Luego ejecutar:

```bash
npm run dev
```

Después volver a dejar el valor original.

---

# Objetivo del proyecto

Mantener una rutina saludable durante jornadas largas frente a la computadora sin interrumpir el trabajo innecesariamente.
