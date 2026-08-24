/* ============================================================
   Bora pro Carrinho?  ·  escala de turnos do testemunho público
   Alan Correa · vanilla JS + Firebase (Auth e-mail/senha + Firestore)
   ============================================================ */

/* ---------- 1. FIREBASE E VERSÃO ----------------------------
   A configuração do Firebase fica no index.html, dentro da tag
   <script> que define window.FIREBASE_CONFIG. Assim você troca os
   dados do projeto sem mexer neste arquivo.
--------------------------------------------------------------- */
const firebaseConfig = window.FIREBASE_CONFIG || {};

const VERSAO = "bora-v6";
const SDK = "https://www.gstatic.com/firebasejs/10.12.5/";

/* ---------- 2. CONSTANTES ---------- */
const PALETAS = [
  { id: "azul",       nome: "Azul",      cor: "#2C5E99" },
  { id: "esmeralda",  nome: "Esmeralda", cor: "#1E7A5F" },
  { id: "terracota",  nome: "Terracota", cor: "#C1653D" },
  { id: "ametista",   nome: "Ametista",  cor: "#6C4FA6" },
  { id: "vinho",      nome: "Vinho",     cor: "#8C2F44" },
  { id: "petroleo",   nome: "Petróleo",  cor: "#1B6B78" },
  { id: "dourado",    nome: "Dourado",   cor: "#A9791F" },
  { id: "grafite",    nome: "Grafite",   cor: "#3A3F47" },
  { id: "coral",      nome: "Coral",     cor: "#D65D5D" },
  { id: "oliva",      nome: "Oliva",     cor: "#5C6E3C" },
  { id: "indigo",     nome: "Índigo",    cor: "#4453A8" },
  { id: "rosa",       nome: "Rosa",      cor: "#B4487E" }
];
const FONTES = [
  { id: "inter",       nome: "Inter",         family: '"Inter", sans-serif' },
  { id: "poppins",     nome: "Poppins",       family: '"Poppins", sans-serif' },
  { id: "roboto",      nome: "Roboto",        family: '"Roboto", sans-serif' },
  { id: "opensans",    nome: "Open Sans",     family: '"Open Sans", sans-serif' },
  { id: "lato",        nome: "Lato",          family: '"Lato", sans-serif' },
  { id: "montserrat",  nome: "Montserrat",    family: '"Montserrat", sans-serif' },
  { id: "nunito",      nome: "Nunito",        family: '"Nunito", sans-serif' },
  { id: "merriweather",nome: "Merriweather",  family: '"Merriweather", serif' },
  { id: "quicksand",   nome: "Quicksand",     family: '"Quicksand", sans-serif' },
  { id: "sourcesans",  nome: "Source Sans 3", family: '"Source Sans 3", sans-serif' }
];
const TAMANHOS = [
  { id: "sm", nome: "Pequena", escala: 0.92 },
  { id: "md", nome: "Média",   escala: 1 },
  { id: "lg", nome: "Grande",  escala: 1.1 },
  { id: "xl", nome: "Extra",   escala: 1.22 }
];
const MODALIDADES = [
  { id: "carrinho", nome: "Carrinho" },
  { id: "display",  nome: "Display" },
  { id: "mesa",     nome: "Mesa" }
];
const DIAS_CURTOS = ["D", "S", "T", "Q", "Q", "S", "S"];

const ICONS = {
  sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/></svg>',
  search:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  home:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  calendar:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  people:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 13.2c2.7.4 4.5 1.8 4.5 3.8"/></svg>',
  pin:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 21s7-6.3 7-11.5A7 7 0 105 9.5C5 14.7 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>',
  plus:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  chevL:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  chevR:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  trash:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-8 0l1 13a2 2 0 002 2h4a2 2 0 002-2l1-13"/></svg>',
  gear:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1.04 1.56V21a2 2 0 11-4 0v-.09A1.7 1.7 0 008.96 19a1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.7 1.7 0 004.6 15a1.7 1.7 0 00-1.56-1.04H3a2 2 0 110-4h.09A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 008.96 4.6a1.7 1.7 0 001.04-1.56V3a2 2 0 114 0v.09A1.7 1.7 0 0015.04 4.6a1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06A1.7 1.7 0 0019.4 9a1.7 1.7 0 001.56 1.04H21a2 2 0 110 4h-.09A1.7 1.7 0 0019.4 15z"/></svg>',
  check:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>',
  cart:'<svg width="22" height="22" viewBox="0 0 100 100" ><g transform="rotate(8 50 52) translate(50 52) scale(0.9) translate(-50 -52)"><path d="M17 6h6v82h-6z" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M23 5h52v32H23z" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M21 40h54v12H21z" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M21 47.6h54" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M48.0 40v7.6" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M23 56h56v12H23z" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M23 63.6h56" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M41.7 56v7.6" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M60.3 56v7.6" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M25 72h58v12H25z" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M25 79.6h58" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M44.3 72v7.6" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M63.7 72v7.6" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M21 88l7 4M75 87l-3 4" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><circle cx="31" cy="93" r="7.5" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><circle cx="69" cy="93" r="5.5" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/></g></svg>',
  logout:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 17l5-5-5-5M20 12H9M11 3H6a2 2 0 00-2 2v14a2 2 0 002 2h5"/></svg>',
  clock:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

/* ---------- 3. UTILITÁRIOS ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const app = document.getElementById("app");
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const agora = () => Date.now();

function iso(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function deIso(s) { const p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
function hojeIso() { return iso(new Date()); }
function somaDias(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function mesmoDia(a, b) { return iso(a) === iso(b); }
function fmtLongo(d) { return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" }); }
function fmtCurto(d) { return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }); }
function fmtBr(s) { const p = String(s).split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
function iniciais(n) {
  const p = String(n || "?").trim().split(/\s+/);
  return ((p[0][0] || "?") + (p[1] ? p[1][0] : "")).toUpperCase();
}
function cap1(s) { s = String(s); return s.charAt(0).toUpperCase() + s.slice(1); }
function ordenaNome(a, b) { return a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }); }

const CORES_AVATAR = ["#2C5E99","#C1653D","#1E7A5F","#6C4FA6","#A9791F","#3D7BC9","#B4487E","#1B6B78","#8C2F44","#5C6E3C"];
function corDe(txt) {
  let h = 0; const s = String(txt);
  for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
  return CORES_AVATAR[Math.abs(h) % CORES_AVATAR.length];
}

/* cor: mistura e luminância */
function rgb(hex) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
}
function mix(cor, base, peso) {
  const c = rgb(cor), b = rgb(base);
  const v = k => Math.round(c[k] * peso + b[k] * (1 - peso)).toString(16).padStart(2, "0");
  return "#" + v("r") + v("g") + v("b");
}
function lum(hex) { const c = rgb(hex); return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255; }

function toast(msg) {
  const antigo = $(".toast"); if (antigo) antigo.remove();
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
async function copiar(txt) {
  try { await navigator.clipboard.writeText(txt); toast("Copiado"); return; } catch (e) {}
  const ta = document.createElement("textarea");
  ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); toast("Copiado"); } catch (e) { toast("Não foi possível copiar"); }
  ta.remove();
}

/* ---------- 4. DADOS ---------- */
const K_DB = "bora:db", K_CFG = "bora:cfg";
let DB = { pes: [], loc: [], tur: [] };
let cfg = {
  tema: "claro", paleta: "azul", fonte: "inter", tamanho: "md",
  grupo: "", modoLocal: false, ultimoEmail: "", nome: ""
};

function carregar() {
  try { const d = JSON.parse(localStorage.getItem(K_DB) || "null"); if (d) DB = Object.assign(DB, d); } catch (e) {}
  try { const c = JSON.parse(localStorage.getItem(K_CFG) || "null"); if (c) cfg = Object.assign(cfg, c); } catch (e) {}
  ["pes","loc","tur"].forEach(k => { if (!Array.isArray(DB[k])) DB[k] = []; });
}
function salvarLocal() { try { localStorage.setItem(K_DB, JSON.stringify(DB)); } catch (e) {} }
function salvarCfg() { try { localStorage.setItem(K_CFG, JSON.stringify(cfg)); } catch (e) {} }
function salvar() { salvarLocal(); enviarNuvem(); }

const vivos = k => DB[k].filter(i => !i.rm);
const pes = id => DB.pes.find(p => p.id === id);
const loc = id => DB.loc.find(l => l.id === id);
const tur = id => DB.tur.find(t => t.id === id);
function pessoasOrdenadas(incluirInativos) {
  return vivos("pes").filter(p => incluirInativos || p.ativo !== false).sort(ordenaNome);
}
function locaisOrdenados() { return vivos("loc").sort(ordenaNome); }
function turnosDoDia(isoData) {
  return vivos("tur").filter(t => t.data === isoData).sort((a, b) => a.ini.localeCompare(b.ini));
}
function turnosNoIntervalo(a, b) {
  return vivos("tur").filter(t => t.data >= a && t.data <= b).sort((x, y) => (x.data + x.ini).localeCompare(y.data + y.ini));
}
function nomesDoTurno(t) {
  return (t.pes || []).map(id => (pes(id) || {}).nome).filter(Boolean).sort((a, b) => a.localeCompare(b, "pt-BR"));
}
function mesclar(remoto) {
  if (!remoto) return;
  ["pes","loc","tur"].forEach(k => {
    if (!Array.isArray(remoto[k])) return;
    const mapa = new Map();
    DB[k].forEach(i => mapa.set(i.id, i));
    remoto[k].forEach(r => {
      if (!r || !r.id) return;
      const l = mapa.get(r.id);
      if (!l || (r.at || 0) > (l.at || 0)) mapa.set(r.id, r);
    });
    DB[k] = Array.from(mapa.values());
  });
}

/* ---------- 5. TEMA (fundo acompanha a paleta) ---------- */
function paletaAtual() { return PALETAS.find(p => p.id === cfg.paleta) || PALETAS[0]; }
function aplicarTema() {
  const pal = paletaAtual();
  const cor = pal.cor;
  const escuro = cfg.tema === "escuro";
  const s = document.documentElement.style;
  const set = (k, v) => s.setProperty(k, v);

  if (escuro) {
    const primaria = lum(cor) < 0.5 ? mix(cor, "#FFFFFF", 0.58) : mix(cor, "#FFFFFF", 0.78);
    set("--bg",        mix(cor, "#000000", 0.07));
    set("--outerbg",   mix(cor, "#000000", 0.04));
    set("--surface",   mix(cor, "#000000", 0.13));
    set("--surface-2", mix(cor, "#000000", 0.20));
    set("--border",    mix(cor, "#000000", 0.30));
    set("--chipbg",    mix(cor, "#000000", 0.24));
    set("--chiptext",  mix(cor, "#FFFFFF", 0.62));
    set("--primary",   primaria);
    set("--accent",    primaria);
    set("--onprimary", "#080A0D");
    set("--text",      mix(cor, "#FFFFFF", 0.08));
    set("--textsec",   mix(cor, "#FFFFFF", 0.35));
    set("--navbg",     mix(cor, "#000000", 0.09) + "F0");
    set("--navborder", mix(cor, "#000000", 0.26));
    set("--navinactive", mix(cor, "#FFFFFF", 0.42));
    set("--shadow",    "rgba(0,0,0,0.6)");
  } else {
    const primaria = lum(cor) > 0.72 ? mix(cor, "#000000", 0.85) : cor;
    set("--bg",        mix(cor, "#FFFFFF", 0.055));
    set("--outerbg",   mix(cor, "#FFFFFF", 0.16));
    set("--surface",   mix(cor, "#FFFFFF", 0.012));
    set("--surface-2", mix(cor, "#FFFFFF", 0.10));
    set("--border",    mix(cor, "#FFFFFF", 0.19));
    set("--chipbg",    mix(cor, "#FFFFFF", 0.12));
    set("--chiptext",  mix(cor, "#000000", 0.86));
    set("--primary",   primaria);
    set("--accent",    primaria);
    set("--onprimary", lum(primaria) > 0.66 ? "#12161B" : "#FFFFFF");
    set("--text",      mix(cor, "#141A21", 0.10));
    set("--textsec",   mix(cor, "#5E6C7B", 0.16));
    set("--navbg",     mix(cor, "#FFFFFF", 0.02) + "EE");
    set("--navborder", mix(cor, "#FFFFFF", 0.17));
    set("--navinactive", mix(cor, "#93A2B2", 0.20));
    set("--shadow",    "rgba(20,26,33,0.10)");
  }
  const f = FONTES.find(x => x.id === cfg.fonte) || FONTES[0];
  set("--app-font", f.family);
  set("--app-font-display", f.family);
  const t = TAMANHOS.find(x => x.id === cfg.tamanho) || TAMANHOS[1];
  document.documentElement.style.fontSize = (16 * t.escala) + "px";
  const meta = document.getElementById("metatheme");
  if (meta) meta.setAttribute("content", escuro ? mix(cor, "#000000", 0.07) : mix(cor, "#FFFFFF", 0.055));
}

/* ---------- 6. ESTADO DE TELA ---------- */
const estado = {
  aba: "inicio",
  calendario: "semana",
  semanaOffset: 0,
  cursorMes: (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })(),
  diaSel: hojeIso(),
  buscaAberta: false,
  busca: "",
  cfgAberta: false,
  pronto: false,
  usuario: null,
  sync: "off",     // off | on | erro
  authTela: "entrar",
  authMsg: null
};

/* ---------- 7. FIREBASE ---------- */
let FB = null, unsub = null, filaEnvio = null;
const configPronta = () => !!firebaseConfig.apiKey && !/COLE_AQUI/.test(JSON.stringify(firebaseConfig));

async function iniciarFirebase() {
  if (!configPronta()) { cfg.modoLocal = true; return null; }
  const [aplic, auth, fs] = await Promise.all([
    import(SDK + "firebase-app.js"),
    import(SDK + "firebase-auth.js"),
    import(SDK + "firebase-firestore.js")
  ]);
  const appFb = aplic.initializeApp(firebaseConfig);
  FB = {
    auth: auth.getAuth(appFb),
    db: fs.getFirestore(appFb),
    a: auth, f: fs
  };
  try { await FB.f.enableIndexedDbPersistence(FB.db); } catch (e) {}
  return FB;
}
function refDoc() {
  const alvo = (cfg.grupo || "").trim().toLowerCase() || ("u_" + estado.usuario.uid);
  return FB.f.doc(FB.db, "carrinhos", alvo);
}
function guardaErroSync(origem, e) {
  estado.sync = "erro";
  estado.syncCodigo = (e && e.code) || "";
  estado.syncMsg = (e && e.message) || String(e);
  console.warn("sync (" + origem + "):", estado.syncCodigo, estado.syncMsg);
}
function textoErroSync() {
  const c = estado.syncCodigo || "";
  if (c.includes("permission-denied"))
    return "O Firestore recusou o acesso. Publique as regras que estão no README (Firestore Database → Regras).";
  if (c.includes("unavailable") || c.includes("network"))
    return "Sem conexão com o Firestore agora. Assim que a internet voltar ele sincroniza sozinho.";
  if (c.includes("not-found") || c.includes("failed-precondition"))
    return "O banco de dados ainda não foi criado no projeto (Firestore Database → Criar banco de dados).";
  if (c.includes("unauthenticated")) return "A sessão expirou. Saia da conta e entre de novo.";
  return estado.syncMsg || "Erro desconhecido.";
}
function assinarNuvem() {
  if (!FB || !estado.usuario) return;
  if (unsub) { unsub(); unsub = null; }
  estado.sync = "on"; estado.syncCodigo = ""; estado.syncMsg = "";
  unsub = FB.f.onSnapshot(refDoc(), snap => {
    const d = snap.data();
    estado.sync = "on"; estado.syncCodigo = ""; estado.syncMsg = "";
    if (d && d.dados) { mesclar(d.dados); salvarLocal(); }
    render();
  }, err => { guardaErroSync("leitura", err); render(); });
}
function enviarNuvem() {
  if (!FB || !estado.usuario) return;
  clearTimeout(filaEnvio);
  filaEnvio = setTimeout(async () => {
    try {
      await FB.f.setDoc(refDoc(), {
        dados: DB, atualizadoEm: agora(), por: estado.usuario.email || ""
      }, { merge: true });
      if (estado.sync !== "on") { estado.sync = "on"; estado.syncCodigo = ""; estado.syncMsg = ""; render(); }
      else estado.sync = "on";
    } catch (e) { guardaErroSync("envio", e); render(); }
  }, 700);
}
function tentarSincronizar() {
  if (!FB || !estado.usuario) { toast("Entre com e-mail e senha primeiro"); return; }
  estado.sync = "on"; estado.syncCodigo = ""; estado.syncMsg = "";
  assinarNuvem(); enviarNuvem(); render();
  toast("Tentando sincronizar…");
}
function erroAuth(e) {
  const c = (e && e.code) || "";
  if (c.includes("invalid-email")) return "E-mail inválido.";
  if (c.includes("missing-password")) return "Digite a senha.";
  if (c.includes("weak-password")) return "A senha precisa ter pelo menos 6 caracteres.";
  if (c.includes("email-already-in-use")) return "Já existe uma conta com esse e-mail. Use Entrar.";
  if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found"))
    return "E-mail ou senha não conferem.";
  if (c.includes("too-many-requests")) return "Muitas tentativas. Espere alguns minutos.";
  if (c.includes("network")) return "Sem conexão com a internet.";
  return "Não deu certo: " + (c || (e && e.message) || "erro desconhecido");
}

/* ---------- 8. RENDER ---------- */
function render() {
  aplicarTema();
  if (!estado.pronto) { app.innerHTML = telaCarregando(); return; }
  if (!estado.usuario && !cfg.modoLocal) { app.innerHTML = telaAuth(); return; }

  let html = topbarHTML() + '<div class="screen" id="screen">' + telaHTML() + "</div>" + navbarHTML();
  if (estado.buscaAberta) html += buscaHTML();
  if (estado.cfgAberta) html += cfgHTML();
  app.innerHTML = html;

  if (estado.buscaAberta) {
    const b = $("#caixaBusca");
    if (b) { b.focus(); b.value = estado.busca; b.selectionStart = b.selectionEnd = b.value.length; }
  }
  ligarSwipe();
}

function telaCarregando() {
  return '<div class="container" style="padding-top:80px">' +
    '<div class="skel" style="height:32px;width:60%;margin:0 auto 26px"></div>' +
    '<div class="skel"></div><div class="skel"></div><div class="skel"></div></div>';
}

function tituloHTML(tamanho) {
  return '<h1' + (tamanho ? ' style="font-size:' + tamanho + ';font-weight:800;letter-spacing:-.02em;line-height:1.08;text-align:center"' : '') + '>' +
    '<span class="title-mark">Bora</span> pro Carrinho<span class="title-mark">?</span></h1>';
}

function topbarHTML() {
  const subs = { inicio: "Início", agenda: "Agenda", pessoas: "Participantes", locais: "Locais" };
  const pontoSync = cfg.modoLocal ? "" :
    '<span class="sync-dot" style="background:' + (estado.sync === "erro" ? "var(--danger)" : "var(--ok)") + '"></span>';
  return '<div class="topbar">' +
      '<div class="titles">' + tituloHTML() +
        '<div class="tab-sub row gap6">' + pontoSync + '<span>' + subs[estado.aba] + '</span></div>' +
      '</div>' +
      '<button class="icon-btn" data-act="busca-abrir" aria-label="Buscar">' + ICONS.search + '</button>' +
      '<button class="icon-btn" data-act="cfg-abrir" aria-label="Configurações">' + ICONS.gear + '</button>' +
      '<button class="icon-btn" data-act="tema-toggle" aria-label="Tema">' + (cfg.tema === "claro" ? ICONS.moon : ICONS.sun) + '</button>' +
    '</div>';
}

function telaHTML() {
  if (estado.aba === "inicio") return inicioHTML();
  if (estado.aba === "agenda") return agendaHTML();
  if (estado.aba === "pessoas") return pessoasHTML();
  return locaisHTML();
}

function navbarHTML() {
  const itens = [
    { id: "inicio", icon: ICONS.home, label: "Início" },
    { id: "agenda", icon: ICONS.calendar, label: "Agenda" },
    { id: "__fab" },
    { id: "pessoas", icon: ICONS.people, label: "Pessoas" },
    { id: "locais", icon: ICONS.pin, label: "Locais" }
  ];
  return '<div class="navbar">' + itens.map(it => {
    if (it.id === "__fab")
      return '<button class="navitem fab-item" data-act="novo-turno"><span class="icon-wrap">' + ICONS.plus + '</span><span class="label">Turno</span></button>';
    return '<button class="navitem' + (estado.aba === it.id ? " active" : "") + '" data-act="aba" data-aba="' + it.id + '">' +
      '<span class="icon-wrap">' + it.icon + '</span><span class="label">' + it.label + '</span></button>';
  }).join("") + "</div>";
}

/* ----- avatares e blocos ----- */
function pilhaAvatares(ids, tam) {
  tam = tam || 32;
  const mostra = ids.slice(0, 3), extra = ids.length - mostra.length;
  let h = mostra.map(id => {
    const p = pes(id); if (!p) return "";
    return '<div class="avatar" style="width:' + tam + 'px;height:' + tam + 'px;font-size:' + Math.round(tam * 0.34) + 'px;background:' + corDe(p.nome) + '">' + esc(iniciais(p.nome)) + "</div>";
  }).join("");
  if (extra > 0) h += '<div class="more-badge" style="width:' + tam + 'px;height:' + tam + 'px;font-size:' + Math.round(tam * 0.3) + 'px">+' + extra + "</div>";
  return '<div class="avatar-stack">' + h + "</div>";
}

function blocoTurno(t, opts) {
  opts = opts || {};
  const l = loc(t.locId) || { nome: "Local removido", cor: "#8A94A0" };
  const nomes = nomesDoTurno(t);
  const sub = nomes.length ? esc(nomes.join(", ")) : '<span class="vaga-badge">Sem participantes</span>';
  const mod = (MODALIDADES.find(m => m.id === t.mod) || MODALIDADES[0]).nome;
  const bloco =
    '<button class="agenda-block" data-act="editar-turno" data-id="' + t.id + '">' +
      '<div class="stripe" style="background:' + (l.cor || corDe(l.nome)) + '"></div>' +
      '<div class="time">' + esc(t.ini) + '<br><span class="muted" style="font-weight:500">' + esc(t.fim) + "</span></div>" +
      '<div class="info">' +
        '<div class="title">' + esc(l.nome) + (opts.data ? ' <span class="muted" style="font-weight:500;font-size:.75rem">' + fmtBr(t.data) + "</span>" : "") + "</div>" +
        '<div class="sub">' + sub + "</div>" +
        '<div class="sub" style="opacity:.75">' + esc(mod) + (t.obs ? " · " + esc(t.obs) : "") + "</div>" +
      "</div>" +
      pilhaAvatares(t.pes || [], 30) +
    "</button>";
  if (!opts.swipe) return '<div style="margin-bottom:10px">' + bloco + "</div>";
  return '<div class="swipe-wrap" data-swipe="' + t.id + '">' +
      '<div class="swipe-delete" data-act="excluir-turno" data-id="' + t.id + '">' + ICONS.trash + "</div>" + bloco +
    "</div>";
}

/* ----- INÍCIO ----- */
function inicioHTML() {
  const hj = hojeIso();
  const doDia = turnosDoDia(hj);
  const ini = somaDias(new Date(), -new Date().getDay());
  const semana = turnosNoIntervalo(iso(ini), iso(somaDias(ini, 6)));
  const proximos = vivos("tur").filter(t => t.data > hj).sort((a, b) => (a.data + a.ini).localeCompare(b.data + b.ini)).slice(0, 3);

  const hora = new Date().getHours();
  const saud = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
  const quem = (cfg.nome || "").trim();

  let hoje;
  if (doDia.length) {
    hoje = doDia.map(t => blocoTurno(t, {})).join("");
  } else {
    hoje = '<div class="card empty-state">Nenhum turno marcado para hoje.<br>' +
      '<button class="btn btn-secondary" style="margin-top:12px" data-act="novo-turno">Marcar um turno</button></div>';
  }

  return '<div class="container" style="padding-top:16px">' +
    '<button class="saudacao" data-act="nome">' + saud + (quem ? ", " + esc(quem) : "") + "</button>" +
    '<div class="row between" style="margin:10px 0 12px">' +
      '<div class="section-title" style="margin:0">Hoje, ' + esc(fmtCurto(new Date())) + "</div>" +
      (doDia.length ? '<button class="chip" data-act="copiar" data-alvo="dia">' + ICONS.copy + " Copiar</button>" : "") +
    "</div>" +
    hoje +
    '<div class="stats-row">' +
      '<div class="card stat-card"><div class="stat-num">' + doDia.length + '</div><div class="stat-label">Turnos hoje</div></div>' +
      '<div class="card stat-card"><div class="stat-num">' + semana.length + '</div><div class="stat-label">Turnos nesta semana</div></div>' +
      '<div class="card stat-card"><div class="stat-num">' + pessoasOrdenadas().length + '</div><div class="stat-label">Participantes ativos</div></div>' +
      '<div class="card stat-card"><div class="stat-num">' + locaisOrdenados().length + '</div><div class="stat-label">Locais</div></div>' +
    "</div>" +
    '<div class="section-title">Esta semana</div>' + faixaSemanaHTML() +
    '<div class="section-title">Próximos turnos</div>' +
    (proximos.length ? proximos.map(t => blocoTurno(t, { data: true })).join("")
      : '<div class="card empty-state">Nada marcado depois de hoje.</div>') +
    "</div>";
}

function faixaSemanaHTML() {
  const ini = somaDias(new Date(), -new Date().getDay());
  let cols = "";
  for (let i = 0; i < 7; i++) {
    const d = somaDias(ini, i), s = iso(d);
    const tem = turnosDoDia(s).length > 0;
    cols += '<button class="day-col' + (s === hojeIso() ? " today" : "") + (tem ? " has-event" : "") + '" data-act="ir-dia" data-dia="' + s + '">' +
      '<div class="dname">' + DIAS_CURTOS[d.getDay()] + "</div>" +
      '<div class="dnum">' + d.getDate() + "</div><div class=\"ddot\"></div></button>";
  }
  return '<div class="week-grid">' + cols + "</div>";
}

/* ----- AGENDA ----- */
function agendaHTML() {
  const sel = deIso(estado.diaSel);
  const doDia = turnosDoDia(estado.diaSel);
  const blocos = doDia.length ? doDia.map(t => blocoTurno(t, { swipe: true })).join("")
    : '<div class="empty-state">Sem turnos neste dia.<br><span style="font-size:.75rem">Toque em Turno para marcar.</span></div>';
  const alvo = estado.calendario === "semana" ? "semana" : "mes";
  const rotulo = estado.calendario === "semana" ? "Copiar a semana" : "Copiar o mês";

  return '<div class="container" style="padding-top:16px">' +
    calToggleHTML() +
    (estado.calendario === "semana" ? semanaHTML() : mesHTML()) +
    '<div class="row between" style="margin:6px 0 10px">' +
      '<div class="day-head" style="margin:0">' + esc(cap1(fmtLongo(sel))) + "</div>" +
      '<button class="chip" data-act="copiar" data-alvo="' + alvo + '">' + ICONS.copy + " " + rotulo + "</button>" +
    "</div>" +
    blocos +
    '<button class="btn btn-secondary btn-block" style="margin-top:6px" data-act="novo-turno">' + ICONS.plus + " Novo turno neste dia</button>" +
  "</div>";
}

function calToggleHTML() {
  return '<div class="cal-toggle">' +
    '<button class="cal-toggle-opt' + (estado.calendario === "semana" ? " selected" : "") + '" data-act="calmode" data-modo="semana">Semana</button>' +
    '<button class="cal-toggle-opt' + (estado.calendario === "mes" ? " selected" : "") + '" data-act="calmode" data-modo="mes">Mês inteiro</button>' +
  "</div>";
}

function semanaHTML() {
  const base = somaDias(new Date(), estado.semanaOffset * 7 - new Date().getDay());
  let cols = "";
  for (let i = 0; i < 7; i++) {
    const d = somaDias(base, i), s = iso(d);
    const tem = turnosDoDia(s).length > 0;
    cols += '<button class="day-col' + (s === hojeIso() ? " today" : "") + (tem ? " has-event" : "") + (s === estado.diaSel ? " selected" : "") + '" data-act="dia" data-dia="' + s + '">' +
      '<div class="dname">' + DIAS_CURTOS[d.getDay()] + "</div>" +
      '<div class="dnum">' + d.getDate() + "</div><div class=\"ddot\"></div></button>";
  }
  return '<div class="week-nav">' +
      '<button class="icon-btn" data-act="semana-ant" aria-label="Semana anterior">' + ICONS.chevL + "</button>" +
      '<div class="label">' + esc(fmtCurto(base)) + " a " + esc(fmtCurto(somaDias(base, 6))) + "</div>" +
      '<button class="icon-btn" data-act="semana-prox" aria-label="Próxima semana">' + ICONS.chevR + "</button>" +
    "</div>" +
    '<div class="week-grid">' + cols + "</div>";
}

function mesHTML() {
  const c = estado.cursorMes;
  const primeiro = new Date(c.getFullYear(), c.getMonth(), 1);
  const inicioGrade = somaDias(primeiro, -primeiro.getDay());
  let cells = "";
  for (let i = 0; i < 42; i++) {
    const d = somaDias(inicioGrade, i), s = iso(d);
    const noMes = d.getMonth() === c.getMonth();
    const n = turnosDoDia(s).length;
    let pontos = "";
    if (n) {
      pontos = '<span class="mdots">';
      for (let k = 0; k < Math.min(n, 3); k++) pontos += '<span class="mdot"></span>';
      pontos += "</span>";
    }
    cells += '<button class="month-cell' + (noMes ? "" : " out") + (s === hojeIso() ? " today" : "") + (s === estado.diaSel ? " selected" : "") +
      '" data-act="dia" data-dia="' + s + '">' + d.getDate() + pontos + "</button>";
  }
  const total = vivos("tur").filter(t => t.data.slice(0, 7) === iso(primeiro).slice(0, 7)).length;
  return '<div class="week-nav">' +
      '<button class="icon-btn" data-act="mes-ant" aria-label="Mês anterior">' + ICONS.chevL + "</button>" +
      '<div class="label">' + esc(cap1(c.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }))) + "</div>" +
      '<button class="icon-btn" data-act="mes-prox" aria-label="Próximo mês">' + ICONS.chevR + "</button>" +
    "</div>" +
    '<div class="month-weekdays">' + DIAS_CURTOS.map(w => "<div>" + w + "</div>").join("") + "</div>" +
    '<div class="month-grid">' + cells + "</div>" +
    '<div class="hint" style="margin:-6px 0 14px;text-align:center">' + total + (total === 1 ? " turno neste mês" : " turnos neste mês") + "</div>";
}

/* ----- PESSOAS ----- */
function pessoasHTML() {
  const lista = vivos("pes").sort(ordenaNome);
  const contagem = {};
  vivos("tur").forEach(t => (t.pes || []).forEach(id => { contagem[id] = (contagem[id] || 0) + 1; }));
  const tiles = lista.map(p =>
    '<button class="person-tile' + (p.ativo === false ? " off" : "") + '" data-act="editar-pessoa" data-id="' + p.id + '">' +
      '<div class="avatar" style="background:' + corDe(p.nome) + '">' + esc(iniciais(p.nome)) + "</div>" +
      '<div class="pname">' + esc(p.nome) + "</div>" +
      '<div class="pbadge">' + (contagem[p.id] || 0) + " turnos</div>" +
    "</button>").join("");
  return '<div class="container" style="padding-top:16px">' +
    '<div class="row between" style="margin-bottom:12px">' +
      '<div class="section-title" style="margin:0">' + lista.length + (lista.length === 1 ? " participante" : " participantes") + "</div>" +
      '<button class="chip on" data-act="nova-pessoa">' + ICONS.plus + " Adicionar</button>" +
    "</div>" +
    (lista.length ? '<div class="people-grid">' + tiles + "</div>"
      : '<div class="card empty-state">Nenhum participante cadastrado.<br><button class="btn btn-secondary" style="margin-top:12px" data-act="nova-pessoa">Adicionar o primeiro</button></div>') +
    '<div class="hint" style="margin-top:16px">Toque em um nome para editar, desativar ou excluir. Quem está desativado não aparece na hora de montar o turno.</div>' +
  "</div>";
}

/* ----- LOCAIS ----- */
function locaisHTML() {
  const lista = locaisOrdenados();
  const cards = lista.map(l =>
    '<button class="place-card" style="background:' + (l.cor || corDe(l.nome)) + '" data-act="editar-local" data-id="' + l.id + '">' +
      '<div class="content"><div class="pname">' + esc(l.nome) + "</div>" +
      '<div class="paddr">' + esc(l.end || "") + "</div></div></button>").join("");
  return '<div class="container" style="padding-top:16px">' +
    '<div class="row between" style="margin-bottom:12px">' +
      '<div class="section-title" style="margin:0">' + lista.length + (lista.length === 1 ? " local" : " locais") + "</div>" +
      '<button class="chip on" data-act="novo-local">' + ICONS.plus + " Adicionar</button>" +
    "</div>" +
    (lista.length ? '<div class="places-gallery">' + cards + "</div>"
      : '<div class="card empty-state">Nenhum local cadastrado.<br><button class="btn btn-secondary" style="margin-top:12px" data-act="novo-local">Adicionar o primeiro</button></div>') +
  "</div>";
}

/* ----- BUSCA ----- */
function buscaHTML() {
  const q = estado.busca.trim().toLowerCase();
  let corpo = "";
  if (q) {
    const ps = vivos("pes").filter(p => p.nome.toLowerCase().includes(q)).sort(ordenaNome);
    const ls = locaisOrdenados().filter(l => (l.nome + " " + (l.end || "")).toLowerCase().includes(q));
    const ts = vivos("tur").filter(t => {
      const l = loc(t.locId);
      return (l && l.nome.toLowerCase().includes(q)) || nomesDoTurno(t).join(" ").toLowerCase().includes(q);
    }).sort((a, b) => (a.data + a.ini).localeCompare(b.data + b.ini)).slice(0, 20);

    if (ps.length) corpo += '<div class="group-label">Participantes</div>' + ps.map(p =>
      '<button class="list-line" data-act="editar-pessoa" data-id="' + p.id + '">' +
        '<div class="row gap10"><div class="avatar mini-avatar" style="background:' + corDe(p.nome) + '">' + esc(iniciais(p.nome)) + "</div>" +
        '<div class="ll-t">' + esc(p.nome) + "</div></div></button>").join("");
    if (ls.length) corpo += '<div class="group-label">Locais</div>' + ls.map(l =>
      '<button class="list-line" data-act="editar-local" data-id="' + l.id + '">' +
        '<div class="row gap10"><div style="width:26px;height:26px;border-radius:8px;background:' + (l.cor || corDe(l.nome)) + '"></div>' +
        '<div><div class="ll-t">' + esc(l.nome) + '</div><div class="ll-s">' + esc(l.end || "") + "</div></div></div></button>").join("");
    if (ts.length) corpo += '<div class="group-label">Turnos</div>' + ts.map(t => blocoTurno(t, { data: true })).join("");
    if (!corpo) corpo = '<div class="empty-state">Nada encontrado para "' + esc(estado.busca) + '".</div>';
  } else {
    corpo = '<div class="empty-state">Busque por participante, local ou turno.</div>';
  }
  return '<div class="overlay">' +
      '<div class="overlay-head">' +
        '<button class="icon-btn" data-act="busca-fechar">' + ICONS.chevL + "</button>" +
        '<input id="caixaBusca" type="text" placeholder="Buscar participante, local ou turno" />' +
      "</div>" +
      '<div class="overlay-body">' + corpo + "</div>" +
    "</div>";
}

/* ----- CONFIGURAÇÕES ----- */
function cfgHTML() {
  const paletas = PALETAS.map(p =>
    '<div class="palette-swatch">' +
      '<button class="palette-dot' + (p.id === cfg.paleta ? " selected" : "") + '" style="background:' + p.cor + ';color:' + (lum(p.cor) > 0.66 ? "#12161B" : "#fff") + '" data-act="paleta" data-id="' + p.id + '" aria-label="' + p.nome + '">' +
        (p.id === cfg.paleta ? ICONS.check : "") + "</button>" +
      '<div class="palette-name">' + p.nome + "</div></div>").join("");
  const fontes = FONTES.map(f =>
    '<button class="font-row' + (f.id === cfg.fonte ? " selected" : "") + '" data-act="fonte" data-id="' + f.id + '">' +
      '<span class="fname" style="font-family:' + f.family + '">' + f.nome + "</span><span class=\"check\"></span></button>").join("");
  const tamanhos = TAMANHOS.map(t =>
    '<button class="size-opt' + (t.id === cfg.tamanho ? " selected" : "") + '" data-act="tamanho" data-id="' + t.id + '">' + t.nome + "</button>").join("");

  const conta = cfg.modoLocal
    ? '<div class="list-line"><div><div class="ll-t">Somente neste aparelho</div>' +
      '<div class="ll-s">' + (configPronta() ? "Você escolheu usar sem conta." : "Firebase ainda não configurado no index.html.") + "</div></div></div>" +
      '<button class="btn btn-secondary btn-block" data-act="ir-login">Entrar com e-mail e senha</button>'
    : '<button class="list-line" data-act="sync-detalhe"><div><div class="ll-t">' + esc((estado.usuario && estado.usuario.email) || "") + "</div>" +
        '<div class="ll-s">' + (estado.sync === "erro" ? "Sincronização com erro — toque para ver" : "Sincronizando na nuvem") + "</div></div>" +
        '<span class="sync-dot" style="background:' + (estado.sync === "erro" ? "var(--danger)" : "var(--ok)") + '"></span></button>' +
      '<button class="list-line" data-act="grupo"><div><div class="ll-t">Código do grupo</div>' +
        '<div class="ll-s">' + (cfg.grupo ? esc(cfg.grupo) : "só você vê estes dados") + "</div></div>" + ICONS.chevR + "</button>" +
      '<button class="btn btn-ghost btn-block" style="margin-top:6px" data-act="sair">' + ICONS.logout + " Sair da conta</button>";

  return '<div class="overlay">' +
      '<div class="overlay-head">' +
        '<button class="icon-btn" data-act="cfg-fechar">' + ICONS.chevL + "</button>" +
        '<div class="ttl">Configurações</div>' +
      "</div>" +
      '<div class="overlay-body">' +
        '<div class="group-label" style="margin-top:2px">Tema</div>' +
        '<div class="theme-row">' +
          '<button class="theme-opt' + (cfg.tema === "claro" ? " selected" : "") + '" data-act="tema" data-id="claro">' + ICONS.sun + " Claro</button>" +
          '<button class="theme-opt' + (cfg.tema === "escuro" ? " selected" : "") + '" data-act="tema" data-id="escuro">' + ICONS.moon + " Escuro</button>" +
        "</div>" +
        '<div class="group-label">Paleta de cores</div>' +
        '<div class="palette-grid">' + paletas + "</div>" +
        '<div class="hint" style="margin-top:10px">O fundo do app acompanha a cor escolhida: um tom bem claro no modo claro, e preto com um toque da cor no modo escuro.</div>' +
        '<div class="group-label">Fonte</div><div class="font-list">' + fontes + "</div>" +
        '<div class="group-label">Tamanho da fonte</div><div class="size-row">' + tamanhos + "</div>" +
        '<div class="group-label">Saudação</div>' +
        '<button class="list-line" data-act="nome"><div><div class="ll-t">Seu nome</div>' +
          '<div class="ll-s">' + (cfg.nome ? esc(cfg.nome) : "toque para escrever como quer ser chamado") + "</div></div>" + ICONS.chevR + "</button>" +
        '<div class="group-label">Conta e sincronização</div>' + conta +
        '<div class="group-label">Dados</div>' +
        '<button class="list-line" data-act="exportar"><div><div class="ll-t">Salvar cópia (arquivo .json)</div>' +
          '<div class="ll-s">' + vivos("tur").length + " turnos, " + vivos("pes").length + " participantes</div></div>" + ICONS.chevR + "</button>" +
        '<button class="list-line" data-act="importar"><div><div class="ll-t">Restaurar de um arquivo</div>' +
          '<div class="ll-s">junta com o que já existe</div></div>' + ICONS.chevR + "</button>" +
        '<button class="list-line" data-act="exemplo"><div><div class="ll-t">Carregar dados de exemplo</div>' +
          '<div class="ll-s">locais e participantes fictícios para testar</div></div>' + ICONS.chevR + "</button>" +
        '<button class="list-line" style="color:var(--danger)" data-act="limpar"><div><div class="ll-t">Apagar tudo deste aparelho</div>' +
          '<div class="ll-s muted">não dá para desfazer</div></div>' + ICONS.trash + "</button>" +
        '<div class="hint" style="margin-top:24px;text-align:center">Bora pro Carrinho? · ' + VERSAO + "<br>Desenvolvido por Alan Correa</div>" +
      "</div>" +
    "</div>";
}

/* ----- TELA DE ENTRADA ----- */
function telaAuth() {
  const t = estado.authTela;
  const titulos = { entrar: "Entrar", criar: "Criar conta", reset: "Recuperar senha" };
  const subs = {
    entrar: "Use seu e-mail e senha para ver a escala em qualquer aparelho.",
    criar: "A senha precisa ter pelo menos 6 caracteres.",
    reset: "Enviamos um link no seu e-mail para cadastrar uma senha nova."
  };
  const msg = estado.authMsg
    ? '<div class="auth-msg ' + estado.authMsg.tipo + '">' + esc(estado.authMsg.texto) + "</div>" : "";
  const campoSenha = t === "reset" ? "" :
    '<div class="field"><label for="senha">Senha</label><input id="senha" type="password" autocomplete="' +
      (t === "criar" ? "new-password" : "current-password") + '" placeholder="sua senha" /></div>';
  const links = t === "entrar"
    ? '<button data-act="auth-tela" data-id="criar">Criar uma conta</button>' +
      '<button data-act="auth-tela" data-id="reset">Esqueci minha senha</button>'
    : '<button data-act="auth-tela" data-id="entrar">Já tenho conta, entrar</button>';

  return '<div class="auth-wrap"><div class="auth-card">' +
      '<div class="auth-logo"><img src="logo-app.png" alt="" width="72" height="72" /></div>' +
      tituloHTML("1.75rem") +
      '<div class="auth-sub">' + subs[t] + "</div>" + msg +
      '<div class="field"><label for="email">E-mail</label><input id="email" type="email" autocomplete="email" inputmode="email" placeholder="voce@exemplo.com" value="' + esc(cfg.ultimoEmail || "") + '" /></div>' +
      campoSenha +
      '<button class="btn btn-primary btn-block" data-act="auth-enviar">' + titulos[t] + "</button>" +
      '<div class="auth-links">' + links +
        '<button data-act="usar-local" style="color:var(--textsec)">Usar só neste aparelho, sem conta</button>' +
      "</div>" +
    "</div></div>";
}

/* ----- CAMADAS (voltar do Android) ----- */
const camadas = [];
function abrirCamada(fn) { camadas.push(fn); history.pushState({ camada: camadas.length }, ""); }
function voltar() { if (camadas.length) history.back(); }
window.addEventListener("popstate", () => { const f = camadas.pop(); if (f) f(); });

/* ----- MODAL BASE ----- */
function abrirModal(html, montar) {
  const back = document.createElement("div");
  back.className = "modal-backdrop";
  back.innerHTML = '<div class="modal-sheet">' + '<div class="modal-handle"></div>' + html + "</div>";
  back.addEventListener("click", e => { if (e.target === back) voltar(); });
  document.body.appendChild(back);
  abrirCamada(() => back.remove());
  if (montar) montar(back);
  return back;
}

/* ----- MODAL: TURNO ----- */
function modalTurno(id) {
  const t = id ? tur(id) : null;
  const locais = locaisOrdenados();
  if (!locais.length) {
    abrirModal('<div class="modal-title">Cadastre um local primeiro</div>' +
      '<div class="hint">Todo turno acontece em um local (praça, terminal, feira). Cadastre pelo menos um para começar.</div>' +
      '<button class="btn btn-primary btn-block" style="margin-top:16px" data-act="novo-local">Cadastrar local</button>');
    return;
  }
  let sel = t ? (t.pes || []).slice() : [];
  let filtro = "";

  const html =
    '<div class="modal-title">' + (t ? "Editar turno" : "Novo turno") + "</div>" +
    '<div class="field"><label for="fData">Data</label><input id="fData" type="date" value="' + (t ? t.data : estado.diaSel) + '" /></div>' +
    '<div class="row gap10">' +
      '<div class="field" style="flex:1"><label for="fIni">Começa</label><input id="fIni" type="time" value="' + (t ? t.ini : "09:00") + '" /></div>' +
      '<div class="field" style="flex:1"><label for="fFim">Termina</label><input id="fFim" type="time" value="' + (t ? t.fim : "11:00") + '" /></div>' +
    "</div>" +
    '<div class="field"><label for="fLocal">Local</label><select id="fLocal">' +
      locais.map(l => '<option value="' + l.id + '"' + (t && t.locId === l.id ? " selected" : "") + ">" + esc(l.nome) + "</option>").join("") +
    "</select></div>" +
    '<div class="field"><label>Modalidade</label><div class="modality-row" id="fMod">' +
      MODALIDADES.map(m => '<button type="button" class="modality-opt' + ((t ? t.mod : "carrinho") === m.id ? " selected" : "") + '" data-mod="' + m.id + '">' + m.nome + "</button>").join("") +
    "</div></div>" +
    '<div class="field"><label>Participantes</label>' +
      '<div id="fChips" class="selected-chips"></div>' +
      '<div class="picker-box">' +
        '<input id="fBusca" class="picker-search" type="text" placeholder="Buscar ou digitar um nome novo" />' +
        '<div class="picker-list" id="fLista"></div>' +
      "</div>" +
      '<div class="count-line" id="fConta"></div>' +
    "</div>" +
    '<div class="field"><label for="fObs">Observação (opcional)</label><input id="fObs" type="text" value="' + esc(t ? t.obs || "" : "") + '" placeholder="ex.: levar a chave do carrinho" /></div>' +
    (t ? "" :
      '<div class="field"><label for="fRep">Repetir toda semana</label><select id="fRep">' +
        [1,2,3,4,5,6,8,10,12].map(n => '<option value="' + n + '">' + (n === 1 ? "Não repetir" : n + " semanas seguidas") + "</option>").join("") +
      "</select></div>") +
    '<button class="btn btn-primary btn-block" id="fSalvar">' + (t ? "Salvar alterações" : "Marcar turno") + "</button>" +
    (t ? '<button class="btn btn-danger btn-block" style="margin-top:8px" id="fExcluir">' + ICONS.trash + " Excluir turno</button>" : "");

  abrirModal(html, back => {
    const chips = $("#fChips", back), lista = $("#fLista", back), conta = $("#fConta", back), busca = $("#fBusca", back);

    function pintar() {
      const todos = pessoasOrdenadas(false);
      const selNaoListados = sel.filter(id => !todos.some(p => p.id === id));
      const base = todos.concat(selNaoListados.map(id => pes(id)).filter(Boolean));
      const f = filtro.trim().toLowerCase();
      const vis = base.filter(p => !f || p.nome.toLowerCase().includes(f)).sort(ordenaNome);

      chips.innerHTML = sel.map(id => {
        const p = pes(id); if (!p) return "";
        return '<span class="sel-chip" data-tirar="' + id + '">' + esc(p.nome) + '<span class="x">x</span></span>';
      }).join("");

      let h = vis.map(p =>
        '<button type="button" class="picker-item' + (sel.includes(p.id) ? " on" : "") + '" data-pick="' + p.id + '">' +
          '<span class="avatar mini-avatar" style="background:' + corDe(p.nome) + '">' + esc(iniciais(p.nome)) + "</span>" +
          '<span class="pk-name">' + esc(p.nome) + "</span>" +
          '<span class="pk-box" style="color:var(--onprimary)">' + (sel.includes(p.id) ? ICONS.check : "") + "</span></button>").join("");
      const novo = filtro.trim();
      if (novo && !base.some(p => p.nome.toLowerCase() === novo.toLowerCase()))
        h = '<button type="button" class="picker-item" data-criar="1">' +
              '<span class="avatar mini-avatar" style="background:var(--primary);color:var(--onprimary)">+</span>' +
              '<span class="pk-name">Cadastrar "' + esc(novo) + '"</span></button>' + h;
      if (!h) h = '<div class="empty-state" style="padding:18px">Nenhum participante ativo.</div>';
      lista.innerHTML = h;
      conta.textContent = sel.length === 0 ? "Nenhum participante escolhido"
        : sel.length + (sel.length === 1 ? " participante escolhido" : " participantes escolhidos");
    }
    pintar();

    busca.addEventListener("input", e => { filtro = e.target.value; pintar(); });
    lista.addEventListener("click", e => {
      const b = e.target.closest("[data-pick]");
      if (b) {
        const id = b.getAttribute("data-pick");
        const i = sel.indexOf(id);
        if (i > -1) sel.splice(i, 1); else sel.push(id);
        pintar(); return;
      }
      if (e.target.closest("[data-criar]")) {
        const nome = filtro.trim();
        const p = { id: uid(), nome, ativo: true, at: agora() };
        DB.pes.push(p); salvar();
        sel.push(p.id); filtro = ""; busca.value = ""; pintar();
        toast(nome + " cadastrado");
      }
    });
    chips.addEventListener("click", e => {
      const c = e.target.closest("[data-tirar]"); if (!c) return;
      const i = sel.indexOf(c.getAttribute("data-tirar"));
      if (i > -1) { sel.splice(i, 1); pintar(); }
    });
    $("#fMod", back).addEventListener("click", e => {
      const b = e.target.closest("[data-mod]"); if (!b) return;
      $("#fMod", back).querySelectorAll(".modality-opt").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
    });

    $("#fSalvar", back).addEventListener("click", () => {
      const data = $("#fData", back).value;
      const ini = $("#fIni", back).value, fim = $("#fFim", back).value;
      if (!data || !ini || !fim) { toast("Preencha data e horário"); return; }
      if (fim <= ini) { toast("O fim precisa ser depois do começo"); return; }
      const dados = {
        data, ini, fim,
        locId: $("#fLocal", back).value,
        mod: (function(){ var s = $("#fMod", back).querySelector(".selected"); return s ? s.getAttribute("data-mod") : "carrinho"; })(),
        obs: $("#fObs", back).value.trim(),
        pes: sel.slice(), at: agora()
      };
      if (t) {
        Object.assign(t, dados);
      } else {
        const rep = +($("#fRep", back) || { value: 1 }).value || 1;
        for (let i = 0; i < rep; i++) {
          const d = somaDias(deIso(data), i * 7);
          DB.tur.push(Object.assign({}, dados, { id: uid(), data: iso(d) }));
        }
        estado.diaSel = data;
      }
      salvar(); voltar(); render();
      toast(t ? "Turno atualizado" : "Turno marcado");
    });

    const bx = $("#fExcluir", back);
    if (bx) bx.addEventListener("click", () => {
      if (!confirm("Excluir este turno?")) return;
      t.rm = true; t.at = agora(); salvar(); voltar(); render(); toast("Turno excluído");
    });
  });
}

/* ----- MODAL: PESSOA ----- */
function modalPessoa(id) {
  const p = id ? pes(id) : null;
  const html =
    '<div class="modal-title">' + (p ? "Editar participante" : "Novo participante") + "</div>" +
    '<div class="field"><label for="pNome">Nome</label><input id="pNome" type="text" value="' + esc(p ? p.nome : "") + '" placeholder="Nome e sobrenome" /></div>' +
    '<div class="field"><label for="pTel">Telefone (opcional)</label><input id="pTel" type="tel" inputmode="tel" value="' + esc(p ? p.tel || "" : "") + '" placeholder="(00) 00000-0000" /></div>' +
    '<label class="check-row"><input id="pAtivo" type="checkbox"' + (!p || p.ativo !== false ? " checked" : "") + ' /> <span>Disponível para os turnos</span></label>' +
    '<button class="btn btn-primary btn-block" id="pSalvar">Salvar</button>' +
    (p ? '<button class="btn btn-danger btn-block" style="margin-top:8px" id="pExcluir">' + ICONS.trash + " Excluir</button>" : "");

  abrirModal(html, back => {
    setTimeout(() => { const n = $("#pNome", back); if (n && !p) n.focus(); }, 60);
    $("#pSalvar", back).addEventListener("click", () => {
      const nome = $("#pNome", back).value.trim();
      if (!nome) { toast("Digite o nome"); return; }
      const dados = { nome, tel: $("#pTel", back).value.trim(), ativo: $("#pAtivo", back).checked, at: agora() };
      if (p) Object.assign(p, dados); else DB.pes.push(Object.assign({ id: uid() }, dados));
      salvar(); voltar(); render(); toast("Salvo");
    });
    const bx = $("#pExcluir", back);
    if (bx) bx.addEventListener("click", () => {
      const usados = vivos("tur").filter(t => (t.pes || []).includes(p.id)).length;
      if (!confirm("Excluir " + p.nome + "?" + (usados ? " O nome sai de " + usados + " turno(s)." : ""))) return;
      p.rm = true; p.at = agora();
      vivos("tur").forEach(t => {
        if ((t.pes || []).includes(p.id)) { t.pes = t.pes.filter(x => x !== p.id); t.at = agora(); }
      });
      salvar(); voltar(); render(); toast("Excluído");
    });
  });
}

/* ----- MODAL: LOCAL ----- */
function modalLocal(id) {
  const l = id ? loc(id) : null;
  const corAtual = l ? (l.cor || corDe(l.nome)) : CORES_AVATAR[0];
  const cores = CORES_AVATAR.map(c =>
    '<button type="button" class="palette-dot' + (c === corAtual ? " selected" : "") + '" style="background:' + c + ';width:36px;height:36px" data-cor="' + c + '"></button>').join("");
  const html =
    '<div class="modal-title">' + (l ? "Editar local" : "Novo local") + "</div>" +
    '<div class="field"><label for="lNome">Nome</label><input id="lNome" type="text" value="' + esc(l ? l.nome : "") + '" placeholder="ex.: Praça Central" /></div>' +
    '<div class="field"><label for="lEnd">Endereço (opcional)</label><input id="lEnd" type="text" value="' + esc(l ? l.end || "" : "") + '" placeholder="Av. Brasil, 500" /></div>' +
    '<div class="field"><label>Cor</label><div class="row wrap gap8" id="lCores">' + cores + "</div></div>" +
    '<button class="btn btn-primary btn-block" id="lSalvar">Salvar</button>' +
    (l ? '<button class="btn btn-danger btn-block" style="margin-top:8px" id="lExcluir">' + ICONS.trash + " Excluir</button>" : "");

  abrirModal(html, back => {
    let cor = corAtual;
    setTimeout(() => { const n = $("#lNome", back); if (n && !l) n.focus(); }, 60);
    $("#lCores", back).addEventListener("click", e => {
      const b = e.target.closest("[data-cor]"); if (!b) return;
      cor = b.getAttribute("data-cor");
      $("#lCores", back).querySelectorAll(".palette-dot").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
    });
    $("#lSalvar", back).addEventListener("click", () => {
      const nome = $("#lNome", back).value.trim();
      if (!nome) { toast("Digite o nome do local"); return; }
      const dados = { nome, end: $("#lEnd", back).value.trim(), cor, at: agora() };
      if (l) Object.assign(l, dados); else DB.loc.push(Object.assign({ id: uid() }, dados));
      salvar(); voltar(); render(); toast("Salvo");
    });
    const bx = $("#lExcluir", back);
    if (bx) bx.addEventListener("click", () => {
      const usados = vivos("tur").filter(t => t.locId === l.id).length;
      if (!confirm("Excluir " + l.nome + "?" + (usados ? " Há " + usados + " turno(s) neste local." : ""))) return;
      l.rm = true; l.at = agora(); salvar(); voltar(); render(); toast("Excluído");
    });
  });
}

/* ----- MODAL: CÓDIGO DO GRUPO ----- */
/* ----- MODAL: SEU NOME (saudação) ----- */
function modalNome() {
  const html =
    '<div class="modal-title">Como quer ser chamado?</div>' +
    '<div class="hint">O nome aparece na saudação da tela inicial: "Bom dia, ' + esc((cfg.nome || "Alan").trim() || "Alan") + '". Deixe em branco para mostrar só a saudação.</div>' +
    '<div class="field" style="margin-top:14px"><label for="nNome">Nome</label>' +
      '<input id="nNome" type="text" value="' + esc(cfg.nome || "") + '" placeholder="Alan" maxlength="30" /></div>' +
    '<button class="btn btn-primary btn-block" id="nSalvar">Salvar</button>';
  abrirModal(html, back => {
    setTimeout(() => { const n = $("#nNome", back); if (n) { n.focus(); n.selectionStart = n.selectionEnd = n.value.length; } }, 60);
    $("#nSalvar", back).addEventListener("click", () => {
      cfg.nome = $("#nNome", back).value.trim();
      salvarCfg(); voltar(); render();
      toast(cfg.nome ? "Prazer, " + cfg.nome : "Saudação sem nome");
    });
  });
}

/* ----- MODAL: ESTADO DA SINCRONIZAÇÃO ----- */
function modalSync() {
  const alvo = (cfg.grupo || "").trim().toLowerCase() || ("u_" + ((estado.usuario && estado.usuario.uid) || ""));
  const ok = estado.sync !== "erro";
  const html =
    '<div class="modal-title">' + (ok ? "Sincronização ativa" : "Sincronização com erro") + "</div>" +
    '<div class="list-line"><div><div class="ll-t">Conta</div><div class="ll-s">' + esc((estado.usuario && estado.usuario.email) || "") + "</div></div></div>" +
    '<div class="list-line"><div><div class="ll-t">Documento na nuvem</div><div class="ll-s">carrinhos / ' + esc(alvo) + "</div></div></div>" +
    (ok
      ? '<div class="hint" style="margin-top:8px">Tudo o que você marcar aqui aparece nos outros aparelhos que entrarem com este mesmo e-mail. Para dividir a escala com outras pessoas, use o mesmo código de grupo em todos os celulares.</div>'
      : '<div class="auth-msg err" style="margin-top:10px">' + esc(textoErroSync()) + "</div>" +
        (estado.syncCodigo ? '<div class="hint">Código do erro: ' + esc(estado.syncCodigo) + "</div>" : "")) +
    '<button class="btn btn-primary btn-block" style="margin-top:14px" id="sTentar">Tentar sincronizar agora</button>';
  abrirModal(html, back => {
    $("#sTentar", back).addEventListener("click", () => { voltar(); tentarSincronizar(); });
  });
}

function modalGrupo() {
  const html =
    '<div class="modal-title">Código do grupo</div>' +
    '<div class="hint">Todo mundo que digitar o mesmo código vê e edita a mesma escala. Combine um código simples com a congregação, por exemplo <b>carrinho-central</b>. Deixando em branco, os dados ficam só na sua conta.</div>' +
    '<div class="field" style="margin-top:14px"><label for="gCod">Codigo</label>' +
      '<input id="gCod" type="text" value="' + esc(cfg.grupo || "") + '" placeholder="carrinho-central" autocapitalize="none" /></div>' +
    '<button class="btn btn-primary btn-block" id="gSalvar">Usar este código</button>';
  abrirModal(html, back => {
    $("#gSalvar", back).addEventListener("click", () => {
      cfg.grupo = $("#gCod", back).value.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
      salvarCfg(); voltar();
      assinarNuvem(); enviarNuvem(); render();
      toast(cfg.grupo ? "Grupo: " + cfg.grupo : "Sem grupo");
    });
  });
}

/* ----- MENSAGEM PARA WHATSAPP ----- */
function textoEscala(lista, titulo) {
  if (!lista.length) return "";
  const porData = {};
  lista.forEach(t => { (porData[t.data] = porData[t.data] || []).push(t); });
  let s = "Testemunho público com carrinho\n" + titulo + "\n";
  Object.keys(porData).sort().forEach(d => {
    s += "\n" + cap1(fmtLongo(deIso(d))) + "\n";
    porData[d].sort((a, b) => a.ini.localeCompare(b.ini)).forEach(t => {
      const l = loc(t.locId);
      const nomes = nomesDoTurno(t);
      s += t.ini + " às " + t.fim + " - " + (l ? l.nome : "sem local") + "\n";
      s += nomes.length ? "  " + nomes.join(", ") + "\n" : "  (sem participantes)\n";
    });
  });
  return s.trim();
}
function copiarEscala(alvo) {
  let lista = [], titulo = "";
  if (alvo === "dia") {
    lista = turnosDoDia(estado.aba === "agenda" ? estado.diaSel : hojeIso());
    titulo = fmtBr(estado.aba === "agenda" ? estado.diaSel : hojeIso());
  } else if (alvo === "semana") {
    const base = somaDias(new Date(), estado.semanaOffset * 7 - new Date().getDay());
    lista = turnosNoIntervalo(iso(base), iso(somaDias(base, 6)));
    titulo = "Semana de " + fmtCurto(base) + " a " + fmtCurto(somaDias(base, 6));
  } else {
    const c = estado.cursorMes, pref = iso(new Date(c.getFullYear(), c.getMonth(), 1)).slice(0, 7);
    lista = vivos("tur").filter(t => t.data.slice(0, 7) === pref).sort((a, b) => (a.data + a.ini).localeCompare(b.data + b.ini));
    titulo = cap1(c.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }));
  }
  const txt = textoEscala(lista, titulo);
  if (!txt) { toast("Não há turnos para copiar"); return; }
  copiar(txt);
}

/* ----- DADOS: exportar / importar / exemplo ----- */
function exportar() {
  const blob = new Blob([JSON.stringify(DB, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bora-pro-carrinho-" + hojeIso() + ".json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast("Cópia gerada");
}
function importar() {
  const inp = document.createElement("input");
  inp.type = "file"; inp.accept = "application/json,.json";
  inp.addEventListener("change", () => {
    const f = inp.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        mesclar(d); salvar(); render(); toast("Dados restaurados");
      } catch (e) { toast("Arquivo inválido"); }
    };
    r.readAsText(f);
  });
  inp.click();
}
function dadosExemplo() {
  if (!confirm("Carregar locais e participantes de exemplo?")) return;
  const locs = [
    { nome: "Praça Central", end: "Av. Brasil, 500" },
    { nome: "Terminal Rodoviário", end: "R. das Palmeiras, 120" },
    { nome: "Feira Municipal", end: "R. do Comércio, 45" }
  ].map((l, i) => Object.assign({ id: uid(), cor: CORES_AVATAR[i], at: agora() }, l));
  const nomes = ["Ana Souza","Bruno Lima","Carla Nogueira","Diego Alves","Elisa Prado","Fábio Rocha"];
  const ps = nomes.map(n => ({ id: uid(), nome: n, ativo: true, at: agora() }));
  DB.loc = DB.loc.concat(locs); DB.pes = DB.pes.concat(ps);
  DB.tur.push({ id: uid(), data: hojeIso(), ini: "09:00", fim: "11:00", locId: locs[0].id, mod: "carrinho", pes: [ps[0].id, ps[1].id], at: agora() });
  DB.tur.push({ id: uid(), data: hojeIso(), ini: "14:00", fim: "16:00", locId: locs[1].id, mod: "carrinho", pes: [ps[2].id, ps[3].id, ps[4].id], at: agora() });
  DB.tur.push({ id: uid(), data: iso(somaDias(new Date(), 2)), ini: "09:00", fim: "11:00", locId: locs[2].id, mod: "display", pes: [ps[5].id, ps[0].id], at: agora() });
  salvar(); render(); toast("Exemplo carregado");
}

/* ----- SWIPE PARA EXCLUIR ----- */
function ligarSwipe() {
  app.querySelectorAll("[data-swipe]").forEach(wrap => {
    const alvo = wrap.querySelector(".agenda-block");
    let x0 = null, dx = 0;
    alvo.addEventListener("pointerdown", e => { x0 = e.clientX; dx = 0; alvo.style.transition = "none"; });
    alvo.addEventListener("pointermove", e => {
      if (x0 === null) return;
      dx = Math.min(0, Math.max(-84, e.clientX - x0));
      alvo.style.transform = "translateX(" + dx + "px)";
    });
    const fim = () => {
      if (x0 === null) return;
      alvo.style.transition = "transform .18s ease";
      alvo.style.transform = dx < -42 ? "translateX(-84px)" : "translateX(0)";
      x0 = null;
    };
    alvo.addEventListener("pointerup", fim);
    alvo.addEventListener("pointercancel", fim);
    alvo.addEventListener("pointerleave", fim);
    alvo.addEventListener("click", e => { if (dx < -8) e.preventDefault(); }, true);
  });
}

/* ----- EVENTOS ----- */
document.addEventListener("click", async e => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const act = el.getAttribute("data-act");
  const id = el.getAttribute("data-id");

  switch (act) {
    case "aba": estado.aba = el.getAttribute("data-aba"); render(); break;
    case "tema-toggle": cfg.tema = cfg.tema === "claro" ? "escuro" : "claro"; salvarCfg(); render(); break;
    case "tema": cfg.tema = id; salvarCfg(); render(); break;
    case "paleta": cfg.paleta = id; salvarCfg(); render(); break;
    case "fonte": cfg.fonte = id; salvarCfg(); render(); break;
    case "tamanho": cfg.tamanho = id; salvarCfg(); render(); break;

    case "busca-abrir":
      estado.buscaAberta = true; estado.busca = "";
      abrirCamada(() => { estado.buscaAberta = false; render(); });
      render(); break;
    case "busca-fechar": voltar(); break;
    case "cfg-abrir":
      estado.cfgAberta = true;
      abrirCamada(() => { estado.cfgAberta = false; render(); });
      render(); break;
    case "cfg-fechar": voltar(); break;

    case "calmode": estado.calendario = el.getAttribute("data-modo"); render(); break;
    case "semana-ant": estado.semanaOffset--; render(); break;
    case "semana-prox": estado.semanaOffset++; render(); break;
    case "mes-ant": estado.cursorMes = new Date(estado.cursorMes.getFullYear(), estado.cursorMes.getMonth() - 1, 1); render(); break;
    case "mes-prox": estado.cursorMes = new Date(estado.cursorMes.getFullYear(), estado.cursorMes.getMonth() + 1, 1); render(); break;
    case "dia": estado.diaSel = el.getAttribute("data-dia"); render(); break;
    case "ir-dia":
      estado.diaSel = el.getAttribute("data-dia"); estado.aba = "agenda"; estado.semanaOffset = 0; render(); break;

    case "novo-turno": if (camadas.length) voltar(); setTimeout(() => modalTurno(null), camadas.length ? 60 : 0); break;
    case "editar-turno": modalTurno(id); break;
    case "excluir-turno": {
      const t = tur(id);
      if (t && confirm("Excluir este turno?")) { t.rm = true; t.at = agora(); salvar(); render(); toast("Turno excluído"); }
      break;
    }
    case "nova-pessoa": modalPessoa(null); break;
    case "editar-pessoa": modalPessoa(id); break;
    case "novo-local": if (camadas.length) voltar(); setTimeout(() => modalLocal(null), camadas.length ? 60 : 0); break;
    case "editar-local": modalLocal(id); break;
    case "copiar": copiarEscala(el.getAttribute("data-alvo")); break;
    case "grupo": modalGrupo(); break;
    case "nome": modalNome(); break;
    case "sync-detalhe": modalSync(); break;
    case "exportar": exportar(); break;
    case "importar": importar(); break;
    case "exemplo": dadosExemplo(); break;
    case "limpar":
      if (confirm("Apagar todos os dados deste aparelho? A cópia na nuvem continua.")) {
        localStorage.removeItem(K_DB); DB = { pes: [], loc: [], tur: [] }; render(); toast("Dados apagados");
      }
      break;

    case "auth-tela": estado.authTela = id; estado.authMsg = null; render(); break;
    case "auth-enviar": await autenticar(); break;
    case "usar-local": cfg.modoLocal = true; salvarCfg(); render(); break;
    case "ir-login": cfg.modoLocal = false; salvarCfg(); estado.cfgAberta = false; camadas.length = 0; render(); break;
    case "sair":
      if (!confirm("Sair da conta? Os dados continuam salvos na nuvem.")) break;
      if (unsub) { unsub(); unsub = null; }
      try { await FB.a.signOut(FB.auth); } catch (err) {}
      estado.usuario = null; estado.cfgAberta = false; camadas.length = 0; render(); break;
  }
});
document.addEventListener("input", e => {
  if (e.target && e.target.id === "caixaBusca") { estado.busca = e.target.value; render(); }
});
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && (e.target.id === "email" || e.target.id === "senha")) autenticar();
});

async function autenticar() {
  if (!FB) { estado.authMsg = { tipo: "err", texto: "Configure o Firebase no index.html para usar conta." }; render(); return; }
  const email = ($("#email") || {}).value ? $("#email").value.trim() : "";
  const senha = ($("#senha") || {}).value ? $("#senha").value : "";
  cfg.ultimoEmail = email; salvarCfg();
  try {
    if (estado.authTela === "entrar") {
      await FB.a.signInWithEmailAndPassword(FB.auth, email, senha);
    } else if (estado.authTela === "criar") {
      await FB.a.createUserWithEmailAndPassword(FB.auth, email, senha);
    } else {
      await FB.a.sendPasswordResetEmail(FB.auth, email);
      estado.authTela = "entrar";
      estado.authMsg = { tipo: "ok", texto: "Link enviado. Veja seu e-mail (olhe também o spam)." };
      render(); return;
    }
    estado.authMsg = null;
  } catch (err) {
    estado.authMsg = { tipo: "err", texto: erroAuth(err) };
    render();
  }
}

/* tenta de novo sozinho quando a internet volta ou o app reabre */
window.addEventListener("online", () => { if (estado.sync === "erro") tentarSincronizar(); });
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && estado.sync === "erro" && FB && estado.usuario) { assinarNuvem(); enviarNuvem(); }
});

/* ----- INÍCIO ----- */
carregar();
aplicarTema();
render();

(async () => {
  try { await iniciarFirebase(); } catch (e) { console.warn("firebase:", e.message); cfg.modoLocal = true; }
  if (!FB) { estado.pronto = true; render(); return; }
  FB.a.onAuthStateChanged(FB.auth, u => {
    estado.usuario = u ? { uid: u.uid, email: u.email } : null;
    estado.pronto = true;
    if (u) { cfg.modoLocal = false; salvarCfg(); assinarNuvem(); enviarNuvem(); }
    else if (unsub) { unsub(); unsub = null; }
    render();
  });
})();
