import { app as i, BrowserWindow as d, ipcMain as p, screen as g, nativeImage as R, Tray as P, Menu as j } from "electron";
import { fileURLToPath as _ } from "node:url";
import r from "node:path";
const b = [
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
    interval: 150 * 60 * 1e3,
    reminder: {
      emoji: "💺",
      title: "Hora de sentarte",
      message: "Volvé a sentarte y acomodá tu postura."
    }
  },
  {
    interval: 180 * 60 * 1e3,
    reminder: {
      emoji: "🍎",
      title: "Comé algo",
      message: "Hacé una pausa y comé algo."
    }
  },
  {
    interval: 60 * 60 * 1e3,
    reminder: {
      emoji: "👀",
      title: "Descansá la vista",
      message: "Mirar lejos durante unos segundos."
    }
  }
];
function E() {
  const t = /* @__PURE__ */ new Date(), n = t.getDay(), o = t.getHours(), s = n >= 1 && n <= 5, l = o >= 8 && o < 19;
  return s && l;
}
function I(t) {
  b.forEach(({ interval: n, reminder: o }) => {
    setInterval(() => {
      E() && t(o);
    }, n);
  });
}
const h = r.dirname(_(import.meta.url));
process.env.APP_ROOT = r.join(h, "..");
const u = process.env.VITE_DEV_SERVER_URL, A = r.join(process.env.APP_ROOT, "dist-electron"), y = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = u ? r.join(process.env.APP_ROOT, "public") : y;
let e = null, c = null, a = null;
const f = {
  emoji: "⏱️",
  title: "Recordatorio de prueba",
  message: "Esta es una prueba del overlay."
};
function v() {
  const t = g.getPrimaryDisplay(), { width: n, height: o } = t.bounds;
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
      preload: r.join(h, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), u ? e.loadURL(u) : e.loadFile(r.join(y, "index.html"));
}
function k() {
  const t = r.join(process.env.VITE_PUBLIC, "icon.png"), n = R.createFromPath(t);
  c = new P(n), c.setToolTip("Break Reminder");
  const o = j.buildFromTemplate([
    {
      label: "Mostrar prueba",
      click: () => {
        m(f);
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
function D() {
  i.setLoginItemSettings({
    openAtLogin: !0,
    path: i.getPath("exe")
  });
}
function m(t) {
  if (!e) return;
  a && (clearTimeout(a), a = null);
  const n = g.getPrimaryDisplay(), { x: o, y: s, width: l, height: T } = n.bounds;
  e.setBounds({ x: o, y: s, width: l, height: T }), e.setAlwaysOnTop(!0, "screen-saver"), e.setKiosk(!0), e.show(), e.focus(), e.webContents.send("reminder", t), a = setTimeout(() => {
    w();
  }, 1e4);
}
function w() {
  e && (a && (clearTimeout(a), a = null), e.webContents.send("hide-overlay"), e.hide());
}
i.on("window-all-closed", () => {
  process.platform !== "darwin" && (i.quit(), e = null);
});
i.on("activate", () => {
  d.getAllWindows().length === 0 && v();
});
p.on("show-overlay", () => {
  m(f);
});
p.on("hide-overlay", () => {
  w();
});
i.whenReady().then(() => {
  v(), k(), D(), I((t) => {
    m(t);
  });
});
export {
  A as MAIN_DIST,
  y as RENDERER_DIST,
  u as VITE_DEV_SERVER_URL
};
