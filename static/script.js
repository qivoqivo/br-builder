// ==========================================
// 1. KONFIGURACJA GWIAZDEK I KAR DRIFFÓW
// ==========================================
const STAR_LEVELS = ["0", "B1", "B2", "B3", "S1", "S2", "S3", "G1", "G2", "G3"];

const STARS_CONFIG = {
    "0":  { type: "none", count: 0, stats: 0, weapon: 0, upgrade: 0, orb: 0, driff: 0, cap: 0 },
    "B1": { type: "bronze", count: 1, stats: 0, weapon: 0, upgrade: 0, orb: 0, driff: 0, cap: 0 },
    "B2": { type: "bronze", count: 2, stats: 3, weapon: 1.5, upgrade: 0, orb: 0, driff: 0, cap: 0 },
    "B3": { type: "bronze", count: 3, stats: 6, weapon: 3, upgrade: 0, orb: 0, driff: 0, cap: 0 },
    "S1": { type: "silver", count: 1, stats: 10, weapon: 5, upgrade: 10, orb: 5, driff: 0, cap: 0 },
    "S2": { type: "silver", count: 2, stats: 15, weapon: 7.5, upgrade: 15, orb: 10, driff: 0, cap: 0 },
    "S3": { type: "silver", count: 3, stats: 20, weapon: 10, upgrade: 25, orb: 20, driff: 0, cap: 0 },
    "G1": { type: "gold", count: 1, stats: 25, weapon: 12.5, upgrade: 50, orb: 30, driff: 3, cap: 1 },
    "G2": { type: "gold", count: 2, stats: 35, weapon: 17.5, upgrade: 80, orb: 50, driff: 8, cap: 2 },
    "G3": { type: "gold", count: 3, stats: 50, weapon: 25, upgrade: 100, orb: 75, driff: 15, cap: 4 }
};

const DRIFF_PENALTY_TABLE = { 4: 0.95, 5: 0.87, 6: 0.80, 7: 0.74, 8: 0.69, 9: 0.64, 10: 0.59, 11: 0.54, 12: 0.50 };

const STAT_ORDER = [
    "Wymagany poziom", "Wymagana klasa", "Wymagana siła", "Wymagana zręczność", "Wymagana moc", "Wymagana wiedza",
    "Obrażenia", "Typ obrażeń",
    "Siła", "Zręczność", "Moc", "Wiedza", "Inteligencja",
    "PŻ", "Mana", "Kondycja",
    "Pancerz sieczne", "Pancerz obuchowe", "Pancerz kłute",
    "Odporność ogień", "Odporność zimno", "Odporność energia", "Odporność uroki"
];
const ROMAN_RANKS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// ==========================================
// 2. TABELE MNOŻNIKÓW POWERA
// ==========================================
const MOD_POWER_MULTI = {
    "Obrona dystansowa": 2, "Obrona mentalna": 2, "Obrona wręcz": 2,
    "Odp. na ef. krępujące": 4, "Odp. na unieruchomienie": 4, "Podwójne los. obrony": 4, 
    "Przełamanie odp. uroki": 4, "Red. obr. krytycznych": 4, "Red. ataków % PŻ": 4, 
    "Zużycie kondycji": 4, "Zużycie many": 4,
    "Mod. traf. dystans.": 8, "Mod. traf. mental.": 8, "Mod. traf. wręcz": 8, 
    "Odp. na traf. kryt.": 8, "Podwójne los. trafienia": 8, "Red. obr. biernych": 8,
    "Dod. obr. energia": 16, "Dod. obr. ogień": 16, "Dod. obr. zimno": 16, 
    "Mod. obr. fizycznych": 16, "Mod. obr. magicznych": 16, "Szansa na odczarowanie": 16, 
    "Szansa na red. obrażeń": 16, "Wyssanie many": 16,
    "Regeneracja kondycji": 26.666666, "Regeneracja many": 26.666666, "Redukcja obrażeń": 26.666666,
    "Szansa na podw. atak": 32, "Szansa na traf. kryt.": 32, "Szansa na unik": 32
};

const WSP_ORB = {
    "Sub_1": 1, "Bi_1": 4, "Bi_2": 4.8, "Bi_3": 6,
    "Magni_1": 9.3, "Magni_2": 11.2, "Magni_3": 14,
    "Arcy_1": 20, "Arcy_2": 24, "Arcy_3": 30
};

const WSP_QUAL = {
    "B1": 0, "B2": 0, "B3": 0,
    "S1": 0.67, "S2": 1.33, "S3": 2.67,
    "G1": 4, "G2": 6.67, "G3": 10
};

const ORB_CATEGORY_MULTI = {
    "Red. obr. obszar": 4, "Red. obr. zwykłe": 4, "Red. obr. czempion/elita": 4, 
    "Szansa na przejęcie kondycji": 4, "Szansa na przejęcie many": 4, 
    "Przełamanie farida/holma": 4, "Siła ataku gdy ciężko ranny": 4,
    "Szansa na przejęcie PŻ": 8, "Unik gdy ciężko ranny": 8, 
    "Szansa obrony po ataku": 8, "Szansa trafienia po chybieniu": 8, 
    "Obr. na bossy": 8, "Obr. na czempion/elita": 8,
    "Red. obr. dystans": 16, "Red. obr. wręcz": 16, "Red. obr. mental": 16, 
    "Red. obr. boss": 16, "Szansa na mocny kryt": 16, "Obr. na zwykłe": 16
};

// ==========================================
// 3. BAZA GŁÓWNYCH STATYSTYK I MAPOWANIE IKON
// ==========================================
const BASE_STATS = {
    "PŻ": { base: 200, mult: 10 },
    "Mana": { base: 200, mult: 10 },
    "Kondycja": { base: 200, mult: 10 },
    "Siła": { base: 10, mult: 1 },
    "Zręczność": { base: 10, mult: 1 },
    "Moc": { base: 10, mult: 1 },
    "Wiedza": { base: 10, mult: 1 },
    "Inteligencja": { base: 10, mult: 1 }
};

const STAT_ICONS = {
    "PŻ": "stats/health.png", "Mana": "stats/mana.png", "Kondycja": "stats/stamina.png",
    "Siła": "stats/strength.png", "Zręczność": "stats/dexterity.png", "Moc": "stats/power.png", "Wiedza": "stats/knowledge.png", "Inteligencja": "stats/intelligence.png",
    "Pancerz sieczne": "odpo/slash.png", 
    "Pancerz obuchowe": "odpo/crush.png", 
    "Pancerz kłute": "odpo/pierc.png",
    "Odporność ogień": "odpo/fire.png", 
    "Odporność zimno": "odpo/cold.png", 
    "Odporność energia": "odpo/energy.png", 
    "Odporność uroki": "odpo/mental.png"
};

const ORB_DATA = {
    "naed": { name: "Na'ed", type: "def", bonus: "Szansa obrony po ataku", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] },
    "mren": { name: "M'ren", type: "uni", bonus: "Redukcja rozładowania", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "nxen": { name: "N'xen", type: "uni", bonus: "Szybszy odpoczynek", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "pren": { name: "P'ren", type: "uni", bonus: "Dodatkowe psychodoświadczenie", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] },
    "qzen": { name: "Q'zen", type: "uni", bonus: "Dodatkowy daimonit", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] },
    "rxen": { name: "R'xen", type: "uni", bonus: "Dodatkowe doświadczenie", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] },
    "slen": { name: "S'len", type: "uni", bonus: "Większy udźwig", unit: "", sub: [50], bi: [65, 68, 72], magni: [85, 92, 102], arcy: [125, 140, 162] },
    "vlan": { name: "V'lan", type: "uni", bonus: "Dodatkowe złoto", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] },
    "baed": { name: "Ba'ed", type: "def", bonus: "Red. obr. wręcz", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "deed": { name: "De'ed", type: "def", bonus: "Red. obr. dystans", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "geed": { name: "Ge'ed", type: "def", bonus: "Red. obr. mental", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "lued": { name: "Lu'ed", type: "def", bonus: "Red. obr. czempion/elita", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "mied": { name: "Mi'ed", type: "def", bonus: "Red. obr. obszar", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "reed": { name: "Re'ed", type: "def", bonus: "Unik gdy ciężko ranny", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "voed": { name: "Vo'ed", type: "def", bonus: "Red. obr. zwykłe", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "zeed": { name: "Ze'ed", type: "def", bonus: "Red. obr. boss", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "cuat": { name: "Cu'at", type: "off", bonus: "Szansa trafienia po chybieniu", unit: "%", sub: [3], bi: [3.9, 4.08, 4.35], magni: [5.1, 5.25, 6.15], arcy: [7.5, 8.4, 9.75] },
    "fuat": { name: "Fu'at", type: "off", bonus: "Szansa na przejęcie PŻ", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "haat": { name: "Ha'at", type: "off", bonus: "Siła ataku gdy ciężko ranny", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "kaat": { name: "Ka'at", type: "off", bonus: "Obr. na zwykłe", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] },
    "liat": { name: "Li'at", type: "off", bonus: "Szansa na mocny kryt", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] },
    "paat": { name: "Pa'at", type: "off", bonus: "Obr. na czempion/elita", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12, 14, 16.25] },
    "poat": { name: "Po'at", type: "off", bonus: "Szansa na przejęcie many", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "seat": { name: "Se'at", type: "off", bonus: "Szansa na przejęcie kondycji", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "teat": { name: "Te'at", type: "off", bonus: "Przełamanie farida/holma", unit: "%", sub: [10], bi: [13, 13.6, 14.5], magni: [17, 18.4, 20.5], arcy: [25, 28, 32.5] },
    "tiat": { name: "Ti'at", type: "off", bonus: "Obr. na bossy", unit: "%", sub: [5], bi: [6.5, 6.8, 7.25], magni: [8.5, 9.2, 10.25], arcy: [12.5, 14, 16.25] }
};

const DRIFF_CATEGORIES = {
    "obrazen": { label: "Obrażenia", color: "#f44336", roots: ["kalh", "val", "unn", "astah", "abaf", "teld", "band"] },
    "obrony": { label: "Obrona", color: "#9c27b0", roots: ["tall", "elen", "grud", "tovi", "grod"] },
    "redukcji": { label: "Redukcja", color: "#2196f3", roots: ["jorn", "iori", "faln", "holm", "farid", "alorn"] },
    "celnosci": { label: "Celność", color: "#ffeb3b", roots: ["lorb", "oda", "ling", "ulk", "dur"] },
    "specjalne": { label: "Specjalne", color: "#4caf50", roots: ["verd", "err", "eras", "lun", "ann", "von", "amad"] }
};

const DRIFF_STATS_DATA = {
    "amad": { name: "Zużycie kondycji", unit: "%", power: 2, base: [-1, -2, -4, -6], inc: [-1, -1, -1, -1] },
    "ann": { name: "Regeneracja many", unit: "%", power: 1, base: [0.15, 0.3, 0.6, 0.9], inc: [0.15, 0.15, 0.15, 0.15] },
    "eras": { name: "Regeneracja kondycji", unit: "%", power: 1, base: [0.15, 0.3, 0.6, 0.9], inc: [0.15, 0.15, 0.15, 0.15] },
    "err": { name: "Wyssanie many", unit: "%", power: 3, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "lun": { name: "Odp. na ef. krępujące", unit: "%", power: 1, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "verd": { name: "Szansa na odczarowanie", unit: "%", power: 2, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "von": { name: "Zużycie many", unit: "%", power: 2, base: [-1, -2, -4, -6], inc: [-1, -1, -1, -1] },
    "elen": { name: "Podwójne los. obrony", unit: "%", power: 2, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] },
    "grod": { name: "Odp. na traf. kryt.", unit: "%", power: 2, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "grud": { name: "Obrona mentalna", unit: "%", power: 1, base: [1.5, 3, 6, 9], inc: [1.5, 1.5, 1.5, 1.5] },
    "tall": { name: "Obrona wręcz", unit: "%", power: 1, base: [1.5, 3, 6, 9], inc: [1.5, 1.5, 1.5, 1.5] },
    "tovi": { name: "Obrona dystansowa", unit: "%", power: 1, base: [1.5, 3, 6, 9], inc: [1.5, 1.5, 1.5, 1.5] },
    "alorn": { name: "Redukcja obrażeń", unit: "%", power: 4, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "faln": { name: "Red. obr. krytycznych", unit: "%", power: 1, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] },
    "farid": { name: "Szansa na unik", unit: "%", power: 4, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "holm": { name: "Szansa na red. obrażeń", unit: "%", power: 3, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "iori": { name: "Red. obr. biernych", unit: "%", power: 3, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] },
    "jorn": { name: "Red. ataków % PŻ", unit: "%", power: 1, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] },
    "abaf": { name: "Mod. obr. magicznych", unit: "%", power: 3, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "astah": { name: "Mod. obr. fizycznych", unit: "%", power: 3, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "band": { name: "Szansa na traf. kryt.", unit: "%", power: 4, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "kalh": { name: "Dod. obr. zimno", unit: "%", power: 3, base: [0.35, 0.7, 1.4, 2.1], inc: [0.35, 0.35, 0.35, 0.35] },
    "teld": { name: "Szansa na podw. atak", unit: "%", power: 4, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "unn": { name: "Dod. obr. ogień", unit: "%", power: 3, base: [0.35, 0.7, 1.4, 2.1], inc: [0.35, 0.35, 0.35, 0.35] },
    "val": { name: "Dod. obr. energia", unit: "%", power: 3, base: [0.35, 0.7, 1.4, 2.1], inc: [0.35, 0.35, 0.35, 0.35] },
    "dur": { name: "Podwójne los. trafienia", unit: "%", power: 2, base: [0.5, 1, 2, 3], inc: [0.5, 0.5, 0.5, 0.5] },
    "ling": { name: "Mod. traf. dystans.", unit: "%", power: 3, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] },
    "lorb": { name: "Przełamanie odp. uroki", unit: "%", power: 2, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] },
    "oda": { name: "Mod. traf. mental.", unit: "%", power: 3, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] },
    "ulk": { name: "Mod. traf. wręcz", unit: "%", power: 3, base: [1, 2, 4, 6], inc: [1, 1, 1, 1] }
};

const TIER_MAP = { "Sub": 0, "Bi": 1, "Magni": 2, "Arcy": 3 };

const slotsConfig = [
    { id: "head", label: "Hełm", img: "helm.png", allowedOrbs: ["def"] },
    { id: "neck", label: "Naszyjnik", img: "naszyjnik.png", allowedOrbs: ["uni"] },
    { id: "gloves", label: "Rękawice", img: "rekawice.png", allowedOrbs: ["off"] },
    { id: "ring1", label: "Pierścień 1", img: "pierscien.png", allowedOrbs: ["uni"] },
    { id: "ring2", label: "Pierścień 2", img: "pierscien (2).png", allowedOrbs: ["uni"] },
    { id: "bracers", label: "Karwasze / Tarcza", img: "tarcza.png", allowedOrbs: ["off", "def"] },
    { id: "boots", label: "Buty", img: "buty.png", allowedOrbs: ["def"] },
    { id: "weapon", label: "Broń", img: "bron.png", allowedOrbs: ["off"] },
    { id: "legs", label: "Spodnie", img: "spodnie.png", allowedOrbs: ["def"] },
    { id: "waist", label: "Pas", img: "pas.png", allowedOrbs: ["off"] },
    { id: "body", label: "Zbroja", img: "zbroja.png", allowedOrbs: ["def"] },
    { id: "cape", label: "Peleryna", img: "peleryna.png", allowedOrbs: ["off"] } 
];

// ==========================================
// 4. ZMIENNE STANU APLIKACJI
// ==========================================
let equipment = {};
let driffInventory = [];
let autoDriffSelected = { root: null, tier: 'Magni', lvl: 1, buffer: false };
// ZMIANA: Poziom startowy 1
let characterLevel = 1;
let characterClass = "";
let statMultiplier = 1;
let allocatedStats = { "PŻ": 0, "Mana": 0, "Kondycja": 0, "Siła": 0, "Zręczność": 0, "Moc": 0, "Wiedza": 0, "Inteligencja": 0 };
let currentTotalStats = { "PŻ": 0, "Mana": 0, "Kondycja": 0, "Siła": 0, "Zręczność": 0, "Moc": 0, "Wiedza": 0, "Inteligencja": 0 };
let activeAdCategory = 'obrazen';

let lockedTooltipSlot = null;
let currentOpenSlotId = null;
let currentItemsCache = {};

// ==========================================
// 5. SYSTEM MODALI (ZAMIAST ALERT/CONFIRM)
// ==========================================
let modalCallback = null;

function showModal(type, title, message, callback = null, options = null) {
    const overlay = document.getElementById('custom-modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const msgEl = document.getElementById('modal-message');
    const actionsEl = document.getElementById('modal-actions');
    const inputCont = document.getElementById('modal-input-container');

    titleEl.innerText = title;
    msgEl.innerHTML = message.replace(/\n/g, '<br>');
    actionsEl.innerHTML = '';
    inputCont.innerHTML = '';
    inputCont.classList.add('hidden');
    modalCallback = callback;

    if (type === 'alert') {
        actionsEl.innerHTML = `<button onclick="closeModal()" class="ghost-btn-cyan" style="padding: 8px 20px;">OK</button>`;
    } else if (type === 'confirm') {
        actionsEl.innerHTML = `
            <button onclick="closeModal(false)" class="ghost-btn-red" style="padding: 8px 20px;">ANULUJ</button>
            <button onclick="closeModal(true)" class="ghost-btn-cyan" style="padding: 8px 20px;">POTWIERDŹ</button>
        `;
    } else if (type === 'prompt') {
        inputCont.innerHTML = `<input type="text" id="modal-input" class="top-input ghost" style="width: 100%; text-align: left; font-size: 14px; padding: 10px;">`;
        inputCont.classList.remove('hidden');
        actionsEl.innerHTML = `
            <button onclick="closeModal(null)" class="ghost-btn-red" style="padding: 8px 20px;">ANULUJ</button>
            <button onclick="closeModal(document.getElementById('modal-input').value)" class="ghost-btn-cyan" style="padding: 8px 20px;">OK</button>
        `;
        setTimeout(() => document.getElementById('modal-input').focus(), 100);
    } else if (type === 'select') {
        let selHtml = `<select id="modal-select" class="top-select ghost" style="width: 100%; text-align: left; font-size: 14px; padding: 10px; background: #0a0a0a;">`;
        options.forEach(opt => selHtml += `<option value="${opt}">${opt}</option>`);
        selHtml += `</select>`;
        
        inputCont.innerHTML = selHtml;
        inputCont.classList.remove('hidden');
        actionsEl.innerHTML = `
            <button onclick="closeModal(null)" class="ghost-btn-red" style="padding: 8px 20px;">ANULUJ</button>
            <button onclick="closeModal(document.getElementById('modal-select').value)" class="ghost-btn-cyan" style="padding: 8px 20px;">WCZYTAJ</button>
        `;
    }

    overlay.classList.remove('hidden');
}

function closeModal(result) {
    document.getElementById('custom-modal-overlay').classList.add('hidden');
    if (modalCallback) modalCallback(result);
    modalCallback = null;
}

function customAlert(msg) { showModal('alert', 'INFORMACJA', msg); }
function customConfirm(msg, yesCallback) { showModal('confirm', 'POTWIERDZENIE', msg, (res) => { if(res) yesCallback(); }); }
function customPrompt(msg, okCallback) { showModal('prompt', 'WPROWADŹ DANE', msg, (res) => { okCallback(res); }); }


// ==========================================
// 6. INICJALIZACJA KOŁA Z PLIKAMI PNG W TLE
// ==========================================
const tooltip = document.getElementById('tooltip');
const wheel = document.getElementById('wheel');

function renderEmptySlot(slotId) {
    const slotDiv = document.getElementById(`slot-${slotId}`);
    const slotConf = slotsConfig.find(s => s.id === slotId);
    slotDiv.className = 'slot empty';
    slotDiv.style.borderColor = "#333";
    slotDiv.style.boxShadow = "none";
    slotDiv.innerHTML = `<img src="/static/slots/${slotConf.img}" class="placeholder-img" alt="${slotConf.label}" onerror="this.style.display='none'">`;
}

slotsConfig.forEach((slot, index) => {
    const angle = (index * 30 - 90) * (Math.PI / 180);
    const x = 325 + 260 * Math.cos(angle) - 45;
    const y = 325 + 260 * Math.sin(angle) - 45;
    
    const div = document.createElement('div');
    div.id = `slot-${slot.id}`;
    div.style.left = `${x}px`; div.style.top = `${y}px`;
    
    div.onclick = (e) => {
        if(e.target.closest('.driff-socket') || e.target.closest('.orb-socket') || e.target.closest('.ctx-slider')) return;
        
        document.getElementById('context-menu').classList.add('hidden');
        
        if (equipment[slot.id]) {
            e.stopPropagation();
            if (lockedTooltipSlot === slot.id) {
                lockedTooltipSlot = null;
                tooltip.classList.remove('locked');
                hideTooltip();
            } else {
                lockedTooltipSlot = null; 
                moveTooltip(e);
                lockedTooltipSlot = slot.id;
                tooltip.classList.add('locked');
                showTooltip(e, slot.id, true);
            }
        } else {
            lockedTooltipSlot = null;
            tooltip.classList.remove('locked');
            hideTooltip();
            openItemList(slot.id, slot.label);
        }
    };
    div.onmouseenter = (e) => showTooltip(e, slot.id);
    div.onmousemove = (e) => moveTooltip(e);
    div.onmouseleave = () => hideTooltip();
    
    wheel.appendChild(div);
    renderEmptySlot(slot.id); 
});

document.addEventListener('click', (e) => {
    if(!e.target.closest('#context-menu') && !e.target.closest('.driff-socket') && !e.target.closest('.orb-socket')) {
        document.getElementById('context-menu').classList.add('hidden');
    }
    
    if (lockedTooltipSlot && !e.target.closest('#tooltip') && !e.target.closest('.slot')) {
        lockedTooltipSlot = null;
        tooltip.classList.remove('locked');
        hideTooltip();
    }
});

updateGlobalStats();

// ==========================================
// 7. LOGIKA WYSUWANEGO PANELA I STATYSTYK
// ==========================================
function toggleStatsDrawer() {
    const drawer = document.getElementById('stats-drawer');
    drawer.classList.toggle('hidden');
}

function showToast(msg) {
    let toast = document.getElementById('toast-msg');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function updateCharLevel(val) {
    let lvl = parseInt(val);
    if (isNaN(lvl) || lvl < 1) lvl = 1;
    if (lvl > 140) lvl = 140; 
    characterLevel = lvl;
    document.getElementById('char-level').value = characterLevel;
    updateGlobalStats(); checkEquippedItems(); refreshItemGridIfNeeded();
}

function updateCharClass(val) {
    characterClass = val;
    updateGlobalStats(); checkEquippedItems(); refreshItemGridIfNeeded();
}

function setMultiplier(val, btnElement) {
    statMultiplier = val;
    document.querySelectorAll('.mult-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
}

function getCharacterBaseStat(statName) {
    let conf = BASE_STATS[statName];
    if(!conf) return 0;
    return conf.base + (allocatedStats[statName] || 0) * conf.mult;
}

function allocateStat(stat, dir, e) {
    let amount = dir * statMultiplier;
    if (e && e.shiftKey) amount *= 10;
    if (e && e.ctrlKey) amount *= 100;
    
    let totalPoints = (characterLevel - 1) * 4;
    let spentPoints = Object.values(allocatedStats).reduce((a,b)=>a+b, 0);
    let availPoints = totalPoints - spentPoints;
    
    if (amount > 0) {
        if (availPoints <= 0) return;
        if (amount > availPoints) amount = availPoints; 
        allocatedStats[stat] += amount;
    } else {
        if (allocatedStats[stat] <= 0) return;
        if (Math.abs(amount) > allocatedStats[stat]) amount = -allocatedStats[stat]; 
        allocatedStats[stat] += amount;
    }
    
    updateGlobalStats(); 
    checkEquippedItems();
    refreshItemGridIfNeeded();
}

function checkEquippedItems() {
    let itemsRemoved = false;
    Object.keys(equipment).forEach(slotId => {
        let eq = equipment[slotId];
        if(eq) {
            let req = checkRequirements(eq.data.stats);
            if(!req.meets) {
                showToast(`Zdejmuję ${eq.item}: ${req.reason}`);
                equipment[slotId] = null;
                renderEmptySlot(slotId);
                itemsRemoved = true;
            }
        }
    });
    if (itemsRemoved) updateGlobalStats(); 
}

function resetStats() {
    customConfirm("Czy na pewno chcesz wyzerować rozdane punkty statystyk? Ekwipunek niespełniający bazowych wymagań zostanie ściągnięty!", () => {
        allocatedStats = { "PŻ": 0, "Mana": 0, "Kondycja": 0, "Siła": 0, "Zręczność": 0, "Moc": 0, "Wiedza": 0, "Inteligencja": 0 };
        updateGlobalStats();
        checkEquippedItems(); 
        refreshItemGridIfNeeded();
    });
}

// ==========================================
// 8. ZARZĄDZANIE BUILDAMI
// ==========================================
function resetBuild() {
    customConfirm("Czy na pewno chcesz wyzerować cały ekwipunek i statystyki?", () => {
        equipment = {};
        characterLevel = 1; // ZMIANA: Reset do 1
        characterClass = "";
        document.getElementById('char-level').value = 1; // ZMIANA: Reset do 1
        document.getElementById('char-class').value = "";
        allocatedStats = { "PŻ": 0, "Mana": 0, "Kondycja": 0, "Siła": 0, "Zręczność": 0, "Moc": 0, "Wiedza": 0, "Inteligencja": 0 };
        slotsConfig.forEach(slot => renderEmptySlot(slot.id));
        lockedTooltipSlot = null; tooltip.classList.remove('locked'); hideTooltip();
        updateGlobalStats();
    });
}

function saveBuild() {
    if(Object.keys(equipment).length === 0) { customAlert("Twój ekwipunek jest pusty!"); return; }
    
    customPrompt("Podaj nazwę dla tego zapisu:", (buildName) => {
        if(!buildName) return;
        let savedBuilds = JSON.parse(localStorage.getItem('br_builds') || '{}');
        savedBuilds[buildName] = { eq: equipment, lvl: characterLevel, charClass: characterClass, stats: allocatedStats };
        localStorage.setItem('br_builds', JSON.stringify(savedBuilds));
        customAlert(`Pomyślnie zapisano build: "${buildName}"`);
    });
}

function loadBuild() {
    let savedBuilds = JSON.parse(localStorage.getItem('br_builds') || '{}');
    let buildNames = Object.keys(savedBuilds);
    if(buildNames.length === 0) { customAlert("Brak zapisanych buildów w pamięci."); return; }
    
    showModal('select', 'WCZYTAJ BUILD', 'Wybierz zapisany build z listy poniżej:', (buildName) => {
        if(!buildName || !savedBuilds[buildName]) {
            return;
        }
        
        let data = savedBuilds[buildName];
        if(data.eq) {
            equipment = data.eq; characterLevel = data.lvl || 1; // ZMIANA: Domyślnie 1
            characterClass = data.charClass || "";
            allocatedStats = data.stats || { "PŻ": 0, "Mana": 0, "Kondycja": 0, "Siła": 0, "Zręczność": 0, "Moc": 0, "Wiedza": 0, "Inteligencja": 0 };
        } else {
            // Stary format zapisu
            equipment = data; characterLevel = 1; characterClass = "";
            allocatedStats = { "PŻ": 0, "Mana": 0, "Kondycja": 0, "Siła": 0, "Zręczność": 0, "Moc": 0, "Wiedza": 0, "Inteligencja": 0 };
        }
        document.getElementById('char-level').value = characterLevel;
        document.getElementById('char-class').value = characterClass;

        slotsConfig.forEach(slot => {
            if(equipment[slot.id]) {
                const slotDiv = document.getElementById(`slot-${slot.id}`);
                slotDiv.classList.remove('empty'); slotDiv.classList.add('equipped');
                renderSlot(slot.id);
            } else {
                renderEmptySlot(slot.id);
            }
        });
        lockedTooltipSlot = null; tooltip.classList.remove('locked'); hideTooltip();
        updateGlobalStats();
    }, buildNames);
}

function getDriffCost(root, lvl) {
    const basePower = DRIFF_STATS_DATA[root].power;
    let multiplier = 1;
    if (lvl >= 17) multiplier = 4;
    else if (lvl >= 12) multiplier = 3; 
    else if (lvl >= 7) multiplier = 2;
    else multiplier = 1;
    return basePower * multiplier;
}

function getNextPowerLvl(lvl, tier) {
    let maxLvl = (tier === "Arcy") ? 21 : (tier === "Magni") ? 16 : (tier === "Bi") ? 11 : 6;
    if (lvl < 7 && maxLvl >= 7) return 7;
    if (lvl >= 7 && lvl < 12 && maxLvl >= 12) return 12;
    if (lvl >= 12 && lvl < 17 && maxLvl >= 17) return 17;
    return lvl;
}

// ==========================================
// 9. SMART PANEL: WYBÓR PRZEDMIOTÓW I SZUKAJKA
// ==========================================
function checkRequirements(stats) {
    if(!stats) return { meets: true };
    if (stats["Wymagana klasa"] !== undefined) {
        if (characterClass === "") return { meets: false, reason: `Wybierz klasę postaci!`, keyFailing: "Wymagana klasa" };
        if (characterClass !== stats["Wymagana klasa"]) return { meets: false, reason: `Zła klasa (wymaga: ${stats["Wymagana klasa"]})`, keyFailing: "Wymagana klasa" };
    }
    
    let reqs = {
        "Wymagany poziom": characterLevel, 
        "Wymagana siła": getCharacterBaseStat("Siła"),
        "Wymagana zręczność": getCharacterBaseStat("Zręczność"), 
        "Wymagana moc": getCharacterBaseStat("Moc"),
        "Wymagana wiedza": getCharacterBaseStat("Wiedza")
    };
    
    for(let [key, currentVal] of Object.entries(reqs)) {
        if(stats[key] !== undefined) {
            let requiredVal = parseInt(stats[key].toString().replace(/\D/g,''));
            if(currentVal < requiredVal) {
                let shortKey = key.replace('Wymagana ', '').replace('Wymagany ', '');
                return { meets: false, reason: `Wymaga ${requiredVal} ${shortKey}`, keyFailing: key };
            }
        }
    }
    return { meets: true };
}

function closeItemSelection() {
    currentOpenSlotId = null;
    document.getElementById('view-items').classList.add('hidden');
    document.getElementById('view-mods').classList.remove('hidden');
}

function filterItems() {
    let query = document.getElementById('item-search').value.toLowerCase();
    let items = document.querySelectorAll('.grid-item');
    items.forEach(item => {
        let name = item.getAttribute('data-name');
        if(name && name.includes(query)) item.style.display = 'flex';
        else item.style.display = 'none';
    });
}

function renderItemsGrid(items, slotId) {
    const grid = document.getElementById('right-item-grid');
    grid.innerHTML = '';
    
    if(Object.keys(items).length === 0) {
        grid.innerHTML = '<p style="color:#666; padding:20px; text-align:center;">Brak przedmiotów w bazie dla tego slotu.</p>';
        return;
    }

    const tiers = { "EPIKI": [], "Tier I (Rangi I-III)": [], "Tier II (Rangi IV-VI)": [], "Tier III (Rangi VII-IX)": [], "Tier IV (Rangi X-XII)": [] };

    Object.entries(items).forEach(([name, data]) => {
        let isEpic = data.fixed_driffs !== undefined;
        if (isEpic) {
            let reqClass = data.stats && data.stats["Wymagana klasa"];
            if (characterClass && reqClass && characterClass !== reqClass) return; 
            tiers["EPIKI"].push({name, data});
        } else {
            const rank = parseInt(data.rank) || 0; 
            if (rank <= 3) tiers["Tier I (Rangi I-III)"].push({name, data});
            else if (rank <= 6) tiers["Tier II (Rangi IV-VI)"].push({name, data});
            else if (rank <= 9) tiers["Tier III (Rangi VII-IX)"].push({name, data});
            else tiers["Tier IV (Rangi X-XII)"].push({name, data});
        }
    });

    for (const [tierName, tierItems] of Object.entries(tiers)) {
        if (tierItems.length === 0) continue; 
        
        const header = document.createElement('div');
        let color = tierName === "EPIKI" ? "#ffaa00" : "#00adb5";
        header.style = `color: ${color}; border-bottom: 1px dashed #333; padding-bottom: 4px; margin-top: 15px; margin-bottom: 10px; font-weight: bold; font-size: 12px; text-transform: uppercase;`;
        header.innerText = tierName;
        grid.appendChild(header);

        const gridCont = document.createElement('div');
        gridCont.className = "item-grid-right";
        
        tierItems.sort((a, b) => {
            let rankA = parseInt(a.data.rank) || 0;
            let rankB = parseInt(b.data.rank) || 0;
            return rankA - rankB; 
        }).forEach(item => {
            const req = checkRequirements(item.data.stats);
            const d = document.createElement('div');
            d.className = `grid-item ${req.meets ? '' : 'locked-item'}`;
            d.setAttribute('data-name', item.name.toLowerCase()); 
            if (item.data.fixed_driffs !== undefined && req.meets) d.style.borderColor = "rgba(255, 170, 0, 0.4)";
            
            let folder = item.data.folder === "epik" ? "/static/epik" : "/static/rary";
            let lockOverlay = req.meets ? '' : '<div class="lock-overlay">🔒</div>';
            d.innerHTML = `<img src="${folder}/${item.data.img}" class="main-icon"> ${lockOverlay}`;
            
            d.onclick = function() {
                if(!req.meets) {
                    this.classList.add('shake-anim');
                    setTimeout(() => this.classList.remove('shake-anim'), 300);
                    showToast(req.reason);
                } else {
                    equipItem(slotId, item.name, item.data);
                }
            };
            d.onmouseenter = (e) => showGridTooltip(e, item.name, item.data, req);
            d.onmousemove = moveTooltip;
            d.onmouseleave = hideTooltip;
            gridCont.appendChild(d);
        });
        grid.appendChild(gridCont);
    }
    
    filterItems();
}

async function openItemList(slotId, label) {
    currentOpenSlotId = slotId;
    document.getElementById('view-mods').classList.add('hidden');
    document.getElementById('view-items').classList.remove('hidden');
    document.getElementById('right-panel-title').innerText = `${label.toUpperCase()}`;
    document.getElementById('item-search').value = ""; 
    
    const grid = document.getElementById('right-item-grid');
    grid.innerHTML = '<p style="color:#666; padding:20px; text-align:center; font-size:12px;">Wczytywanie z serwera...</p>';
    
    try {
        const response = await fetch(`/get_items/${slotId}`);
        currentItemsCache = await response.json();
        renderItemsGrid(currentItemsCache, slotId);
    } catch (e) {
        grid.innerHTML = '<p style="color:#d9534f; padding:20px; text-align:center;">Błąd połączenia z serwerem.</p>';
    }
}

// Zoptymalizowane odświeżanie siatki przedmiotów (Debounce)
let gridRefreshTimeout = null;
function refreshItemGridIfNeeded() {
    if(currentOpenSlotId && !document.getElementById('view-items').classList.contains('hidden')) {
        clearTimeout(gridRefreshTimeout);
        gridRefreshTimeout = setTimeout(() => {
            let grid = document.getElementById('right-item-grid');
            let scrollY = grid ? grid.scrollTop : 0; 
            renderItemsGrid(currentItemsCache, currentOpenSlotId);
            if(grid) grid.scrollTop = scrollY; 
        }, 150);
    }
}

function equipItem(slotId, name, data) {
    const slotsCount = data.slots || 1;
    const driffsArray = Array(slotsCount).fill(null);
    if (data.fixed_driffs) {
        data.fixed_driffs.forEach((root, i) => {
            if (i < slotsCount) driffsArray[i] = { tier: "Magni", root: root, lvl: 1, locked: true };
        });
    }
    equipment[slotId] = { item: name, data: data, star: "B1", driffs: driffsArray, orb: null };
    
    const slotDiv = document.getElementById(`slot-${slotId}`);
    slotDiv.classList.add('equipped');
    slotDiv.classList.remove('empty');
    
    renderSlot(slotId);
    closeItemSelection();
}

function unequipFromTooltip(slotId) {
    equipment[slotId] = null;
    renderEmptySlot(slotId);
    lockedTooltipSlot = null;
    tooltip.classList.remove('locked');
    hideTooltip();
    updateGlobalStats();
}

function openItemListFromTooltip(slotId) {
    const label = slotsConfig.find(s => s.id === slotId).label;
    lockedTooltipSlot = null;
    tooltip.classList.remove('locked');
    hideTooltip();
    openItemList(slotId, label);
}

// ==========================================
// 10. RENDEROWANIE SLOTU 
// ==========================================
function renderSlot(slotId) {
    const slotDiv = document.getElementById(`slot-${slotId}`);
    const eq = equipment[slotId];
    if(!eq) return;

    let folder = eq.data.folder === "epik" ? "/static/epik" : "/static/rary";
    let html = `<img src="${folder}/${eq.data.img}" class="item-img">`;
    
    let orbHtml = "";
    if(eq.orb) {
        const names = getOrbFilename(eq.orb.tier, eq.orb.root);
        orbHtml = `<img src="/static/orbs/${names.withAp}" onerror="this.onerror=null;this.src='/static/orbs/${names.simple}'">`;
    }
    html += `<div class="orb-socket" onclick="openContextMenu(event, '${slotId}', 0, 'orb')">${orbHtml}</div>`;
    
    html += `<div class="driff-container">`;
    eq.driffs.forEach((driff, i) => {
        let img = ""; let style = "";
        if(driff) {
            let n1 = `${driff.tier}drif_${driff.root}.png`;
            let n2 = `${driff.tier}_${driff.root}.png`;
            let n3 = `${driff.root}.png`;
            img = `<img src="/static/driffy/${n1}" onerror="this.onerror=function(){this.onerror=null;this.src='/static/driffy/${n3}'}; this.src='/static/driffy/${n2}'">`;
            if(driff.locked) style = "border-color: #ffaa00; box-shadow: 0 0 5px #ffaa00;";
        }
        html += `<div class="driff-socket" style="${style}" onclick="openContextMenu(event, '${slotId}', ${i}, 'driff')">${img}</div>`;
    });
    slotDiv.innerHTML = html + `</div>`;
    slotDiv.style.borderColor = eq.data.fixed_driffs ? "#ffaa00" : "#00adb5";
    slotDiv.style.boxShadow = eq.data.fixed_driffs ? "0 0 10px rgba(255,170,0,0.5)" : "none";
    
    updateGlobalStats(); 
}

function getOrbFilename(tier, root) {
    const n = ORB_DATA[root].name;
    return { withAp: `${tier}orb_${n}.png`, simple: `${root}.png` };
}

function changeStarLevel(e, slotId, delta) {
    if(e) e.stopPropagation(); 
    if(!equipment[slotId]) return;
    let current = equipment[slotId].star || "0";
    let idx = STAR_LEVELS.indexOf(current);
    if(idx === -1) idx = 0;
    
    let newIdx = idx + delta;
    if(newIdx < 0) newIdx = 0;
    if(newIdx >= STAR_LEVELS.length) newIdx = STAR_LEVELS.length - 1;
    
    equipment[slotId].star = STAR_LEVELS[newIdx];
    
    setTimeout(() => {
        renderSlot(slotId);
        showTooltip(null, slotId, true);
    }, 0);
}

// ==========================================
// 11. ZAAWANSOWANY EDYTOR WŁOŻONEGO DRIFA / MENU DODAWANIA 
// ==========================================
function openContextMenu(e, slotId, index, mode) {
    e.stopPropagation();
    
    if (lockedTooltipSlot === slotId) {
        lockedTooltipSlot = null;
        tooltip.classList.remove('locked');
        hideTooltip();
    }
    
    const eq = equipment[slotId];
    if(!eq) return;

    let currentItem = mode === 'orb' ? eq.orb : eq.driffs[index];
    let menu = document.getElementById('context-menu');
    let html = '';

    if (currentItem) {
        let maxLvl = mode === 'driff' ? (currentItem.tier==="Arcy"?21:currentItem.tier==="Magni"?16:currentItem.tier==="Bi"?11:6) : (currentItem.tier==="Sub"?1:3);
        let itemName = mode === 'driff' ? DRIFF_STATS_DATA[currentItem.root].name : ORB_DATA[currentItem.root].name;
        let color = currentItem.tier === "Arcy" ? "#f44336" : (currentItem.tier === "Magni" ? "#ffaa00" : (currentItem.tier === "Bi" ? "#2196f3" : "#4caf50"));

        html = `
            <div style="padding: 15px; min-width: 220px; background: #0f0f0f; border-radius: 6px; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);">
                <div style="color:${color}; font-weight:bold; font-size:13px; text-transform:uppercase; border-bottom:1px solid #222; padding-bottom:10px; margin-bottom:15px; text-align:center; letter-spacing: 1px;">
                    ${currentItem.tier}${mode==='orb'?'orb':'drif'}<br><span style="color:#fff; font-size:11px;">${itemName}</span>
                </div>
                <div style="display:flex; align-items:center; justify-content: space-between; margin-bottom: 15px; --ctx-color: ${color};">
                    <span style="color:#666; font-size:10px; font-weight:bold; letter-spacing: 1px;">POZIOM:</span>
                    <input type="range" min="1" max="${maxLvl}" value="${currentItem.lvl}" 
                        oninput="document.getElementById('ctx-lvl-val').innerText = this.value;" 
                        onchange="setItemLevelLive('${slotId}', ${index}, '${mode}', this.value)"
                        onclick="event.stopPropagation()" onmousedown="event.stopPropagation()"
                        class="ctx-slider">
                    <span id="ctx-lvl-val" style="color:${color}; font-weight:bold; font-size:15px; width:22px; text-align:right;">${currentItem.lvl}</span>
                </div>
        `;
        
        if (!currentItem.locked) {
            html += `<button onclick="removeItemFromSocket('${slotId}', ${index}, '${mode}')" style="background:transparent; color:#d9534f; border:1px solid #d9534f; border-radius:4px; padding:8px; font-weight:bold; cursor:pointer; width:100%; transition:0.2s; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;" onmouseover="this.style.boxShadow='inset 0 0 10px rgba(217,83,79,0.3)';" onmouseout="this.style.boxShadow='none';">Usuń ${mode==='orb'?'Orba':'Drifa'}</button>`;
        }
        html += `</div>`;
        
    } else {
        let rank = parseInt(eq.data.rank) || 1;
        let allowedTiers = ["Sub"];
        if(rank >= 4) allowedTiers.push("Bi");
        if(rank >= 7) allowedTiers.push("Magni");
        if(rank >= 10) allowedTiers.push("Arcy");
        allowedTiers.reverse();

        html = `<ul class="ctx-menu">`;
        let tierColors = { "Sub": "#4caf50", "Bi": "#2196f3", "Magni": "#ffaa00", "Arcy": "#f44336" };

        allowedTiers.forEach(tier => {
            let tColor = tierColors[tier];
            html += `<li class="ctx-item has-sub" style="color: ${tColor}; font-weight: bold; border-left: 3px solid ${tColor};">${tier}${mode==='orb'?'orb':'drif'}
                        <ul class="ctx-submenu">`;

            if (mode === 'driff') {
                Object.entries(DRIFF_CATEGORIES).forEach(([catKey, cat]) => {
                    html += `<li class="ctx-item has-sub" style="color: #ccc; font-weight: normal;">${cat.label}
                                <ul class="ctx-submenu">`;
                    cat.roots.forEach(root => {
                        let name = DRIFF_STATS_DATA[root].name;
                        let n1 = `${tier}drif_${root}.png`; let n2 = `${tier}_${root}.png`; let n3 = `${root}.png`;
                        html += `<li class="ctx-item" onclick="insertItemToSocket('${slotId}', ${index}, '${mode}', '${tier}', '${root}')">
                                    <div style="display:flex; align-items:center;">
                                        <img src="/static/driffy/${n1}" class="ctx-icon" onerror="this.onerror=function(){this.onerror=null;this.src='/static/driffy/${n3}'}; this.src='/static/driffy/${n2}'"> 
                                        <span style="color:#eee; font-weight:normal;">${name}</span>
                                    </div>
                                 </li>`;
                    });
                    html += `</ul></li>`;
                });
            } else {
                const allowedOrbTypes = slotsConfig.find(s=>s.id===slotId).allowedOrbs || [];
                allowedOrbTypes.forEach(catKey => {
                    let catLabel = catKey === 'off' ? 'Ofensywne' : catKey === 'def' ? 'Defensywne' : 'Uniwersalne';
                    html += `<li class="ctx-item has-sub" style="color: #ccc; font-weight: normal;">${catLabel}
                                <ul class="ctx-submenu">`;
                    Object.entries(ORB_DATA).forEach(([root, orbData]) => {
                        if (orbData.type === catKey) {
                            let fnames = getOrbFilename(tier, root);
                            html += `<li class="ctx-item" onclick="insertItemToSocket('${slotId}', ${index}, '${mode}', '${tier}', '${root}')">
                                        <div style="display:flex; align-items:center;">
                                            <img src="/static/orbs/${fnames.withAp}" onerror="this.onerror=null;this.src='/static/orbs/${fnames.simple}'" class="ctx-icon"> 
                                            <span style="color:#eee; font-weight:normal;">${orbData.name}</span>
                                        </div>
                                     </li>`;
                        }
                    });
                    html += `</ul></li>`;
                });
            }
            html += `</ul></li>`;
        });
        html += `</ul>`;
    }

    menu.innerHTML = html;
    menu.classList.remove('hidden');
    menu.classList.remove('align-right');

    let mWidth = 200; 
    let mHeight = 250; 
    let x = e.pageX; 
    let y = e.pageY;
    
    if(x + mWidth > window.innerWidth) x = window.innerWidth - mWidth - 10;
    if(y + mHeight > window.innerHeight) y = window.innerHeight - mHeight - 10; 

    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
}

function setItemLevelLive(slotId, index, mode, lvl) {
    lvl = parseInt(lvl);
    if(mode === 'driff') equipment[slotId].driffs[index].lvl = lvl; 
    else equipment[slotId].orb.lvl = lvl;
    renderSlot(slotId); 
}

function removeItemFromSocket(slotId, index, mode) {
    if(mode === 'driff') equipment[slotId].driffs[index] = null; else equipment[slotId].orb = null;
    renderSlot(slotId); document.getElementById('context-menu').classList.add('hidden');
}

function insertItemToSocket(slotId, index, mode, tier, root) {
    let newItem = { tier, root, lvl: 1, locked: false };
    if(mode === 'driff') equipment[slotId].driffs[index] = newItem; else equipment[slotId].orb = newItem;
    renderSlot(slotId); document.getElementById('context-menu').classList.add('hidden');
}

// ==========================================
// 12. SYSTEM TOOLTIPÓW (Akceleracja GPU)
// ==========================================
function hideTooltip() { 
    if(lockedTooltipSlot) return; 
    tooltip.style.display = 'none'; 
}

function moveTooltip(e) {
    if(lockedTooltipSlot) return; 
    if(!e) return;
    let x = e.clientX + 20; let y = e.clientY + 20;
    if(y + tooltip.offsetHeight > window.innerHeight) y = window.innerHeight - tooltip.offsetHeight - 15;
    if(x + tooltip.offsetWidth > window.innerWidth) x = window.innerWidth - tooltip.offsetWidth - 15;
    if (y < 10) y = 10;
    // Zoptymalizowane przesuwanie przez transform: translate3d
    tooltip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function showGridTooltip(e, name, data, req) {
    if(lockedTooltipSlot) return; 
    let isEpic = data.fixed_driffs !== undefined;
    let rankRoman = ROMAN_RANKS[data.rank] || data.rank;
    let html = `<div class="${isEpic?'t-epic':'t-cyan'}">"${name}"</div>`;
    
    html += `<div style="margin-top: 10px; font-size: 13px;">`;
    if(data.type) html += `<div class="t-row"><span class="t-label">Kategoria:</span> <span class="t-val-container"><span class="t-val">${data.type}</span></span></div>`;
    if(data.rank) html += `<div class="t-row"><span class="t-label">Ranga:</span> <span class="t-val-container"><span class="t-val">${rankRoman}</span></span></div>`;
    if(data.stats && data.stats["Waga"]) html += `<div class="t-row"><span class="t-label">Waga:</span> <span class="t-val-container"><span class="t-val">${data.stats["Waga"]}</span></span></div>`;
    if(data.stats && data.stats["Wartość"]) html += `<div class="t-row"><span class="t-label">Wartość:</span> <span class="t-val-container"><span class="t-val">${data.stats["Wartość"]}</span></span></div>`;
    html += `<div class="t-row"><span class="t-label" style="display:flex; align-items:center; gap:4px;"><img src="/static/stars/bronze.png" style="width:12px; opacity:0.5; filter:grayscale(100%);">Pojemność:</span> <span class="t-val-container"><span class="t-val">${data.cap||0}</span></span></div>`;
    html += `<div style="margin-top:8px; border-top:1px dashed #333; padding-top:8px;"></div>`;
    
    let rendered = new Set(["Waga", "Wartość"]);
    if(data.stats) {
        STAT_ORDER.forEach(k => {
            if(data.stats[k] !== undefined && !rendered.has(k)) {
                let colorClass = (req && !req.meets && req.keyFailing === k) ? 't-red' : 't-val';
                html += `<div class="t-row"><span class="t-label">${k}:</span> <span class="t-val-container"><span class="${colorClass}">${data.stats[k]}</span></span></div>`;
                rendered.add(k);
            }
        });
        Object.entries(data.stats).forEach(([k,v]) => { 
            if(!rendered.has(k) && !k.includes("Wzmocnienie")) { html += `<div class="t-row"><span class="t-label">${k}:</span> <span class="t-val-container"><span class="t-val">${v}</span></span></div>`; }
        });
    }
    if(isEpic) {
        html += `<div style="margin-top:10px; border-top:1px dashed #333; padding-top:8px;"></div>`;
        data.fixed_driffs.forEach(r => {
            const s = DRIFF_STATS_DATA[r];
            if(s) html += `<div style="margin-top:2px;"><span style="color:#ffaa00; font-size:12px;">🔒 Magni ${s.name}</span><div class="t-row"><span class="t-val-container"><span class="t-blue">+${s.base[2].toFixed(2)}${s.unit}</span></span></div></div>`;
        });
    }
    tooltip.innerHTML = html + `</div>`; tooltip.style.display = 'block'; moveTooltip(e);
}

function showTooltip(e, slotId, force = false) {
    if(!force && !document.getElementById('context-menu').classList.contains('hidden')) return;
    const eq = equipment[slotId]; 
    if(!eq) return;

    if(!force && lockedTooltipSlot && lockedTooltipSlot !== slotId) return;
    
    let isLocked = (lockedTooltipSlot === slotId);
    
    const conf = STARS_CONFIG[eq.star] || STARS_CONFIG["0"]; 
    const totalCap = (eq.data.cap||0) + conf.cap;
    let used = 0; eq.driffs.forEach(d => {if(d) used += getDriffCost(d.root, d.lvl)});
    let rankRoman = ROMAN_RANKS[eq.data.rank] || eq.data.rank;

    let html = "";
    
    let type = conf.type; 
    let count = conf.count; 
    let shadowColor = type === 'gold' ? 'rgba(255, 215, 0, 0.8)' : (type === 'silver' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(205, 127, 50, 0.8)');
    let visualStars = "";
    if (eq.star && eq.star !== "0") {
        for(let i=0; i<count; i++) { visualStars += `<img src="/static/stars/${type}.png" style="width: 22px; height: 22px; margin: 0 1px; filter: drop-shadow(0 0 5px ${shadowColor});">`; }
    } else {
        visualStars = `<span style="color:#666; font-size:12px; font-weight:bold;">BRAK ULEPSZEŃ</span>`;
    }

    if (isLocked) {
        html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; padding: 0 10px;">
                    <button class="t-btn-star" onclick="changeStarLevel(event, '${slotId}', -1)">-</button>
                    <div style="display:flex; align-items:center; min-height: 25px;">${visualStars}</div>
                    <button class="t-btn-star" onclick="changeStarLevel(event, '${slotId}', 1)">+</button>
                 </div>`;
    } else {
        html += `<div style="display:flex; justify-content:center; align-items:center; margin-bottom:10px; min-height: 25px;">${visualStars}</div>`;
    }

    html += `<div class="${eq.data.fixed_driffs?'t-epic':'t-cyan'}">"${eq.item}"</div>`;
    html += `<div style="margin-top: 10px; font-size: 13px;">`;
    if(eq.data.type) html += `<div class="t-row"><span class="t-label">Kategoria:</span> <span class="t-val-container"><span class="t-val">${eq.data.type}</span></span></div>`;
    if(eq.data.rank) html += `<div class="t-row"><span class="t-label">Ranga:</span> <span class="t-val-container"><span class="t-val">${rankRoman}</span></span></div>`;
    if(eq.data.stats && eq.data.stats["Waga"]) html += `<div class="t-row"><span class="t-label">Waga:</span> <span class="t-val-container"><span class="t-val">${eq.data.stats["Waga"]}</span></span></div>`;
    if(eq.data.stats && eq.data.stats["Wartość"]) html += `<div class="t-row"><span class="t-label">Wartość:</span> <span class="t-val-container"><span class="t-val">${eq.data.stats["Wartość"]}</span></span></div>`;
    html += `<div class="t-row"><span class="t-label" style="display:flex; align-items:center; gap:4px;"><img src="/static/stars/bronze.png" style="width:12px; opacity:0.5; filter:grayscale(100%);">Pojemność:</span> <span class="t-val-container"><span class="t-val" style="color:${used>totalCap?'#d9534f':'#00ff66'}">${used}/${totalCap}</span></span></div>`;
    html += `<div style="margin-top:8px; border-top:1px dashed #333; padding-top:8px;"></div>`;
    
    let rendered = new Set(["Waga", "Wartość"]);

    if(eq.data.stats) {
        const renderStatRow = (k, v) => {
            if(rendered.has(k) || k.includes("Wzmocnienie")) return;
            if(k.includes("Wymag") || k.includes("Typ")) {
                let reqCheck = checkRequirements(eq.data.stats);
                let colorClass = (reqCheck && !reqCheck.meets && reqCheck.keyFailing === k) ? 't-red' : 't-val';
                html += `<div class="t-row"><span class="t-label">${k}:</span> <span class="t-val-container"><span class="${colorClass}">${v}</span></span></div>`;
            } else {
                let bValStr = v.toString();
                let bVal = 0;
                
                if(bValStr.includes('+lvl') || bValStr.includes('+ poziom')) {
                    bVal = parseFloat(bValStr.replace(/[^\d.-]/g, '')) + characterLevel;
                } else {
                    bVal = parseFloat(bValStr.replace(/[^\d.-]/g, ''));
                }

                let isPercentage = bValStr.includes('%');
                if(isNaN(bVal)) { 
                    html += `<div class="t-row"><span class="t-label">${k}:</span> <span class="t-val-container"><span class="t-val">${v}</span></span></div>`; 
                } else {
                    let perc = (k.includes("Obrażenia")) ? conf.weapon : conf.stats;
                    let bonus = isPercentage ? (bVal * (perc/100)) : Math.floor(bVal * (perc/100));
                    let total = isPercentage ? (bVal + bonus).toFixed(2) : (bVal + bonus);
                    let suffix = isPercentage ? '%' : '';
                    let prefix = (total>0 && !k.includes("Obrażenia") && !k.includes("Pancerz")) ? '+' : '';
                    
                    let bonusHtml = bonus > 0 ? `<span class="t-green">(+${isPercentage?bonus.toFixed(2):bonus})</span>` : `<span class="t-green-empty"></span>`;
                    html += `<div class="t-row"><span class="t-label">${k}:</span><span class="t-val-container"><span class="t-val">${prefix}${total}${suffix}</span>${bonusHtml}</span></div>`;
                }
            }
            rendered.add(k);
        };

        STAT_ORDER.forEach(k => { if(eq.data.stats[k] !== undefined) renderStatRow(k, eq.data.stats[k]); });
        Object.entries(eq.data.stats).forEach(([k,v]) => renderStatRow(k, v));
        
        if(conf.upgrade>0) html += `<div class="t-row"><span class="t-blue">Wzm. ulepszeń:</span><span class="t-val-container"><span class="t-blue">+${conf.upgrade}%</span></span></div>`;
        if(conf.orb>0) html += `<div class="t-row"><span class="t-blue">Wzm. orbów:</span><span class="t-val-container"><span class="t-blue">+${conf.orb}%</span></span></div>`;
        let tD = conf.driff + (eq.data.stats["Wzmocnienie drifów"] ? parseInt(eq.data.stats["Wzmocnienie drifów"]) : 0);
        if(tD>0) html += `<div class="t-row"><span class="t-blue">Wzm. drifów:</span><span class="t-val-container"><span class="t-blue">+${tD}%</span></span></div>`;
    }

    let hasAddons = eq.orb || eq.driffs.some(d=>d!==null);
    if(hasAddons) html += `<div style="margin-top:10px; border-top:1px dashed #333; padding-top:8px;"></div>`;

    if(eq.orb) {
        const s = ORB_DATA[eq.orb.root];
        if(s) {
            let oBonus = conf.orb + (eq.data.stats && eq.data.stats["Wzmocnienie orbów"] ? parseInt(eq.data.stats["Wzmocnienie orbów"]) : 0);
            let bArr = s[eq.orb.tier.toLowerCase()] || [0];
            let fVal = bArr[Math.min(eq.orb.lvl-1, bArr.length-1)] * (1 + oBonus/100);
            
            html += `
            <div style="margin-top:6px; display:flex; justify-content:space-between; align-items:flex-start; border-top: 1px dashed #333; padding-top: 6px;">
                <div style="color:#d000d0; font-size:12px; line-height:1.3; padding-right:10px; word-break: break-word; flex: 1; min-width: 0;">
                    ${eq.orb.tier}orb ${s.name}
                </div>
                <div style="color:#d000d0; font-weight:bold; white-space:nowrap; flex-shrink:0;">
                    +${fVal.toFixed(2)}${s.unit}
                </div>
            </div>`;
        }
    }

    eq.driffs.forEach(driff => {
        if(driff) {
            const stats = DRIFF_STATS_DATA[driff.root];
            const tierIdx = TIER_MAP[driff.tier] || 0;
            let baseVal = stats.base[tierIdx] + ((driff.lvl - 1) * stats.inc[tierIdx]);
            let dBonus = conf.driff + (eq.data.stats && eq.data.stats["Wzmocnienie drifów"] ? parseInt(eq.data.stats["Wzmocnienie drifów"]) : 0);
            let finalVal = baseVal * (1 + dBonus / 100);
            let bufferVisual = driff.buffer && !driff.locked ? ' <span style="color:#00ff66; font-size:10px;">[Zapas]</span>' : '';
            
            html += `
            <div style="margin-top:6px; display:flex; justify-content:space-between; align-items:flex-start; border-top: 1px dashed #333; padding-top: 6px;">
                <div style="color:#ffaa00; font-size:12px; line-height:1.3; padding-right:10px; word-break: break-word; flex: 1; min-width: 0;">
                    ${driff.locked?'🔒 ':''}${driff.tier}drif ${stats.name} <br><span style="color:#888; font-size:10px;">[Poziom: ${driff.lvl}]</span>${bufferVisual}
                </div>
                <div style="color:#00d9ff; font-weight:bold; white-space:nowrap; flex-shrink:0;">
                    ${finalVal>0?'+':''}${finalVal.toFixed(2)}${stats.unit}
                </div>
            </div>`;
        }
    });

    if(isLocked) {
        html += `
        <div style="display:flex; gap:10px; margin-top:20px; padding-top:15px; border-top: 1px solid #333;">
            <button class="t-action-btn" onclick="openItemListFromTooltip('${slotId}')">ZMIEŃ</button>
            <button class="t-action-btn remove" onclick="unequipFromTooltip('${slotId}')">ZDEJMIJ</button>
        </div>`;
    }

    tooltip.innerHTML = html + `</div>`; 
    tooltip.style.display = 'block'; 
    if(!isLocked) moveTooltip(e); 
}

function showDriffTooltip(e, root, tier = 'Magni', lvl = 1) {
    if(lockedTooltipSlot) return; 
    const stats = DRIFF_STATS_DATA[root];
    if(!stats) return;
    let tierIdx = TIER_MAP[tier] || 0;
    let baseVal = stats.base[tierIdx] + ((lvl - 1) * stats.inc[tierIdx]);
    let color = tier === "Arcy" ? "#f44336" : (tier === "Magni" ? "#ffaa00" : (tier === "Bi" ? "#2196f3" : "#4caf50"));
    let html = `<div style="color:${color}; font-weight:bold; font-size:16px; margin-bottom:5px; text-align:center; text-shadow:0 0 5px ${color}80; text-transform:uppercase;">${tier}drif ${stats.name}</div>`;
    html += `<div style="color:#aaa; font-size:12px; text-align:center; border-bottom:1px solid #333; padding-bottom:8px; margin-bottom:8px;">Poziom statystyk: ${lvl}</div>`;
    html += `<div class="t-row"><span class="t-label">${stats.name}:</span> <span class="t-val-container"><span class="t-blue">${baseVal>0?'+':''}${baseVal.toFixed(2)}${stats.unit}</span></span></div>`;
    html += `<div class="t-row" style="margin-top:5px;"><span class="t-label">Koszt w sprzęcie:</span> <span class="t-val-container"><span class="t-val">${getDriffCost(root, lvl)}</span></span></div>`;
    tooltip.innerHTML = html; tooltip.style.display = 'block'; moveTooltip(e);
}

// ==========================================
// 13. OBLICZANIE PRAWDZIWEGO POWERA I STATYSTYK
// ==========================================

// ZMIANA: Nowa funkcja do obliczania procentów odporności według wzorów z gry
function calculateResistancePercentage(points) {
    if (points <= 0) return 0.00;
    
    let percentage = 0.0;

    if (points <= 199) {
        // 0 - 199 pkt -> 0.1% za punkt
        percentage = points * 0.1;
    } else if (points <= 449) {
        // 200 - 449 pkt -> baza 20% + 0.04% za punkt powyżej 199
        percentage = 20.0 + ((points - 200 + 1) * 0.04);
    } else if (points <= 699) {
        // 450 - 699 pkt -> baza 30% + 0.04% za punkt powyżej 449
        percentage = 30.0 + ((points - 450 + 1) * 0.04);
    } else if (points <= 949) {
        // 700 - 949 pkt -> baza 40% + 0.02% za punkt powyżej 699
        percentage = 40.0 + ((points - 700 + 1) * 0.02);
    } else if (points <= 1349) {
        // 950 - 1349 pkt -> baza 45% + 0.02% za punkt powyżej 949
        percentage = 45.0 + ((points - 950 + 1) * 0.02);
    } else {
        // 1350+ pkt -> Cap 53%
        percentage = 53.0;
    }

    return Math.min(percentage, 53.0).toFixed(2);
}

function renderTopStatPanel() {
    let html = "";
    const allStats = ["Siła", "Zręczność", "Moc", "Wiedza", "Inteligencja", "PŻ", "Mana", "Kondycja"];
    
    allStats.forEach(k => {
        const conf = BASE_STATS[k];
        let baseVal = conf.base + (allocatedStats[k] * conf.mult);
        let shortName = k.substring(0, 4) + ".";
        if(k === "PŻ" || k === "Mana" || k === "Moc") shortName = k;
        
        let iconPath = STAT_ICONS[k].includes('/') ? `/static/${STAT_ICONS[k]}` : `/static/stats/${STAT_ICONS[k]}`;
        
        html += `
        <div class="top-attr-box">
            <div class="top-attr-name" title="${k}">
                <img src="${iconPath}" onerror="this.style.display='none'">
                ${shortName}
            </div>
            <div class="top-attr-controls">
                <button class="btn-top-alloc" onclick="allocateStat('${k}', -1, event)">-</button>
                <div class="top-stat-val">${baseVal}</div>
                <button class="btn-top-alloc" onclick="allocateStat('${k}', 1, event)">+</button>
            </div>
        </div>`;
    });
    let pnl = document.getElementById('top-stat-panel');
    if(pnl) pnl.innerHTML = html;
}

function updateGlobalStats() {
    let eqBaseStats = { "PŻ":0, "Mana":0, "Kondycja":0, "Siła":0, "Zręczność":0, "Moc":0, "Wiedza":0, "Inteligencja":0 };
    let defStats = { "Pancerz sieczne":0, "Pancerz obuchowe":0, "Pancerz kłute":0 };
    let resStats = { "Odporność ogień":0, "Odporność zimno":0, "Odporność energia":0, "Odporność uroki":0 };
    
    let dGroups = {}; let oGroups = {}; 
    let weaponDamageTotal = 0;

    Object.entries(equipment).forEach(([slotId, eq]) => {
        if(!eq) return;
        const conf = STARS_CONFIG[eq.star] || STARS_CONFIG["0"];

        if(eq.data.stats) {
            Object.entries(eq.data.stats).forEach(([k,v]) => {
                if(k.includes("Waga") || k.includes("Wartość") || k.includes("Wymag") || k.includes("Typ") || k.includes("Wzmocnienie")) return;
                
                let isPercentage = v.toString().includes('%');
                let bValStr = v.toString();
                let bVal = 0;
                
                if(bValStr.includes('+lvl') || bValStr.includes('+ poziom')) {
                    bVal = parseFloat(bValStr.replace(/[^\d.-]/g, '')) + characterLevel;
                } else {
                    bVal = parseFloat(bValStr.replace(/[^\d.-]/g, ''));
                }
                
                if(!isNaN(bVal) && !isPercentage) {
                    let perc = (k.includes("Obrażenia")) ? conf.weapon : conf.stats;
                    let total = bVal + Math.floor(bVal * (perc/100));
                    
                    if(eqBaseStats[k] !== undefined) eqBaseStats[k] += total;
                    else if(defStats[k] !== undefined) defStats[k] += total;
                    else if(resStats[k] !== undefined) resStats[k] += total;

                    if(k.includes("Obrażenia") && (slotId === "weapon" || eq.data.type.includes("Miecz") || eq.data.type.includes("Topór") || eq.data.type.includes("Łuk") || eq.data.type.includes("Kastety") || eq.data.type.includes("Kije"))) {
                        weaponDamageTotal = total;
                    }
                }
            });
        }

        if(eq.orb) {
            const s = ORB_DATA[eq.orb.root];
            if(s) {
                let oBonus = conf.orb + (eq.data.stats && eq.data.stats["Wzmocnienie orbów"] ? parseInt(eq.data.stats["Wzmocnienie orbów"]) : 0);
                let bArr = s[eq.orb.tier.toLowerCase()] || [0];
                let fVal = bArr[Math.min(eq.orb.lvl-1, bArr.length-1)] * (1 + oBonus/100);
                oGroups[s.bonus] = (oGroups[s.bonus] || 0) + fVal;
            }
        }

        eq.driffs.forEach(d => {
            if(d) {
                const s = DRIFF_STATS_DATA[d.root];
                let dBonus = conf.driff + (eq.data.stats && eq.data.stats["Wzmocnienie drifów"] ? parseInt(eq.data.stats["Wzmocnienie drifów"]) : 0);
                let val = (s.base[TIER_MAP[d.tier]] + (d.lvl-1)*s.inc[TIER_MAP[d.tier]]) * (1 + dBonus/100);
                if(!dGroups[s.name]) dGroups[s.name] = []; dGroups[s.name].push(val);
            }
        });
    });

    Object.keys(BASE_STATS).forEach(k => {
        const conf = BASE_STATS[k];
        let baseVal = conf.base + (allocatedStats[k] * conf.mult);
        let eqVal = eqBaseStats[k] || 0;
        currentTotalStats[k] = baseVal + eqVal;
    });

    let powerLvl = Math.floor((characterLevel * (characterLevel + 1)) / 8);
    let powerStats = currentTotalStats["Siła"] + currentTotalStats["Zręczność"] + currentTotalStats["Moc"] + currentTotalStats["Wiedza"] + currentTotalStats["Inteligencja"];
    powerStats += (2 * weaponDamageTotal);
    powerStats += Math.floor((currentTotalStats["PŻ"] + currentTotalStats["Kondycja"] + currentTotalStats["Mana"]) / 10);

    let sumPhysical = defStats["Pancerz sieczne"] + defStats["Pancerz obuchowe"] + defStats["Pancerz kłute"];
    let sumElemental = resStats["Odporność ogień"] + resStats["Odporność zimno"] + resStats["Odporność energia"];
    let sumMental = resStats["Odporność uroki"];
    let powerRes = (0.4 * sumPhysical) + (0.3 * sumElemental) + (0.6 * sumMental);

    let powerMods = 0;
    Object.entries(dGroups).forEach(([modName, values]) => {
        let p = values.length >= 12 ? 0.5 : DRIFF_PENALTY_TABLE[values.length] || 1;
        let sum = values.reduce((a, b) => a + b, 0) * p; 
        let multi = MOD_POWER_MULTI[modName] || 0;
        powerMods += (sum * multi);
    });

    let powerOrbs = 0;
    Object.values(equipment).forEach(eq => {
        if(eq && eq.orb) {
            let orbData = ORB_DATA[eq.orb.root];
            let katMulti = ORB_CATEGORY_MULTI[orbData.bonus] || 0;
            if(katMulti > 0) {
                let wOrb = WSP_ORB[`${eq.orb.tier}_${eq.orb.lvl}`] || 0;
                let wQual = WSP_QUAL[eq.star] || 0;
                powerOrbs += (wOrb + wQual) * katMulti;
            }
        }
    });

    let totalPower = Math.floor(powerLvl + powerStats + powerRes + powerMods + powerOrbs);
    const powerDisplay = document.getElementById('total-power');
    if(powerDisplay) powerDisplay.innerText = totalPower;
    
    if (totalPower > 2000) {
        if(powerDisplay) {
            powerDisplay.style.textShadow = '0 0 30px #ffaa00, 0 0 10px #ffaa00';
            powerDisplay.style.color = '#fffbe6';
        }
    } else {
        if(powerDisplay) {
            powerDisplay.style.textShadow = '0 0 20px #00adb5';
            powerDisplay.style.color = '#fff';
        }
    }

    let totalPts = (characterLevel - 1) * 4;
    let spentPts = Object.values(allocatedStats).reduce((a,b)=>a+b, 0);
    let availPts = totalPts - spentPts;
    
    let elStatPts = document.getElementById('stat-points');
    if(elStatPts) elStatPts.innerText = availPts;
    
    let elBtnPts = document.getElementById('stat-points-btn');
    if(elBtnPts) elBtnPts.innerText = availPts;

    // --- LEWY PANEL (Zawsze widoczny!) ---
    let leftHtml = `<div class="stat-group">`;
    leftHtml += `<div class="stat-header-row" style="padding-bottom:5px; border-bottom: 1px solid #222; margin-bottom:5px;">
        <div style="flex:1; font-size: 10px; color:#888;">STATYSTYKA</div>
        <div style="width:35px; text-align:right; font-size:10px; color:#888;">BAZA</div>
        <div style="width:35px; text-align:right; color:#00ff66; font-size:10px;">EQ</div>
        <div style="width:40px; text-align:right; color:#00adb5; font-size:10px;">SUMA</div>
    </div>`;

    const displayStats = ["PŻ", "Mana", "Kondycja", "Siła", "Zręczność", "Moc", "Wiedza", "Inteligencja"];
    displayStats.forEach(k => {
        let conf = BASE_STATS[k];
        let baseVal = conf.base + (allocatedStats[k] * conf.mult);
        let eqVal = eqBaseStats[k] || 0;
        let total = currentTotalStats[k];
        let eqStr = eqVal > 0 ? `+${eqVal}` : (eqVal < 0 ? eqVal : '');
        
        let iconPath = STAT_ICONS[k].includes('/') ? `/static/${STAT_ICONS[k]}` : `/static/stats/${STAT_ICONS[k]}`;
        
        leftHtml += `
        <div class="stat-item-clean">
            <div class="stat-item-name">
                <img src="${iconPath}" onerror="this.style.display='none'">
                <span>${k}</span>
            </div>
            <div class="stat-item-base">${baseVal}</div>
            <div class="stat-item-eq">${eqStr}</div>
            <div class="stat-item-sum">${total}</div>
        </div>`;
    });
    leftHtml += `</div>`;

    // ZMIANA: Funkcja teraz dodaje procenty w nawiasie dla odporności
    const createCleanGroupWithIcons = (title, statsObj, isResistance = false) => {
        let html = "";
        Object.entries(statsObj).forEach(([k,v]) => {
            let name = k.replace('Pancerz ','').replace('Odporność ','');
            let iconPath = STAT_ICONS[k].includes('/') ? `/static/${STAT_ICONS[k]}` : `/static/stats/${STAT_ICONS[k]}`;
            let vStr = v > 0 ? `+${v}` : v;
            
            let percentageHtml = "";
            if(isResistance) {
                let perc = calculateResistancePercentage(v);
                percentageHtml = ` <span style="color:#888; font-size:10px;">(${perc}%)</span>`;
            }
            
            html += `
            <div class="stat-item-clean">
                <div class="stat-item-name">
                    <img src="${iconPath}" onerror="this.style.display='none'">
                    <span style="color:#aaa;">${name}</span>
                </div>
                <div class="stat-item-sum" style="color:#fff;">${vStr}${percentageHtml}</div>
            </div>`; 
        });
        return `<div class="stat-group"><div class="stat-group-title">${title}</div>${html}</div>`;
    };

    leftHtml += createCleanGroupWithIcons("Obrony Fizyczne", defStats, false);
    leftHtml += createCleanGroupWithIcons("Odporności Magiczne", resStats, true); // True dla odporności

    let globalStatsPanel = document.getElementById('global-stats-panel');
    if(globalStatsPanel) globalStatsPanel.innerHTML = leftHtml;

    renderTopStatPanel();

    let rightHtml = ""; let hasMods = false;
    Object.entries(DRIFF_CATEGORIES).forEach(([k,g]) => {
        let catH = ""; g.roots.forEach(r => {
            const vals = dGroups[DRIFF_STATS_DATA[r].name];
            if(vals && vals.length > 0) {
                let p = vals.length>=12 ? 0.5 : DRIFF_PENALTY_TABLE[vals.length] || 1;
                let sum = vals.reduce((a,b)=>a+b,0) * p;
                let pText = p < 1 ? ` <span style="color:#d9534f; font-size:10px;">(Kara x${p})</span>` : "";
                catH += `<div class="stat-item"><span class="t-label">${DRIFF_STATS_DATA[r].name}${pText}</span><span class="val pos">${sum>0?'+':''}${sum.toFixed(2)}%</span></div>`;
            }
        });
        if(catH) { rightHtml += `<div class="stat-group"><div class="stat-group-title" style="color:${g.color}">${g.label}</div>${catH}</div>`; hasMods = true; }
    });
    if(Object.keys(oGroups).length > 0) {
        let oH = "";
        Object.entries(oGroups).forEach(([k,v]) => { oH += `<div class="stat-item"><span class="t-label">${k}</span><span class="val" style="color:#d000d0">+${v.toFixed(2)}%</span></div>`; });
        rightHtml += `<div class="stat-group"><div class="stat-group-title" style="color:#d000d0">Bonusy Orbów</div>${oH}</div>`; hasMods = true;
    }
    if(!hasMods) rightHtml = '<div style="color:#666; text-align:center; padding: 20px; font-size: 11px; text-transform: uppercase;">Brak włożonych drifów/orbów.</div>';
    
    let rightPanel = document.getElementById('global-mods-panel');
    if (rightPanel) rightPanel.innerHTML = rightHtml;
}

// ==========================================
// 14. AUTO-DRIFF WIZUALNY PLECAK 
// ==========================================
function openAutoDriffPanel() {
    lockedTooltipSlot = null; tooltip.classList.remove('locked'); hideTooltip();
    
    document.getElementById('auto-driff-overlay').classList.remove('hidden');
    if(!autoDriffSelected.tier) autoDriffSelected.tier = 'Magni';
    setAutoDriffTier(autoDriffSelected.tier); 
    renderAutoDriffTabs(); 
    renderInventory();
}

function setAutoDriffTier(tier) {
    autoDriffSelected.tier = tier;
    let themeColor = '#00adb5';
    if(tier === 'Arcy') themeColor = '#f44336'; 
    else if(tier === 'Magni') themeColor = '#ffaa00'; 
    else if(tier === 'Bi') themeColor = '#2196f3'; 
    else if(tier === 'Sub') themeColor = '#4caf50';

    document.querySelectorAll('.ad-tier-btn').forEach(b => {
        if(b.innerText.toLowerCase().includes(tier.toLowerCase())) { 
            b.classList.add('active'); 
        } 
        else { 
            b.classList.remove('active'); 
        }
    });

    document.documentElement.style.setProperty('--ad-theme', themeColor);
    document.querySelectorAll('.ad-tab.active').forEach(t => { t.style.borderBottomColor = themeColor; t.style.color = themeColor;});
    
    const pImg = document.getElementById('ad-preview-img'); if(pImg) pImg.style.borderColor = themeColor;
    document.getElementById('ad-lvl-display').style.color = themeColor;

    let maxLvl = (tier === "Arcy") ? 21 : (tier === "Magni") ? 16 : (tier === "Bi") ? 11 : 6;
    const s = document.getElementById('ad-lvl-slider'); s.max = maxLvl;
    if(autoDriffSelected.lvl > maxLvl) autoDriffSelected.lvl = maxLvl;
    s.value = autoDriffSelected.lvl; updateAutoDriffSlider(autoDriffSelected.lvl);

    renderAutoDriffTabs();
    renderAutoDriffGrid(activeAdCategory);

    if(autoDriffSelected.root) {
        let n1 = `${tier}drif_${autoDriffSelected.root}.png`; let n2 = `${tier}_${autoDriffSelected.root}.png`; let n3 = `${autoDriffSelected.root}.png`;
        pImg.src = `/static/driffy/${n1}`;
        pImg.onerror = function() { this.onerror = function() { this.onerror=null; this.src=`/static/driffy/${n3}`; }; this.src=`/static/driffy/${n2}`; };
    }
}

function renderAutoDriffTabs() {
    const cont = document.getElementById('ad-tabs'); cont.innerHTML = '';
    Object.entries(DRIFF_CATEGORIES).forEach(([key, cat], idx) => {
        let tab = document.createElement('button'); 
        tab.className = 'ad-tab';
        if(key === activeAdCategory) tab.classList.add('active');
        tab.innerText = cat.label;
        tab.onclick = () => {
            activeAdCategory = key;
            renderAutoDriffTabs();
            renderAutoDriffGrid(key);
        };
        cont.appendChild(tab);
    });
}

function renderAutoDriffGrid(catKey) {
    const grid = document.getElementById('ad-grid'); grid.innerHTML = '';
    if(autoDriffSelected.root && !DRIFF_CATEGORIES[catKey].roots.includes(autoDriffSelected.root)) { document.getElementById('ad-controls').classList.add('hidden'); }
    let t = autoDriffSelected.tier; 

    DRIFF_CATEGORIES[catKey].roots.forEach(root => {
        let img = document.createElement('img');
        let n1 = `${t}drif_${root}.png`; let n2 = `${t}_${root}.png`; let n3 = `${root}.png`;
        img.src = `/static/driffy/${n1}`;
        img.onerror = function() { this.onerror = function() { this.onerror=null; this.src=`/static/driffy/${n3}`; }; this.src=`/static/driffy/${n2}`; };
        
        img.className = 'ad-driff-icon'; img.setAttribute('data-root', root); 
        if(autoDriffSelected.root === root) { img.classList.add('selected'); }

        img.onclick = () => selectAutoDriffRoot(root, img);
        img.onmouseenter = (e) => showDriffTooltip(e, root, t, autoDriffSelected.lvl || 1);
        img.onmousemove = moveTooltip; img.onmouseleave = hideTooltip;
        grid.appendChild(img);
    });
}

function selectAutoDriffRoot(root, imgElement) {
    hideTooltip(); autoDriffSelected.root = root;
    document.querySelectorAll('.ad-driff-icon').forEach(img => { img.classList.remove('selected'); });
    if(imgElement) { imgElement.classList.add('selected'); }
    document.getElementById('ad-controls').classList.remove('hidden');
    document.getElementById('ad-preview-name').innerText = DRIFF_STATS_DATA[root].name;
    setAutoDriffTier(autoDriffSelected.tier);
}

function updateAutoDriffSlider(val) { autoDriffSelected.lvl = parseInt(val); document.getElementById('ad-lvl-display').innerText = val; }

function addDriffToInventory() {
    if(!autoDriffSelected.root) return;
    autoDriffSelected.buffer = document.getElementById('ad-buffer-check').checked;
    driffInventory.push({ id: Math.random(), root: autoDriffSelected.root, tier: autoDriffSelected.tier, lvl: autoDriffSelected.lvl, buffer: autoDriffSelected.buffer });
    document.getElementById('ad-buffer-check').checked = false; renderInventory();
}

function removeDriffFromInventory(id) { hideTooltip(); driffInventory = driffInventory.filter(d=>d.id!==id); renderInventory(); }

function renderInventory() {
    const list = document.getElementById('driff-inventory-list'); const badge = document.getElementById('ad-count-badge');
    list.innerHTML = ''; badge.innerText = `${driffInventory.length} szt.`;
    
    if(driffInventory.length === 0) { 
        list.innerHTML = '<div style="color:#444; text-align:center; height: 100%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; letter-spacing:1px;">TWÓJ PLECAK JEST PUSTY</div>'; 
        return; 
    }
    
    driffInventory.forEach(d => {
        const color = d.tier === "Arcy" ? "#f44336" : (d.tier === "Magni" ? "#ffaa00" : (d.tier === "Bi" ? "#2196f3" : "#4caf50"));
        const div = document.createElement('div'); div.className = 'ad-inv-item';
        let buffBadge = d.buffer ? '<span class="ad-buffer-badge">+ZAPAS</span>' : '';
        let n1 = `${d.tier}drif_${d.root}.png`; let n2 = `${d.tier}_${d.root}.png`; let n3 = `${d.root}.png`;
        
        div.innerHTML = `
            <div class="ad-inv-item-left">
                <img src="/static/driffy/${n1}" onerror="this.onerror=function(){this.onerror=null;this.src='/static/driffy/${n3}'}; this.src='/static/driffy/${n2}'" style="border-color: ${color}">
                <div class="ad-inv-details">
                    <div class="ad-inv-name">${DRIFF_STATS_DATA[d.root].name}</div>
                    <div class="ad-inv-sub">
                        <span style="color:${color};">${d.tier}drif</span> <span style="margin: 0 4px; opacity:0.5;">|</span> POZIOM: <span style="color:#fff;">${d.lvl}</span> ${buffBadge}
                    </div>
                </div>
            </div>
            <button class="ad-remove-btn" onclick="removeDriffFromInventory(${d.id})">✕</button>
        `;
        div.onmouseenter = (e) => showDriffTooltip(e, d.root, d.tier, d.lvl); div.onmousemove = moveTooltip; div.onmouseleave = hideTooltip;
        list.appendChild(div);
    });
}

function packDriffs() {
    if(driffInventory.length === 0) { customAlert("Plecaczek jest pusty!"); return; }
    const btn = document.getElementById('pack-btn'); btn.innerText = "🧠 OBLICZANIE..."; btn.style.backgroundColor = "#ffaa00"; btn.style.pointerEvents = "none";
    setTimeout(() => { runMonteCarlo(); btn.innerText = "UPCHNIJ W EKWIPUNKU"; btn.style.backgroundColor = "#00adb5"; btn.style.pointerEvents = "auto"; }, 100);
}

// Włączona optymalizacja Monte Carlo (Zmniejszono ITER do 5000)
function runMonteCarlo() {
    let toPackBase = driffInventory.map(d => { let act = getDriffCost(d.root, d.lvl); let sim = act; if(d.buffer) { let target = getNextPowerLvl(d.lvl, d.tier); if(target > d.lvl) sim = getDriffCost(d.root, target); } return { ...d, actual: act, simulated: sim }; });
    const getSim = (tEq, sId) => { let t = 0; tEq[sId].driffs.forEach(d => { if(d) { let c = getDriffCost(d.root, d.lvl); if(d.buffer && !d.locked) { let target = getNextPowerLvl(d.lvl, d.tier); if(target>d.lvl) c = getDriffCost(d.root, target); } t += c; } }); return t; };
    let best = null; let minU = Infinity; let bestU = []; 
    const ITER = 5000; // Optymalizacja wydajności!
    
    for(let i=0; i<ITER; i++) {
        let tEq = {}; Object.keys(equipment).forEach(k => tEq[k] = {...equipment[k], driffs: equipment[k].driffs.map(d => d && d.locked ? {...d} : null)});
        let p = [...toPackBase]; if(i===0) p.sort((a,b)=>b.simulated - a.simulated); else p.sort(()=>Math.random()-0.5);
        let un = [];
        
        for(let item of p) {
            let valid = []; Object.entries(tEq).forEach(([sId, eq]) => {
                let r = parseInt(eq.data.rank)||1;
                if((item.tier==="Arcy" && r<10) || (item.tier==="Magni" && r<7) || (item.tier==="Bi" && r<4)) return;
                let cap = (eq.data.cap||0) + STARS_CONFIG[eq.star].cap; let left = cap - getSim(tEq, sId);
                if(left >= item.simulated && !eq.driffs.some(d=>d&&d.root===item.root)) { let idx = eq.driffs.findIndex(d=>d===null); if(idx!==-1) valid.push({sId, idx, left}); }
            });
            if(valid.length===0) { un.push(item); continue; }
            valid.sort((a,b)=>a.left - b.left); let s = valid[0]; tEq[s.sId].driffs[s.idx] = {tier:item.tier, root:item.root, lvl:item.lvl, buffer:item.buffer, locked:false};
        }
        if(un.length < minU) { minU = un.length; best = tEq; bestU = un; if(minU===0) break; }
    }
    
    Object.keys(equipment).forEach(k => { equipment[k].driffs = best[k].driffs; renderSlot(k); });
    document.getElementById('auto-driff-overlay').classList.add('hidden'); generateReport(bestU);
}

function generateReport(unplaced) {
    let html = unplaced.length > 0 ? `<div style="color:#d9534f; margin-bottom:10px; font-weight:bold;">Brak miejsca dla ${unplaced.length} drifów.</div>` : `<div style="color:#00ff66; margin-bottom:10px; font-weight:bold;">Sukces! Optymalizacja zakończona.</div>`;
    Object.entries(equipment).forEach(([sId, eq]) => {
        if(!eq) return;
        const total = (eq.data.cap||0) + STARS_CONFIG[eq.star].cap;
        let uPhys = 0; let uSim = 0; let bDetails = [];
        eq.driffs.forEach(d => {
            if(d) {
                let c = getDriffCost(d.root, d.lvl); uPhys += c;
                if(d.buffer && !d.locked) {
                    let next = getNextPowerLvl(d.lvl, d.tier);
                    if(next>d.lvl) { let nC = getDriffCost(d.root, next); uSim += nC; bDetails.push(`🔹 <span style="color:#fff;">${d.tier}drif ${DRIFF_STATS_DATA[d.root].name}</span>: Zapas pod <b>${next} poz.</b> (+<span style="color:#00ff66;">${nC-c}</span>)`); }
                    else uSim += c;
                } else uSim += c;
            }
        });
        const remS = total - uSim;
        html += `<div style="margin-bottom:10px; background:#1a1a1a; padding:10px; border-radius:4px; border-left:4px solid ${remS<0?'#d9534f':'#00ff66'};">`;
        html += `<strong style="color:#00adb5;">${slotsConfig.find(s=>s.id===sId).label} ("${eq.item}")</strong><br>`;
        html += `<span style="font-size:12px; color:#aaa;">Zajęte: <span style="color:#fff;">${uPhys}/${total}</span> | Wolne z gwarancją zapasu: <strong style="color:${remS<0?'#d9534f':'#00ff66'};">${remS}</strong></span>`;
        if(bDetails.length > 0) html += `<div style="font-size:11px; color:#aaa; margin-top:8px; padding-top:8px; border-top:1px dashed #333; line-height:1.4;">${bDetails.join("<br>")}</div>`;
        html += `</div>`;
    });
    document.getElementById('report-content').innerHTML = html;
    document.getElementById('report-overlay').classList.remove('hidden');
}