import { app as i, BrowserWindow as d, ipcMain as p, screen as h, nativeImage as R, Tray as P, Menu as _ } from "electron";
import { fileURLToPath as b } from "node:url";
import r from "node:path";
const E = [
  {
    interval: 45 * 60 * 1e3,
    reminder: {
      emoji: "🧍",
      title: "Hora de pararte",
      message: "Levantate y cambiá de postura."
    }
  },
  {
    interval: 90 * 60 * 1e3,
    reminder: {
      emoji: "💧",
      title: "Tomá agua",
      message: "Levantate a buscar agua."
    }
  },
  {
    interval: 120 * 60 * 1e3,
    reminder: {
      emoji: "🚶",
      title: "Hora de caminar",
      message: "Caminá unos minutos."
    }
  },
  {
    interval: 180 * 60 * 1e3,
    reminder: {
      emoji: "🍎",
      title: "Comé algo",
      message: "Hacé una pausa y comé algo."
    }
  }
];
function I() {
  const t = /* @__PURE__ */ new Date(), n = t.getDay(), o = t.getHours(), s = n >= 1 && n <= 5, l = o >= 8 && o < 19;
  return s && l;
}
function j(t) {
  E.forEach(({ interval: n, reminder: o }) => {
    setInterval(() => {
      I() && t(o);
    }, n);
  });
}
const f = r.dirname(b(import.meta.url));
process.env.APP_ROOT = r.join(f, "..");
const u = process.env.VITE_DEV_SERVER_URL, C = r.join(process.env.APP_ROOT, "dist-electron"), y = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = u ? r.join(process.env.APP_ROOT, "public") : y;
let e = null, c = null, a = null;
const g = {
  emoji: "⏱️",
  title: "Recordatorio de prueba",
  message: "Esta es una prueba del overlay."
};
function w() {
  const t = h.getPrimaryDisplay(), { width: n, height: o } = t.bounds;
  e = new d({
    x: 0,
    y: 0,
    width: n,
    height: o,
    show: !1,
    frame: !1,
    fullscreen: !0,
    kiosk: !0,
    alwaysOnTop: !0,
    skipTaskbar: !0,
    autoHideMenuBar: !0,
    backgroundColor: "#121212",
    icon: r.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: r.join(f, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), u ? e.loadURL(u) : e.loadFile(r.join(y, "index.html"));
}
function k() {
  const t = r.join(process.env.VITE_PUBLIC, "icon.png"), n = R.createFromPath(t);
  c = new P(n), c.setToolTip("Break Reminder");
  const o = _.buildFromTemplate([
    {
      label: "Mostrar prueba",
      click: () => {
        m(g);
      }
    },
    { type: "separator" },
    {
      label: "Salir",
      click: () => {
        i.quit();
      }
    }
  ]);
  c.setContextMenu(o);
}
function L() {
  i.setLoginItemSettings({
    openAtLogin: !0,
    path: i.getPath("exe")
  });
}
function m(t) {
  if (!e) return;
  a && (clearTimeout(a), a = null);
  const n = h.getPrimaryDisplay(), { x: o, y: s, width: l, height: v } = n.bounds;
  e.setBounds({ x: o, y: s, width: l, height: v }), e.setAlwaysOnTop(!0, "screen-saver"), e.setKiosk(!0), e.show(), e.focus(), e.webContents.send("reminder", t), a = setTimeout(() => {
    T();
  }, 1e4);
}
function T() {
  e && (a && (clearTimeout(a), a = null), e.webContents.send("hide-overlay"), e.hide());
}
i.on("window-all-closed", () => {
  process.platform !== "darwin" && (i.quit(), e = null);
});
i.on("activate", () => {
  d.getAllWindows().length === 0 && w();
});
p.on("show-overlay", () => {
  m(g);
});
p.on("hide-overlay", () => {
  T();
});
i.whenReady().then(() => {
  w(), k(), L(), j((t) => {
    m(t);
  });
});
export {
  C as MAIN_DIST,
  y as RENDERER_DIST,
  u as VITE_DEV_SERVER_URL
};
