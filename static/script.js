// ==========================================
// 1. KONFIGURACJA GWIAZDEK I KAR DRIFFÓW
// ==========================================

const STARS_CONFIG = {
    "0":  { type: "bronze", count: 0, stats: 0, weapon: 0, upgrade: 0, orb: 0, driff: 0, cap: 0 },
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

// ==========================================
// 2. BAZA DANYCH ORBÓW
// ==========================================

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

// ==========================================
// 3. KATEGORIE I STATYSTYKI DRIFFÓW
// ==========================================

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
    { id: "head", label: "Hełm", allowedOrbs: ["def"] },
    { id: "neck", label: "Naszyjnik", allowedOrbs: ["uni"] },
    { id: "gloves", label: "Rękawice", allowedOrbs: ["off"] },
    { id: "ring1", label: "Pierścień 1", allowedOrbs: ["uni"] },
    { id: "ring2", label: "Pierścień 2", allowedOrbs: ["uni"] },
    { id: "bracers", label: "Karwasze", allowedOrbs: ["off", "def"] },
    { id: "boots", label: "Buty", allowedOrbs: ["def"] },
    { id: "weapon", label: "Broń", allowedOrbs: ["off"] },
    { id: "legs", label: "Spodnie", allowedOrbs: ["def"] },
    { id: "waist", label: "Pas", allowedOrbs: ["off"] },
    { id: "body", label: "Zbroja", allowedOrbs: ["def"] },
    { id: "cape", label: "Peleryna", allowedOrbs: ["off"] }
];

// ==========================================
// 4. ZMIENNE STANU APLIKACJI
// ==========================================

let equipment = {};
let overlayContext = null; 
let selectedItemData = null;
let driffInventory = [];
let autoDriffSelected = { root: null, tier: 'Magni', lvl: 1, buffer: false }; // Stan dla plecaka

// ==========================================
// 5. INICJALIZACJA KOŁA
// ==========================================

const tooltip = document.getElementById('tooltip');
const wheel = document.getElementById('wheel');

slotsConfig.forEach((slot, index) => {
    const angle = (index * 30 - 90) * (Math.PI / 180);
    const x = 325 + 260 * Math.cos(angle) - 45;
    const y = 325 + 260 * Math.sin(angle) - 45;
    
    const div = document.createElement('div');
    div.className = 'slot'; div.id = `slot-${slot.id}`;
    div.style.left = `${x}px`; div.style.top = `${y}px`;
    div.innerHTML = `<span style="position:absolute; width:100%; bottom:5px; text-align:center; font-size:9px; color:#555">${slot.label}</span>`;
    
    div.onclick = (e) => {
        if(e.target.closest('.driff-socket') || e.target.closest('.star-icon') || e.target.closest('.orb-socket')) return;
        openItemList(slot.id, slot.label);
    };
    div.onmouseenter = (e) => showTooltip(e, slot.id);
    div.onmousemove = (e) => moveTooltip(e);
    div.onmouseleave = () => hideTooltip();
    wheel.appendChild(div);
});

// ==========================================
// 6. ZARZĄDZANIE BUILDAMI (localStorage)
// ==========================================

function resetBuild() {
    if(!confirm("Czy na pewno chcesz wyzerować cały ekwipunek?")) return;
    equipment = {};
    slotsConfig.forEach(slot => {
        const slotDiv = document.getElementById(`slot-${slot.id}`);
        slotDiv.classList.remove('equipped');
        slotDiv.style.borderColor = "#333";
        slotDiv.style.boxShadow = "none";
        slotDiv.innerHTML = `<span style="position:absolute; width:100%; bottom:5px; text-align:center; font-size:9px; color:#555">${slot.label}</span>`;
    });
    document.getElementById('item-grid').innerHTML = '<p style="color:#555; padding:10px; grid-column:1/-1;">Kliknij element na kole...</p>';
    document.getElementById('panel-title').innerText = "WYBIERZ SLOT";
}

function saveBuild() {
    if(Object.keys(equipment).length === 0) { alert("Twój ekwipunek jest pusty!"); return; }
    let buildName = prompt("Podaj nazwę dla tego zapisu (np. 'Build na Bossy'):");
    if(!buildName) return;
    let savedBuilds = JSON.parse(localStorage.getItem('br_builds') || '{}');
    savedBuilds[buildName] = equipment;
    localStorage.setItem('br_builds', JSON.stringify(savedBuilds));
    alert(`Pomyślnie zapisano build: "${buildName}"`);
}

function loadBuild() {
    let savedBuilds = JSON.parse(localStorage.getItem('br_builds') || '{}');
    let buildNames = Object.keys(savedBuilds);
    if(buildNames.length === 0) { alert("Brak zapisanych buildów w pamięci."); return; }
    let buildName = prompt("Wpisz nazwę buildu do wczytania:\nDostępne: \n- " + buildNames.join("\n- "));
    if(!buildName || !savedBuilds[buildName]) return;
    
    equipment = savedBuilds[buildName];
    slotsConfig.forEach(slot => {
        const slotDiv = document.getElementById(`slot-${slot.id}`);
        if(equipment[slot.id]) {
            slotDiv.classList.add('equipped');
            renderSlot(slot.id);
        } else {
            slotDiv.classList.remove('equipped');
            slotDiv.style.borderColor = "#333";
            slotDiv.style.boxShadow = "none";
            slotDiv.innerHTML = `<span style="position:absolute; width:100%; bottom:5px; text-align:center; font-size:9px; color:#555">${slot.label}</span>`;
        }
    });
}

// ==========================================
// 7. WYCENA I PROGI DRIFFÓW
// ==========================================

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

function getUsedCapacity(slotId) {
    const eq = equipment[slotId];
    if(!eq) return 0;
    let totalCost = 0;
    eq.driffs.forEach((d, i) => {
        if(d && (overlayContext && overlayContext.mode !== 'driff' || (overlayContext && i !== overlayContext.index) || !overlayContext)) {
            totalCost += getDriffCost(d.root, d.lvl);
        }
    });
    return totalCost;
} 

// ==========================================
// 8. LOGIKA PANELE (FETCH Z APP.PY)
// ==========================================

async function openItemList(slotId, label) {
    document.getElementById('panel-title').innerText = `WYBIERZ: ${label}`;
    const grid = document.getElementById('item-grid');
    grid.innerHTML = '<p style="color:#666; padding:10px; grid-column:1/-1;">Wczytywanie...</p>';
    
    try {
        const response = await fetch(`/get_items/${slotId}`);
        const items = await response.json();
        grid.innerHTML = '';
        
        if(Object.keys(items).length === 0) {
            grid.innerHTML = '<p style="color:#666; padding:10px; grid-column:1/-1;">Brak przedmiotów w bazie.</p>';
            return;
        }

        const tiers = { "Tier I (Rangi I - III)": [], "Tier II (Rangi IV - VI)": [], "Tier III (Rangi VII - IX)": [], "Tier IV (Rangi X - XII)": [], "Inne": [] };

        Object.entries(items).forEach(([name, data]) => {
            const rank = parseInt(data.rank) || 0; 
            if (rank >= 1 && rank <= 3) tiers["Tier I (Rangi I - III)"].push({name, data});
            else if (rank >= 4 && rank <= 6) tiers["Tier II (Rangi IV - VI)"].push({name, data});
            else if (rank >= 7 && rank <= 9) tiers["Tier III (Rangi VII - IX)"].push({name, data});
            else if (rank >= 10 && rank <= 12) tiers["Tier IV (Rangi X - XII)"].push({name, data});
            else tiers["Inne"].push({name, data});
        });

        for (const [tierName, tierItems] of Object.entries(tiers)) {
            if (tierItems.length === 0) continue; 
            const header = document.createElement('div');
            header.style = "grid-column: 1 / -1; color: #00adb5; border-bottom: 1px dashed #333; padding-bottom: 5px; margin-top: 15px; font-weight: bold; font-size: 15px;";
            header.innerText = tierName;
            grid.appendChild(header);

            tierItems.sort((a, b) => {
                let rankA = parseInt(a.data.rank) || 0;
                let rankB = parseInt(b.data.rank) || 0;
                if (rankA !== rankB) return rankA - rankB;
                let isEpicA = a.data.fixed_driffs !== undefined ? 1 : 0;
                let isEpicB = b.data.fixed_driffs !== undefined ? 1 : 0;
                return isEpicA - isEpicB;
            }).forEach(item => {
                const d = document.createElement('div'); d.className = 'grid-item';
                if (item.data.fixed_driffs !== undefined) d.style.borderColor = "rgba(255, 170, 0, 0.4)";
                let folder = item.data.folder === "epik" ? "/static/epik" : "/static/rary";
                d.innerHTML = `<img src="${folder}/${item.data.img}">`;
                d.onclick = () => equipItem(slotId, item.name, item.data);
                d.onmouseenter = (e) => showGridTooltip(e, item.name, item.data);
                d.onmousemove = (e) => moveTooltip(e);
                d.onmouseleave = () => hideTooltip();
                grid.appendChild(d);
            });
        }
    } catch (e) {
        grid.innerHTML = '<p style="color:red; padding:10px; grid-column:1/-1;">Błąd połączenia z serwerem.</p>';
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
    equipment[slotId] = { item: name, data: data, star: "0", driffs: driffsArray, orb: null };
    document.getElementById(`slot-${slotId}`).classList.add('equipped');
    renderSlot(slotId);
}

// ==========================================
// 9. RENDEROWANIE SLOTU I ORBÓW
// ==========================================

function renderSlot(slotId) {
    const slotDiv = document.getElementById(`slot-${slotId}`);
    const eq = equipment[slotId];
    let folder = eq.data.folder === "epik" ? "/static/epik" : "/static/rary";
    let html = `<img src="${folder}/${eq.data.img}" class="item-img">`;
    
    let orbHtml = "";
    if(eq.orb) {
        const names = getOrbFilename(eq.orb.tier, eq.orb.root);
        orbHtml = `<img src="/static/orbs/${names.withAp}" onerror="this.src='/static/orbs/${names.simple}'">`;
    }
    html += `<div class="orb-socket" onclick="event.stopPropagation(); openOverlay('orb', '${slotId}', 0)">${orbHtml}</div>`;
    html += `<div class="star-bar"><div class="star-icon" onclick="setStar('${slotId}','0')" style="color:#d9534f; display:flex; align-items:center; font-weight:bold;">✕</div>`;
    ["B1","B2","B3","S1","S2","S3","G1","G2","G3"].forEach(sKey => {
        const c = STARS_CONFIG[sKey];
        html += `<img src="/static/stars/${c.type}.png" class="star-icon ${eq.star===sKey?'active':''}" onclick="event.stopPropagation(); setStar('${slotId}','${sKey}')">`;
    });
    html += `</div><div class="driff-container">`;
    eq.driffs.forEach((driff, i) => {
        let img = ""; let style = "";
        if(driff) {
            img = `<img src="/static/driffy/${driff.tier}drif_${driff.root}.png" onerror="this.src='/static/driffy/${driff.root}.png'">`;
            if(driff.locked) style = "border-color: #ffaa00; box-shadow: 0 0 5px #ffaa00;";
        }
        html += `<div class="driff-socket" style="${style}" onclick="event.stopPropagation(); openOverlay('driff', '${slotId}', ${i})">${img}</div>`;
    });
    slotDiv.innerHTML = html + `</div>`;
    slotDiv.style.borderColor = eq.data.fixed_driffs ? "#ffaa00" : "#00adb5";
    slotDiv.style.boxShadow = eq.data.fixed_driffs ? "0 0 10px rgba(255,170,0,0.5)" : "none";
}

function getOrbFilename(tier, root) {
    const n = ORB_DATA[root].name;
    return { withAp: `${tier}orb_${n}.png`, simple: `${root}.png` };
}

function setStar(slotId, key) { if(equipment[slotId]) { equipment[slotId].star = key; renderSlot(slotId); } }

// ==========================================
// 10. SYSTEM TOOLTIPÓW
// ==========================================

function hideTooltip() { tooltip.style.display = 'none'; }
function moveTooltip(e) {
    let x = e.clientX + 20; let y = e.clientY + 20;
    if(y + tooltip.offsetHeight > window.innerHeight) y = window.innerHeight - tooltip.offsetHeight - 15;
    if(x + tooltip.offsetWidth > window.innerWidth) x = window.innerWidth - tooltip.offsetWidth - 15;
    if (y < 10) y = 10;
    tooltip.style.left = x + 'px'; tooltip.style.top = y + 'px';
}

function showGridTooltip(e, name, data) {
    let isEpic = data.fixed_driffs !== undefined;
    let html = `<div class="${isEpic?'t-epic':'t-cyan'}">"${name}"</div>`;
    html += `<div class="t-row" style="border-bottom:1px solid #333; padding-bottom:5px; margin-bottom:8px;"><span class="t-label">Baza:</span><span class="t-val">Pojemność: ${data.cap||0} | Sloty: ${data.slots||1}</span></div>`;
    
    if(isEpic) {
        data.fixed_driffs.forEach(r => {
            const s = DRIFF_STATS_DATA[r];
            if(s) html += `<div style="margin-top:2px;"><span style="color:#ffaa00; font-size:12px;">🔒 Magni ${s.name}</span><div class="t-row"><span class="t-blue">+${s.base[2].toFixed(2)}${s.unit}</span></div></div>`;
        });
    }
    if(data.stats) {
        html += `<div style="margin-top:10px; border-top:1px dashed #333; padding-top:8px;"></div>`;
        Object.entries(data.stats).forEach(([k,v]) => { if(!k.includes("Wzmocnienie")) html += `<div class="t-row"><span class="t-label">${k}:</span><span class="t-val">${v}</span></div>`; });
    }
    tooltip.innerHTML = html; tooltip.style.display = 'block'; moveTooltip(e);
}

function showTooltip(e, slotId) {
    if(!document.getElementById('driff-overlay').classList.contains('hidden')) return;
    const eq = equipment[slotId]; if(!eq) return;
    
    const conf = STARS_CONFIG[eq.star]; const totalCap = (eq.data.cap||0) + conf.cap;
    let used = 0; eq.driffs.forEach(d => {if(d) used += getDriffCost(d.root, d.lvl)});
    let html = `<div class="${eq.data.fixed_driffs?'t-epic':'t-cyan'}">"${eq.item}"</div>`;
    html += `<div class="t-row" style="border-bottom:1px solid #333; padding-bottom:5px; margin-bottom:8px;"><span class="t-label">Pojemność:</span><span class="t-val" style="color:${used>totalCap?'#d9534f':'#00ff66'}">${used}/${totalCap}</span></div>`;
    
    if(eq.orb) {
        const s = ORB_DATA[eq.orb.root];
        if(s) {
            let oBonus = conf.orb + (eq.data.stats && eq.data.stats["Wzmocnienie orbów"] ? parseInt(eq.data.stats["Wzmocnienie orbów"]) : 0);
            let bArr = s[eq.orb.tier.toLowerCase()] || [0];
            let fVal = bArr[Math.min(eq.orb.lvl-1, bArr.length-1)] * (1 + oBonus/100);
            html += `<div style="margin-top:2px; border-bottom:1px dashed #333; padding-bottom:4px; margin-bottom:4px;"><span style="color:#d000d0; font-size:12px;">${eq.orb.tier}orb ${s.name}</span><div class="t-row"><span class="t-purple">+${fVal.toFixed(2)}${s.unit}</span></div></div>`;
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
            html += `<div style="margin-top:2px;"><span style="color:#ffaa00; font-size:12px;">${driff.locked?'🔒 ':''}${driff.tier}drif ${stats.name} (Poz. ${driff.lvl})${bufferVisual}</span><div class="t-row"><span class="t-blue">${finalVal>0?'+':''}${finalVal.toFixed(2)}${stats.unit}</span></div></div>`;
        }
    });

    if(eq.data.stats) {
        html += `<div style="margin-top:10px; border-top:1px dashed #333; padding-top:8px;"></div>`;
        Object.entries(eq.data.stats).forEach(([k,v]) => { 
            if(k.includes("Wzmocnienie")) return;
            let bVal = parseInt(v.toString().replace('+','').replace(' ',''));
            if(isNaN(bVal)) { html += `<div class="t-row"><span class="t-label">${k}:</span><span class="t-val">${v}</span></div>`; }
            else {
                let perc = (k === "Obrażenia") ? conf.weapon : conf.stats;
                let bonus = Math.floor(bVal * (perc/100));
                let total = bVal + bonus;
                html += `<div class="t-row"><span class="t-label">${k}:</span><span class="t-val">${total>0?'+':''}${total}</span>${bonus>0?`<span class="t-green">(+${bonus})</span>`:''}</div>`;
            }
        });
        if(conf.upgrade>0) html += `<div class="t-row"><span class="t-blue">Wzm. ulepszeń:</span><span class="t-blue">+${conf.upgrade}%</span></div>`;
        if(conf.orb>0) html += `<div class="t-row"><span class="t-blue">Wzm. orbów:</span><span class="t-blue">+${conf.orb}%</span></div>`;
        let tD = conf.driff + (eq.data.stats["Wzmocnienie drifów"] ? parseInt(eq.data.stats["Wzmocnienie drifów"]) : 0);
        if(tD>0) html += `<div class="t-row"><span class="t-blue">Wzm. drifów:</span><span class="t-blue">+${tD}%</span></div>`;
    }
    tooltip.innerHTML = html; tooltip.style.display = 'block'; moveTooltip(e);
}

function showGlobalTooltip(e) {
    if(!document.getElementById('driff-overlay').classList.contains('hidden') || !document.getElementById('auto-driff-overlay').classList.contains('hidden')) return;
    
    let dGroups = {}; let oGroups = {};
    Object.values(equipment).forEach(eq => {
        if(!eq) return;
        const conf = STARS_CONFIG[eq.star];
        
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

    let html = `<div class="t-gold" style="border-bottom:1px solid #333; padding-bottom:5px; margin-bottom:10px;">SPIS MODYFIKATORÓW</div>`;
    let hasMods = false;

    Object.entries(DRIFF_CATEGORIES).forEach(([k,g]) => {
        let catH = ""; g.roots.forEach(r => {
            const vals = dGroups[DRIFF_STATS_DATA[r].name];
            if(vals && vals.length > 0) {
                let p = vals.length>=12 ? 0.5 : DRIFF_PENALTY_TABLE[vals.length] || 1;
                let sum = vals.reduce((a,b)=>a+b,0) * p;
                let pText = p < 1 ? ` <span style="color:#d9534f; font-size:10px;">(Kara)</span>` : "";
                catH += `<div class="t-row"><span class="t-label">${DRIFF_STATS_DATA[r].name}${pText}:</span><span class="t-blue">${sum>0?'+':''}${sum.toFixed(2)}%</span></div>`;
            }
        });
        if(catH) { html += `<div class="t-header" style="color:${g.color}">${g.label}</div>` + catH; hasMods = true; }
    });

    if(Object.keys(oGroups).length > 0) {
        html += `<div class="t-header" style="color:#d000d0">Bonusy Orbów</div>`;
        Object.entries(oGroups).forEach(([k,v]) => { html += `<div class="t-row"><span class="t-label">${k}:</span><span class="t-purple">+${v.toFixed(2)}%</span></div>`; });
        hasMods = true;
    }

    if(!hasMods) html += `<div style="color:#666; text-align:center; font-style:italic;">Brak aktywnych modyfikatorów</div>`;
    tooltip.innerHTML = html; tooltip.style.display = 'block'; moveTooltip(e);
}

// NOWY TOOLTIP DLA GRIDU DRIFÓW
function showDriffTooltip(e, root, tier = 'Magni', lvl = 1) {
    const stats = DRIFF_STATS_DATA[root];
    if(!stats) return;

    let tierIdx = TIER_MAP[tier] || 0;
    let baseVal = stats.base[tierIdx] + ((lvl - 1) * stats.inc[tierIdx]);
    let color = tier === "Arcy" ? "#d32f2f" : (tier === "Magni" ? "#f57c00" : (tier === "Bi" ? "#1976d2" : "#388e3c"));

    let html = `<div style="color:${color}; font-weight:bold; font-size:16px; margin-bottom:5px; text-align:center; text-shadow:0 0 5px ${color}80;">${tier}drif ${stats.name}</div>`;
    html += `<div style="color:#aaa; font-size:12px; text-align:center; border-bottom:1px solid #333; padding-bottom:8px; margin-bottom:8px;">Poziom statystyk: ${lvl}</div>`;
    html += `<div class="t-row"><span class="t-label">${stats.name}:</span> <span class="t-blue">${baseVal>0?'+':''}${baseVal.toFixed(2)}${stats.unit}</span></div>`;
    html += `<div class="t-row" style="margin-top:5px;"><span class="t-label">Koszt w sprzęcie:</span> <span class="t-val">${getDriffCost(root, lvl)}</span></div>`;

    tooltip.innerHTML = html;
    tooltip.style.display = 'block';
    moveTooltip(e);
}

// ==========================================
// 11. SYSTEM OVERLAY DRIFFY / ORBY (POJEDYNCZE)
// ==========================================

function openOverlay(mode, slotId, index) {
    overlayContext = { mode, slotId, index };
    const eq = equipment[slotId];
    document.getElementById('driff-overlay').classList.remove('hidden');
    if(mode === 'driff' && eq.driffs[index] && eq.driffs[index].locked) {
        selectItemOption(mode, eq.driffs[index].tier, eq.driffs[index].root, `${eq.driffs[index].tier}drif_${eq.driffs[index].root}.png`);
    } else {
        document.getElementById('driff-list').style.display = 'none';
        document.getElementById('driff-controls').style.display = 'none';
        const catC = document.getElementById('driff-categories');
        catC.style.display = 'grid'; catC.innerHTML = '';
        document.getElementById('overlay-title').innerText = mode === 'orb' ? "WYBIERZ ORBA" : "WYBIERZ DRIFFA";
        if(mode === 'orb') {
            const sc = slotsConfig.find(s=>s.id===slotId);
            const allowed = sc ? sc.allowedOrbs : [];
            if(allowed.includes("off")) createCatBtn("Ofensywne", "#f44336", () => showItems("orb","off"));
            if(allowed.includes("def")) createCatBtn("Defensywne", "#2196f3", () => showItems("orb","def"));
            if(allowed.includes("uni")) createCatBtn("Uniwersalne", "#4caf50", () => showItems("orb","uni"));
        } else {
            Object.entries(DRIFF_CATEGORIES).forEach(([k,c]) => createCatBtn(c.label, c.color, () => showItems("driff",k)));
        }
    }
}

function createCatBtn(l,c,clk) {
    const b = document.createElement('div'); b.className = 'cat-btn'; b.style.borderColor = c; b.style.color = c; b.innerText = l; b.onclick = clk;
    document.getElementById('driff-categories').appendChild(b);
}

function showItems(mode, catK) {
    document.getElementById('driff-categories').style.display = 'none';
    const listC = document.getElementById('driff-list'); listC.style.display = 'grid'; listC.innerHTML = '';
    const eq = equipment[overlayContext.slotId]; const rank = parseInt(eq.data.rank) || 1;
    let allowedT = ["Sub"]; if(rank>=4) allowedT.push("Bi"); if(rank>=7) allowedT.push("Magni"); if(rank>=10) allowedT.push("Arcy");
    allowedT.reverse();
    let roots = (mode === 'driff') ? DRIFF_CATEGORIES[catK].roots : Object.entries(ORB_DATA).filter(([k,v])=>v.type===catK).map(([k,v])=>k);
    
    allowedT.forEach(t => {
        const h = document.createElement('h4'); h.innerText = `${t}${mode==='orb'?'orby':'drify'}`; h.style.gridColumn = "1/-1"; h.style.color="#00adb5"; h.style.borderBottom="1px solid #333";
        listC.appendChild(h);
        roots.forEach(r => {
            const btn = document.createElement('div'); btn.className = 'driff-option';
            if(mode==='driff' && eq.driffs.some((d,i)=>i!==overlayContext.index && d && d.root===r)) btn.classList.add('disabled');
            const folder = mode==='orb' ? '/static/orbs' : '/static/driffy';
            const fname = mode==='orb' ? getOrbFilename(t,r).withAp : `${t}drif_${r}.png`;
            btn.innerHTML = `<img src="${folder}/${fname}" onerror="this.src='${folder}/${r}.png'">`;
            
            if(!btn.classList.contains('disabled')) {
                btn.onclick = () => selectItemOption(mode,t,r,fname);
                if(mode==='driff') {
                    btn.onmouseenter = (e) => showDriffTooltip(e, r, t, 1);
                    btn.onmousemove = moveTooltip;
                    btn.onmouseleave = hideTooltip;
                }
            }
            listC.appendChild(btn);
        });
    });
}

function selectItemOption(mode, tier, root, filename) {
    hideTooltip();
    selectedItemData = { tier, root, filename, lvl: 1, mode };
    const eq = equipment[overlayContext.slotId];
    if(mode==='driff' && eq.driffs[overlayContext.index]) { selectedItemData.lvl = eq.driffs[overlayContext.index].lvl; selectedItemData.locked = eq.driffs[overlayContext.index].locked; }
    document.getElementById('driff-list').style.display = 'none'; document.getElementById('driff-controls').style.display = 'block';
    document.getElementById('preview-img').src = (mode==='orb'?'/static/orbs/':'/static/driffy/') + filename;
    document.getElementById('preview-name').innerText = `${tier}${mode==='orb'?'orb':'drif'} ${(mode==='orb'?ORB_DATA:DRIFF_STATS_DATA)[root].name}`;
    const s = document.getElementById('lvl-slider');
    s.max = (mode==='driff') ? (tier==="Arcy"?21:tier==="Magni"?16:tier==="Bi"?11:6) : (tier==="Sub"?1:3);
    s.value = selectedItemData.lvl; updateSliderVal(s.value);
}

function updateSliderVal(val) {
    const disp = document.getElementById('lvl-display'); const confB = document.querySelector('.btn-confirm');
    disp.innerText = val; selectedItemData.lvl = parseInt(val);
    if(selectedItemData.mode === 'driff') {
        const cost = getDriffCost(selectedItemData.root, val); const used = getUsedCapacity(overlayContext.slotId);
        const total = (equipment[overlayContext.slotId].data.cap||0) + STARS_CONFIG[equipment[overlayContext.slotId].star].cap;
        document.getElementById('cap-info').innerHTML = `Pojemność: <span style="color:${(used+cost)>total?'#d9534f':'#00ff66'}">${used+cost}/${total}</span> (Moc wybranego: ${cost})`;
        confB.disabled = (used+cost) > total; confB.style.opacity = confB.disabled ? 0.5 : 1;
    } else {
        document.getElementById('cap-info').innerHTML = '';
        confB.disabled = false; confB.style.opacity = 1;
    }
}

function applySelection() {
    const {slotId, index, mode} = overlayContext;
    if(mode==='orb') equipment[slotId].orb = {...selectedItemData}; else equipment[slotId].driffs[index] = {...selectedItemData};
    renderSlot(slotId); closeOverlay();
}

function removeSelection() {
    const {slotId, index, mode} = overlayContext;
    if(mode==='driff' && equipment[slotId].driffs[index] && equipment[slotId].driffs[index].locked) return;
    if(mode==='orb') equipment[slotId].orb = null; else equipment[slotId].driffs[index] = null;
    renderSlot(slotId); closeOverlay();
}

function closeOverlay() { document.getElementById('driff-overlay').classList.add('hidden'); overlayContext = null; hideTooltip(); }

// ==========================================
// 12. NOWY MÓZG: WIZUALNY PLECAK AUTO-DRIFFÓW
// ==========================================

function openAutoDriffPanel() {
    document.getElementById('auto-driff-overlay').classList.remove('hidden');
    renderAutoDriffTabs();
    renderInventory();
}

function renderAutoDriffTabs() {
    const container = document.getElementById('ad-tabs');
    container.innerHTML = '';
    
    Object.entries(DRIFF_CATEGORIES).forEach(([key, cat], idx) => {
        let tab = document.createElement('div');
        tab.className = 'ad-tab';
        if(idx === 0) tab.classList.add('active');
        tab.innerText = cat.label;
        tab.onclick = () => {
            document.querySelectorAll('.ad-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderAutoDriffGrid(key);
        };
        container.appendChild(tab);
        if(idx === 0) renderAutoDriffGrid(key);
    });
}

function renderAutoDriffGrid(catKey) {
    const grid = document.getElementById('ad-grid');
    grid.innerHTML = '';
    document.getElementById('ad-controls').classList.add('hidden'); // Ukryj kontrolki przy zmianie karty
    autoDriffSelected.root = null;

    DRIFF_CATEGORIES[catKey].roots.forEach(root => {
        let img = document.createElement('img');
        img.src = `/static/driffy/${root}.png`;
        img.className = 'ad-driff-icon';
        
        img.onclick = () => selectAutoDriffRoot(root);
        img.onmouseenter = (e) => showDriffTooltip(e, root, autoDriffSelected.tier || 'Magni', 1);
        img.onmousemove = moveTooltip;
        img.onmouseleave = hideTooltip;
        
        grid.appendChild(img);
    });
}

function selectAutoDriffRoot(root) {
    hideTooltip();
    autoDriffSelected.root = root;
    
    document.querySelectorAll('.ad-driff-icon').forEach(img => {
        if(img.src.includes(`/${root}.png`)) img.classList.add('selected');
        else img.classList.remove('selected');
    });

    document.getElementById('ad-controls').classList.remove('hidden');
    document.getElementById('ad-preview-name').innerText = DRIFF_STATS_DATA[root].name;
    
    setAutoDriffTier(autoDriffSelected.tier);
}

function setAutoDriffTier(tier) {
    autoDriffSelected.tier = tier;
    
    // Obsługa kolorów przycisków
    const btns = document.querySelectorAll('.ad-rank-btn');
    btns.forEach(b => {
        if(b.innerText.trim() === tier) {
            b.classList.add('active');
            if(tier === 'Arcy') b.style.backgroundColor = '#d32f2f';
            else if(tier === 'Magni') b.style.backgroundColor = '#f57c00';
            else if(tier === 'Bi') b.style.backgroundColor = '#1976d2';
            else b.style.backgroundColor = '#388e3c';
            b.style.color = '#fff'; b.style.borderColor = b.style.backgroundColor;
        } else {
            b.classList.remove('active');
            b.style.backgroundColor = ''; b.style.color = ''; b.style.borderColor = '';
        }
    });

    // Podmiana ikony w podglądzie
    if(autoDriffSelected.root) {
        const previewImg = document.getElementById('ad-preview-img');
        previewImg.src = `/static/driffy/${tier}drif_${autoDriffSelected.root}.png`;
        previewImg.onerror = function() { this.src = `/static/driffy/${autoDriffSelected.root}.png`; };
    }

    // Limity paska poziomu
    let maxLvl = (tier === "Arcy") ? 21 : (tier === "Magni") ? 16 : (tier === "Bi") ? 11 : 6;
    const slider = document.getElementById('ad-lvl-slider');
    slider.max = maxLvl;
    if(autoDriffSelected.lvl > maxLvl) autoDriffSelected.lvl = maxLvl;
    slider.value = autoDriffSelected.lvl;
    updateAutoDriffSlider(autoDriffSelected.lvl);
}

function updateAutoDriffSlider(val) {
    autoDriffSelected.lvl = parseInt(val);
    document.getElementById('ad-lvl-display').innerText = val;
}

function addDriffToInventory() {
    if(!autoDriffSelected.root) return;
    autoDriffSelected.buffer = document.getElementById('ad-buffer-check').checked;
    
    driffInventory.push({
        id: Math.random(),
        root: autoDriffSelected.root,
        tier: autoDriffSelected.tier,
        lvl: autoDriffSelected.lvl,
        buffer: autoDriffSelected.buffer
    });
    
    // Opcjonalny reset checkboxa po dodaniu
    document.getElementById('ad-buffer-check').checked = false;
    renderInventory();
}

function removeDriffFromInventory(id) { 
    hideTooltip();
    driffInventory = driffInventory.filter(d=>d.id!==id); 
    renderInventory(); 
}

function renderInventory() {
    const list = document.getElementById('driff-inventory-list');
    const badge = document.getElementById('ad-count-badge');
    list.innerHTML = '';
    
    badge.innerText = `${driffInventory.length} szt.`;
    
    if(driffInventory.length === 0) {
        list.innerHTML = '<div style="color:#666; text-align:center; padding-top:40px;">Brak drifów w plecaku.<br>Wybierz z siatki powyżej i kliknij DODAJ.</div>';
        return;
    }

    driffInventory.forEach(d => {
        const color = d.tier === "Arcy" ? "#d32f2f" : (d.tier === "Magni" ? "#f57c00" : (d.tier === "Bi" ? "#1976d2" : "#388e3c"));
        
        const div = document.createElement('div');
        div.className = 'ad-inv-item';
        div.style.borderLeftColor = color;
        
        let buffBadge = d.buffer ? '<span style="background:#333;color:#00ff66;padding:2px 5px;border-radius:3px;margin-left:8px;font-size:10px;font-weight:bold;">+ZAPAS</span>' : '';
        
        div.innerHTML = `
            <div style="display:flex; align-items:center;">
                <img src="/static/driffy/${d.tier}drif_${d.root}.png" onerror="this.src='/static/driffy/${d.root}.png'">
                <div>
                    <div style="font-weight:bold; color:#fff; font-size:14px; text-transform:uppercase;">${DRIFF_STATS_DATA[d.root].name}</div>
                    <div style="font-size:12px; color:#aaa; margin-top:2px;">
                        <span style="color:${color}; font-weight:bold;">${d.tier}drif</span> <span style="margin:0 5px;">|</span> Poziom: <span style="color:#00adb5;font-weight:bold;">${d.lvl}</span>
                        ${buffBadge}
                    </div>
                </div>
            </div>
            <button onclick="removeDriffFromInventory(${d.id})" style="background:none;border:none;color:#d9534f;font-size:20px;cursor:pointer;font-weight:bold; transition:0.2s;" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'">✕</button>
        `;
        
        div.onmouseenter = (e) => showDriffTooltip(e, d.root, d.tier, d.lvl);
        div.onmousemove = moveTooltip;
        div.onmouseleave = hideTooltip;

        list.appendChild(div);
    });
}

function packDriffs() {
    if(driffInventory.length === 0) { alert("Plecaczek jest pusty! Dodaj najpierw drify."); return; }
    const btn = document.getElementById('pack-btn');
    btn.innerText = "🧠 OBLICZANIE 50 000 KOMBINACJI..."; 
    btn.style.backgroundColor = "#ffaa00"; 
    btn.style.pointerEvents = "none";
    
    setTimeout(() => { 
        runMonteCarlo(); 
        btn.innerText = "UPCHNIJ W EKWIPUNKU"; 
        btn.style.backgroundColor = "#00adb5"; 
        btn.style.pointerEvents = "auto";
    }, 100);
}

function runMonteCarlo() {
    let toPackBase = driffInventory.map(d => {
        let act = getDriffCost(d.root, d.lvl); let sim = act;
        if(d.buffer) { let target = getNextPowerLvl(d.lvl, d.tier); if(target > d.lvl) sim = getDriffCost(d.root, target); }
        return { ...d, actual: act, simulated: sim };
    });

    const getSim = (tEq, sId) => {
        let t = 0; tEq[sId].driffs.forEach(d => {
            if(d) {
                let c = getDriffCost(d.root, d.lvl);
                if(d.buffer && !d.locked) { let target = getNextPowerLvl(d.lvl, d.tier); if(target>d.lvl) c = getDriffCost(d.root, target); }
                t += c;
            }
        }); return t;
    };

    let best = null; let minU = Infinity; let bestU = [];
    const ITER = 50000;

    for(let i=0; i<ITER; i++) {
        let tEq = {}; Object.keys(equipment).forEach(k => tEq[k] = {...equipment[k], driffs: equipment[k].driffs.map(d => d && d.locked ? {...d} : null)});
        let p = [...toPackBase]; if(i===0) p.sort((a,b)=>b.simulated - a.simulated); else p.sort(()=>Math.random()-0.5);
        let un = [];
        for(let item of p) {
            let valid = []; Object.entries(tEq).forEach(([sId, eq]) => {
                let r = parseInt(eq.data.rank)||1;
                if((item.tier==="Arcy" && r<10) || (item.tier==="Magni" && r<7) || (item.tier==="Bi" && r<4)) return;
                let cap = (eq.data.cap||0) + STARS_CONFIG[eq.star].cap;
                let left = cap - getSim(tEq, sId);
                if(left >= item.simulated && !eq.driffs.some(d=>d&&d.root===item.root)) {
                    let idx = eq.driffs.findIndex(d=>d===null); if(idx!==-1) valid.push({sId, idx, left});
                }
            });
            if(valid.length===0) { un.push(item); continue; }
            valid.sort((a,b)=>a.left - b.left);
            let s = valid[0]; tEq[s.sId].driffs[s.idx] = {tier:item.tier, root:item.root, lvl:item.lvl, buffer:item.buffer, locked:false};
        }
        if(un.length < minU) { minU = un.length; best = tEq; bestU = un; if(minU===0) break; }
    }
    Object.keys(equipment).forEach(k => { equipment[k].driffs = best[k].driffs; renderSlot(k); });
    document.getElementById('auto-driff-overlay').classList.add('hidden');
    generateReport(bestU);
}

// ==========================================
// 13. RAPORT I ANALIZA ZAPASÓW
// ==========================================

function generateReport(unplaced) {
    let html = unplaced.length > 0 ? `<div style="color:#d9534f; margin-bottom:10px; font-weight:bold;">Brak miejsca dla ${unplaced.length} drifów (lub konflikty).</div>` : `<div style="color:#00ff66; margin-bottom:10px; font-weight:bold;">Sukces! Optymalizacja zakończona.</div>`;
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
        html += `<span style="font-size:12px; color:#aaa;">Fizycznie zajęte: <span style="color:#fff;">${uPhys}/${total}</span> | Wolne z gwarancją zapasu: <strong style="color:${remS<0?'#d9534f':'#00ff66'};">${remS}</strong></span>`;
        if(bDetails.length > 0) html += `<div style="font-size:11px; color:#aaa; margin-top:8px; padding-top:8px; border-top:1px dashed #333; line-height:1.4;">${bDetails.join("<br>")}</div>`;
        html += `</div>`;
    });
    document.getElementById('report-content').innerHTML = html;
    document.getElementById('report-overlay').classList.remove('hidden');
}