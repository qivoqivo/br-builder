import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# --- SZTYWNA MAPA NAPRAWY NAZW PLIKÓW ---
MANUAL_FILENAME_FIXES = {
    "Unduriusy": "undurisy.png",
    "Vengur": "vengur.png",
    "Remigesy": "remigesy.png",
    "Oko": "oko.png",
    "Dar Skrzydlatej": "dar_skrzydlatej.png",
    "Nurthil": "nurthil.png",
    "Latarnia Życia": "Latarnia_życia.png",
    "Żmij": "Żmij.png",
    "Allenor": "Allenor.png",
    "Attawa": "Attawa.png",
    "Gorthdar": "Gorthdar.png",
    "Imisindo": "Imisindo.png",
    "Washi": "Washi.png"
}

# --- TWOJA PEŁNA BAZA PRZEDMIOTÓW (1:1 Z MAINA) ---
ITEMS_DB = {
    "Allenor": {"rank": 9, "cap": 25, "slots": 2, "type": "Miecz", "fixed_driffs": ["astah", "band"], "stats": {"Siła": "+15", "Zręczność": "+15", "PŻ": "+250", "Kondycja": "+50", "Obrażenia": "100"}},
    "Attawa": {"rank": 9, "cap": 25, "slots": 2, "type": "Kije", "fixed_driffs": ["band", "oda"], "stats": {"Moc": "+15", "Wiedza": "+30", "PŻ": "+100", "Mana": "+50", "Obrażenia": "120"}},
    "Gorthdar": {"rank": 9, "cap": 25, "slots": 2, "type": "Topór dwuręczny", "fixed_driffs": ["unn", "band"], "stats": {"Siła": "+25", "Zręczność": "+15", "PŻ": "+150", "Kondycja": "+50", "Obrażenia": "130"}},
    "Imisindo": {"rank": 9, "cap": 25, "slots": 2, "type": "Łuk", "fixed_driffs": ["band", "ling"], "stats": {"Siła": "+15", "Zręczność": "+20", "PŻ": "+200", "Kondycja": "+50", "Obrażenia": "105"}},
    "Latarnia Życia": {"rank": 9, "cap": 25, "slots": 2, "type": "Kije", "fixed_driffs": ["err", "band"], "stats": {"Moc": "+20", "Wiedza": "+25", "PŻ": "+100", "Mana": "+50", "Obrażenia": "120"}},
    "Washi": {"rank": 9, "cap": 25, "slots": 2, "type": "Kastety", "fixed_driffs": ["band", "ulk"], "stats": {"Siła": "+15", "Zręczność": "+20", "PŻ": "+200", "Kondycja": "+50", "Obrażenia": "115"}},
    "Żmij": {"rank": 9, "cap": 25, "slots": 2, "type": "Kije", "fixed_driffs": ["band", "teld"], "stats": {"Moc": "+30", "Wiedza": "+15", "PŻ": "+150", "Obrażenia": "120"}},
    "Oko": {"rank": 5, "cap": 10, "slots": 2, "type": "Pierścień", "stats": {"PŻ": "+160", "Mana": "+70"}},
    "Derengil": {"rank": 2, "cap": 4, "slots": 1, "type": "Miecz", "stats": {"Siła": "+8", "Zręczność": "+6", "Kondycja": "+40"}},
    "Maiarot": {"rank": 2, "cap": 4, "slots": 1, "type": "Naszyjnik", "stats": {"PŻ": "+120", "Odporność uroki": "+20"}},
    "Sturprang": {"rank": 2, "cap": 4, "slots": 1, "type": "Laska", "stats": {"Moc": "+8", "Wiedza": "+6", "Mana": "+40"}},
    "Arcanscape": {"rank": 2, "cap": 4, "slots": 1, "type": "Pierścień", "stats": {"PŻ": "+70", "Mana": "+20", "Kondycja": "+20"}},
    "Ayol": {"rank": 2, "cap": 4, "slots": 1, "type": "Łuk", "stats": {"Siła": "+5", "Zręczność": "+9", "Kondycja": "+60"}},
    "Martumal": {"rank": 2, "cap": 4, "slots": 1, "type": "Hełm", "stats": {"Moc": "+6", "Wiedza": "+5", "Mana": "+40"}},
    "Czengsvesy": {"rank": 2, "cap": 4, "slots": 1, "type": "Buty", "stats": {"Moc": "+7", "Wiedza": "+10", "Mana": "+30"}},
    "Rolrak": {"rank": 2, "cap": 4, "slots": 1, "type": "Kastety", "stats": {"Siła": "+6", "Zręczność": "+8"}},
    "Anabolik": {"rank": 2, "cap": 4, "slots": 1, "type": "Pas", "stats": {"Siła": "+8", "Zręczność": "+5", "PŻ": "+110"}},
    "Bartaur": {"rank": 2, "cap": 4, "slots": 1, "type": "Zbroja", "stats": {"Moc": "+5", "Wiedza": "+8", "Mana": "+50"}},
    "Tasak": {"rank": 2, "cap": 4, "slots": 1, "type": "Topór dwuręczny", "stats": {"Siła": "+13", "Kondycja": "+60"}},
    "Basileus": {"rank": 3, "cap": 4, "slots": 1, "type": "Pierścień", "stats": {"Moc": "+9", "Wiedza": "+7"}},
    "Fraxy": {"rank": 3, "cap": 4, "slots": 1, "type": "Rękawice", "stats": {"Moc": "+5", "Wiedza": "+13"}},
    "Grzebień": {"rank": 3, "cap": 4, "slots": 1, "type": "Hełm", "stats": {"Siła": "+8", "Zręczność": "+4"}},
    "Moczary": {"rank": 3, "cap": 4, "slots": 1, "type": "Buty", "stats": {"Siła": "+5", "Zręczność": "+13"}},
    "Gest Władcy": {"rank": 3, "cap": 4, "slots": 1, "type": "Rękawice", "stats": {"Siła": "+12", "Zręczność": "+8"}},
    "Koriatula": {"rank": 3, "cap": 4, "slots": 1, "type": "Pas", "stats": {"Moc": "+8", "Wiedza": "+15"}},
    "Obroża Władcy": {"rank": 3, "cap": 4, "slots": 1, "type": "Naszyjnik", "stats": {"Moc": "+14", "Wiedza": "+13"}},
    "Promuris": {"rank": 3, "cap": 4, "slots": 1, "type": "Pas", "stats": {"Siła": "+15", "Zręczność": "+14"}},
    "Fiskorl": {"rank": 3, "cap": 4, "slots": 1, "type": "Pierścień", "stats": {"Siła": "+9", "Zręczność": "+7"}},
    "Davgretor": {"rank": 3, "cap": 4, "slots": 1, "type": "Młot dwuręczny", "stats": {"Siła": "+15", "PŻ": "+100"}},
    "Geomorph Core": {"rank": 3, "cap": 4, "slots": 1, "type": "Laska", "stats": {"Moc": "+15", "Mana": "+150"}},
    "Markahn": {"rank": 3, "cap": 4, "slots": 1, "type": "Naszyjnik", "stats": {"PŻ": "+70", "Mana": "+20"}},
    "Brassary": {"rank": 3, "cap": 4, "slots": 1, "type": "Rękawice", "stats": {"Moc": "+10", "Wiedza": "+5"}},
    "Piroklast": {"rank": 3, "cap": 4, "slots": 1, "type": "Łuk", "stats": {"Siła": "+2", "Zręczność": "+9"}},
    "Uguns": {"rank": 3, "cap": 4, "slots": 1, "type": "Pierścień", "stats": {"PŻ": "+140", "Mana": "+40"}},
    "Ishelm": {"rank": 3, "cap": 4, "slots": 1, "type": "Hełm", "stats": {"Siła": "+6", "Zręczność": "+10"}},
    "Isthrimm": {"rank": 3, "cap": 4, "slots": 1, "type": "Tarcza", "stats": {"PŻ": "+80", "Kondycja": "+60"}},
    "Isverd": {"rank": 3, "cap": 4, "slots": 1, "type": "Miecz", "stats": {"Obrażenia": "90", "PŻ": "+120"}},
    "Fulgur": {"rank": 3, "cap": 4, "slots": 1, "type": "Pierścień", "stats": {"Moc": "+9", "Wiedza": "+8"}},
    "Radius Electricum": {"rank": 3, "cap": 4, "slots": 1, "type": "Pas", "stats": {"Moc": "+9", "Mana": "+70"}},
    "Sphaera": {"rank": 3, "cap": 4, "slots": 1, "type": "Naszyjnik", "stats": {"Siła": "+8", "Kondycja": "+80"}},
    "Karlder": {"rank": 3, "cap": 4, "slots": 1, "type": "Pierścień", "stats": {"Siła": "+9", "Zręczność": "+8"}},
    "Khalam": {"rank": 3, "cap": 4, "slots": 1, "type": "Hełm", "stats": {"Moc": "+6", "Wiedza": "+8"}},
    "Tężec": {"rank": 3, "cap": 4, "slots": 1, "type": "Laska", "stats": {"Moc": "+4", "Wiedza": "+9"}},
    "Brunnle": {"rank": 3, "cap": 4, "slots": 1, "type": "Zbroja", "stats": {"Siła": "+7", "Zręczność": "+5"}},
    "Lysmary": {"rank": 3, "cap": 4, "slots": 1, "type": "Buty", "stats": {"Moc": "+8", "Mana": "+60"}},
    "Sidun": {"rank": 3, "cap": 4, "slots": 1, "type": "Miecz dwuręczny", "stats": {"Obrażenia": "107", "Siła": "+19"}},
    "Irkamale": {"rank": 3, "cap": 4, "slots": 1, "type": "Kastety", "stats": {"Zręczność": "+7", "PŻ": "+120"}},
    "Jeroszki": {"rank": 3, "cap": 4, "slots": 1, "type": "Buty", "stats": {"PŻ": "+100", "Kondycja": "+100"}},
    "Ostolbin": {"rank": 3, "cap": 4, "slots": 1, "type": "Naszyjnik", "stats": {"Moc": "+6", "PŻ": "+120"}},
    "Caratris": {"rank": 4, "cap": 8, "slots": 2, "type": "Naszyjnik", "stats": {"Odporność ogień": "+35", "Odporność zimno": "+35"}},
    "Smocze Skrzydło": {"rank": 4, "cap": 8, "slots": 2, "type": "Tarcza", "stats": {"Siła": "+4", "Zręczność": "+6"}},
    "Smoczy Gnat": {"rank": 4, "cap": 8, "slots": 2, "type": "Laska", "stats": {"Moc": "+20", "Mana": "+140"}},
    "Balast": {"rank": 4, "cap": 8, "slots": 2, "type": "Pierścień", "stats": {"PŻ": "+250", "Kondycja": "+40"}},
    "Bryza": {"rank": 4, "cap": 8, "slots": 2, "type": "Peleryna", "stats": {"Zręczność": "+9", "PŻ": "+200"}},
    "Navigon": {"rank": 4, "cap": 8, "slots": 2, "type": "Pierścień", "stats": {"Moc": "+12", "Wiedza": "+20"}},
    "Nit": {"rank": 4, "cap": 8, "slots": 2, "type": "Pierścień", "stats": {"Siła": "+12", "Zręczność": "+20"}},
    "Pancerz Komandorski": {"rank": 4, "cap": 8, "slots": 2, "type": "Zbroja", "stats": {"Wiedza": "+12", "Mana": "+80"}},
    "Gathril": {"rank": 5, "cap": 10, "slots": 2, "type": "Hełm", "stats": {"PŻ": "+140", "Odporność ogień": "+20"}},
    "Nurthil": {"rank": 5, "cap": 10, "slots": 2, "type": "Peleryna", "stats": {"Moc": "+39", "Wiedza": "+24"}},
    "Tirhel": {"rank": 5, "cap": 10, "slots": 2, "type": "Spodnie", "stats": {"PŻ": "+140", "Odporność energia": "+20"}},
    "Virthil": {"rank": 5, "cap": 10, "slots": 2, "type": "Zbroja", "stats": {"PŻ": "+140", "Odporność zimno": "+20"}},
    "Berglisy": {"rank": 5, "cap": 10, "slots": 2, "type": "Karwasze", "stats": {"Moc": "+12", "Wiedza": "+18", "PŻ": "+240"}},
    "Czacha": {"rank": 5, "cap": 10, "slots": 2, "type": "Hełm", "stats": {"Moc": "+18", "PŻ": "+130"}},
    "Diabolo": {"rank": 5, "cap": 10, "slots": 2, "type": "Zbroja", "stats": {"Moc": "+28", "Mana": "+150"}},
    "Wzorek": {"rank": 5, "cap": 10, "slots": 2, "type": "Spodnie", "stats": {"Wiedza": "+20", "Mana": "+110"}},
    "Danthum": {"rank": 5, "cap": 10, "slots": 2, "type": "Naszyjnik", "stats": {"Zręczność": "+26", "Kondycja": "+100"}},
    "Pressory": {"rank": 5, "cap": 10, "slots": 2, "type": "Rękawice", "stats": {"Siła": "+15", "Kondycja": "+100"}},
    "Tangnary": {"rank": 5, "cap": 10, "slots": 2, "type": "Buty", "stats": {"Zręczność": "+13", "Pancerz sieczne": "+33"}},
    "Valazan": {"rank": 5, "cap": 10, "slots": 2, "type": "Naszyjnik", "stats": {"Wiedza": "+26", "Mana": "+100"}},
    "Geury": {"rank": 5, "cap": 10, "slots": 2, "type": "Karwasze", "stats": {"Zręczność": "+18", "PŻ": "+240"}},
    "Obdartusy": {"rank": 5, "cap": 10, "slots": 2, "type": "Spodnie", "stats": {"Siła": "+14", "Pancerz kłute": "+37"}},
    "Ognisty Młot": {"rank": 5, "cap": 10, "slots": 2, "type": "Młot dwuręczny", "stats": {"Obrażenia": "148", "Siła": "+28"}},
    "Opoka Bogów": {"rank": 5, "cap": 10, "slots": 2, "type": "Zbroja", "stats": {"Siła": "+10", "Kondycja": "+120"}},
    "Sentrion": {"rank": 5, "cap": 10, "slots": 2, "type": "Pas", "stats": {"Wiedza": "+30", "Odporność zimno": "+30"}},
    "Vaekany": {"rank": 5, "cap": 10, "slots": 2, "type": "Rękawice", "stats": {"Moc": "+14", "Mana": "+310"}},
    "Xenothor": {"rank": 5, "cap": 10, "slots": 2, "type": "Peleryna", "stats": {"Siła": "+39", "Zręczność": "+24"}},
    "Drakhgard": {"rank": 5, "cap": 10, "slots": 2, "type": "Tarcza", "stats": {"PŻ": "+150", "Pancerz obuchowe": "+35"}},
    "Łamacz woli": {"rank": 5, "cap": 10, "slots": 2, "type": "Młot", "stats": {"Obrażenia": "121", "Zręczność": "+23"}},
    "Ślady zdarzeń": {"rank": 5, "cap": 10, "slots": 2, "type": "Buty", "stats": {"Moc": "+11", "Odporność energia": "+15"}},
    "Wstęga Heurokratosa": {"rank": 5, "cap": 10, "slots": 2, "type": "Pas", "stats": {"Zręczność": "+20", "PŻ": "+80"}},
    "Urntsul": {"rank": 6, "cap": 12, "slots": 2, "type": "Laska", "stats": {"Obrażenia": "148", "PŻ": "+290"}},
    "Virral": {"rank": 6, "cap": 12, "slots": 2, "type": "Łuk", "stats": {"Obrażenia": "148", "Zręczność": "+25"}},
    "Biltabandury": {"rank": 6, "cap": 12, "slots": 2, "type": "Rękawice", "stats": {"Zręczność": "+20", "PŻ": "+200"}},
    "Debba": {"rank": 6, "cap": 12, "slots": 2, "type": "Peleryna", "stats": {"Zręczność": "+20", "PŻ": "+250"}},
    "Ghaitarog": {"rank": 6, "cap": 12, "slots": 2, "type": "Hełm", "stats": {"Zręczność": "+9", "Pancerz sieczne": "+35"}},
    "Buoriany": {"rank": 6, "cap": 12, "slots": 2, "type": "Kastety", "stats": {"Obrażenia": "160", "Siła": "+34"}},
    "Dagorilm": {"rank": 6, "cap": 12, "slots": 2, "type": "Pas", "stats": {"Siła": "+24", "Zręczność": "+21"}},
    "Lawina": {"rank": 6, "cap": 12, "slots": 2, "type": "Młot", "stats": {"Obrażenia": "143", "Siła": "+30"}},
    "Thorimmy": {"rank": 6, "cap": 12, "slots": 2, "type": "Buty", "stats": {"Wiedza": "+20", "Pancerz kłute": "+30"}},
    "Nadzieja Pokoleń": {"rank": 7, "cap": 15, "slots": 2, "type": "Zbroja", "stats": {"Wiedza": "+20", "Odporność ogień": "+20"}},
    "Powrót Ivravula": {"rank": 7, "cap": 15, "slots": 2, "type": "Peleryna", "stats": {"Zręczność": "+24", "Kondycja": "+120"}},
    "Władca Losu": {"rank": 7, "cap": 15, "slots": 2, "type": "Laska", "stats": {"Obrażenia": "179", "Moc": "+37"}},
    "Zemsta Ivravula": {"rank": 7, "cap": 15, "slots": 2, "type": "Naszyjnik", "stats": {"PŻ": "+500", "Odporność uroki": "+10"}},
    "Harttraum": {"rank": 7, "cap": 15, "slots": 2, "type": "Zbroja", "stats": {"Zręczność": "+26", "Pancerz obuchowe": "+35"}},
    "Otwieracz": {"rank": 7, "cap": 15, "slots": 2, "type": "Miecz", "stats": {"Obrażenia": "160", "Kondycja": "+180"}},
    "Sigil": {"rank": 7, "cap": 15, "slots": 2, "type": "Hełm", "stats": {"Wiedza": "+13", "PŻ": "+180"}},
    "Dracorporis": {"rank": 7, "cap": 15, "slots": 2, "type": "Peleryna", "stats": {"Moc": "+38", "Wiedza": "+22"}},
    "Istav": {"rank": 7, "cap": 15, "slots": 2, "type": "Laska", "stats": {"Wiedza": "+30", "Odporność zimno": "+20"}},
    "Varrvy": {"rank": 7, "cap": 15, "slots": 2, "type": "Spodnie", "stats": {"Siła": "+31", "Pancerz kłute": "+39"}},
    "Virveny": {"rank": 7, "cap": 15, "slots": 2, "type": "Buty", "stats": {"Zręczność": "+9", "Kondycja": "+150"}},
    "Fanga": {"rank": 7, "cap": 15, "slots": 2, "type": "Kastety", "stats": {"Obrażenia": "179", "Zręczność": "+33"}},
    "Griv": {"rank": 7, "cap": 15, "slots": 2, "type": "Pierścień", "stats": {"PŻ": "+550", "Mana": "+100"}},
    "Vogurun": {"rank": 7, "cap": 15, "slots": 2, "type": "Naszyjnik", "stats": {"Moc": "+38", "Wiedza": "+37"}},
    "Yurugu": {"rank": 7, "cap": 15, "slots": 2, "type": "Naszyjnik", "stats": {"Siła": "+38", "Zręczność": "+37"}},
    "Zadry": {"rank": 7, "cap": 15, "slots": 2, "type": "Rękawice", "stats": {"Zręczność": "+28", "PŻ": "+180"}},
    "Gjolmar": {"rank": 7, "cap": 15, "slots": 2, "type": "Łuk", "stats": {"Obrażenia": "196", "Zręczność": "+40"}},
    "Batagur": {"rank": 7, "cap": 15, "slots": 2, "type": "Młot dwuręczny", "stats": {"Obrażenia": "217", "Siła": "+47"}},
    "Aquariusy": {"rank": 8, "cap": 18, "slots": 2, "type": "Spodnie", "stats": {"Zręczność": "+25", "PŻ": "+250"}},
    "Aqueniry": {"rank": 8, "cap": 18, "slots": 2, "type": "Buty", "stats": {"Wiedza": "+30", "Pancerz sieczne": "+35"}},
    "Nurt": {"rank": 8, "cap": 18, "slots": 2, "type": "Pas", "stats": {"Zręczność": "+38", "PŻ": "+200"}},
    "Tsunami": {"rank": 8, "cap": 18, "slots": 2, "type": "Peleryna", "stats": {"Wiedza": "+35", "PŻ": "+250"}},
    "Skiilfy": {"rank": 8, "cap": 18, "slots": 2, "type": "Spodnie", "stats": {"Moc": "+22", "Mana": "+50"}},
    "Skogan": {"rank": 8, "cap": 18, "slots": 2, "type": "Pierścień", "stats": {"Siła": "+44", "PŻ": "+120"}},
    "Karapaks": {"rank": 8, "cap": 18, "slots": 2, "type": "Tarcza", "stats": {"Kondycja": "+200", "Pancerz sieczne": "+40"}},
    "Mauremys": {"rank": 8, "cap": 18, "slots": 2, "type": "Pierścień", "stats": {"Moc": "+38", "PŻ": "+100"}},
    "Furiony": {"rank": 8, "cap": 18, "slots": 2, "type": "Karwasze", "stats": {"Siła": "+28", "PŻ": "+320"}},
    "Hvariony": {"rank": 8, "cap": 18, "slots": 2, "type": "Rękawice", "stats": {"Siła": "+34", "Kondycja": "+100"}},
    "Rozdzieracz Światów": {"rank": 8, "cap": 18, "slots": 2, "type": "Topór dwuręczny", "stats": {"Obrażenia": "227", "Zręczność": "+35"}},
    "Scornaxy": {"rank": 8, "cap": 18, "slots": 2, "type": "Karwasze", "stats": {"Moc": "+28", "PŻ": "+270"}},
    "Exuvium": {"rank": 8, "cap": 18, "slots": 2, "type": "Pas", "stats": {"Wiedza": "+40", "PŻ": "+350"}},
    "Pazury": {"rank": 8, "cap": 18, "slots": 2, "type": "Rękawice", "stats": {"Moc": "+22", "Mana": "+320"}},
    "Pysk": {"rank": 8, "cap": 18, "slots": 2, "type": "Hełm", "stats": {"Siła": "+26", "Pancerz obuchowe": "+35"}},
    "Dmorlung": {"rank": 8, "cap": 18, "slots": 2, "type": "Zbroja", "stats": {"Siła": "+19", "Odporność zimno": "+15"}},
    "Vorleah": {"rank": 8, "cap": 18, "slots": 2, "type": "Zbroja", "stats": {"Moc": "+16", "Odporność zimno": "+15"}},
    "Angwallion": {"rank": 9, "cap": 21, "slots": 2, "type": "Peleryna", "stats": {"Zręczność": "+30", "Odporność ogień": "+15"}},
    "Htagan": {"rank": 9, "cap": 21, "slots": 2, "type": "Hełm", "stats": {"Moc": "+25", "Pancerz kłute": "+35"}},
    "Envile": {"rank": 10, "cap": 24, "slots": 3, "type": "Buty", "stats": {"Moc": "+50", "Wiedza": "+39"}},
    "Nienawiść Draugula": {"rank": 10, "cap": 24, "slots": 3, "type": "Pas", "stats": {"Siła": "+63", "Zręczność": "+42"}},
    "Przysięga Draugula": {"rank": 10, "cap": 24, "slots": 3, "type": "Pierścień", "stats": {"Moc": "+50", "Wiedza": "+50"}},
    "Zagłada Ludów": {"rank": 10, "cap": 24, "slots": 3, "type": "Pierścień", "stats": {"Siła": "+50", "Zręczność": "+50"}},
    "Ból": {"rank": 10, "cap": 24, "slots": 3, "type": "Laska", "stats": {"Obrażenia": "239", "Wiedza": "+40"}},
    "Cierń": {"rank": 10, "cap": 24, "slots": 3, "type": "Miecz dwuręczny", "stats": {"Obrażenia": "266", "Siła": "+50"}},
    "Cierpiętniki": {"rank": 10, "cap": 24, "slots": 3, "type": "Buty", "stats": {"Siła": "+49", "Pancerz sieczne": "+40"}},
    "Udręki": {"rank": 10, "cap": 24, "slots": 3, "type": "Spodnie", "stats": {"Moc": "+44", "Pancerz obuchowe": "+39"}},
    "Ariarchy": {"rank": 10, "cap": 24, "slots": 3, "type": "Karwasze", "stats": {"Moc": "+45", "Wiedza": "+43"}},
    "Groza Seleny": {"rank": 10, "cap": 24, "slots": 3, "type": "Pas", "stats": {"Zręczność": "+55", "PŻ": "+230"}},
    "Hańba Seleny": {"rank": 10, "cap": 24, "slots": 3, "type": "Peleryna", "stats": {"Wiedza": "+40", "PŻ": "+280"}},
    "Mallus Selenorum": {"rank": 10, "cap": 24, "slots": 3, "type": "Topór", "stats": {"Obrażenia": "211", "Kondycja": "+250"}},
    "Serce Seleny": {"rank": 10, "cap": 24, "slots": 3, "type": "Naszyjnik", "stats": {"Odporność ogień": "+55", "Odporność energia": "+55"}},
    "Unduriusy": {"rank": 10, "cap": 24, "slots": 3, "type": "Karwasze", "stats": {"Siła": "+53", "Kondycja": "+120"}},
    "Alendry": {"rank": 10, "cap": 24, "slots": 3, "type": "Buty", "stats": {"Wiedza": "+43", "Odporność ogień": "+15"}},
    "Erbaile": {"rank": 10, "cap": 24, "slots": 3, "type": "Spodnie", "stats": {"Zręczność": "+33", "Kondycja": "+130"}},
    "Szpony": {"rank": 10, "cap": 24, "slots": 3, "type": "Kastety", "stats": {"Obrażenia": "239", "Zręczność": "+48"}},
    "Taehal": {"rank": 10, "cap": 24, "slots": 3, "type": "Łuk", "stats": {"Obrażenia": "239", "Zręczność": "+51"}},
    "Admiralski Gronostaj": {"rank": 10, "cap": 24, "slots": 3, "type": "Peleryna", "stats": {"Siła": "+35", "Zręczność": "+45"}},
    "Inavoxy": {"rank": 10, "cap": 24, "slots": 3, "type": "Karwasze", "stats": {"Wiedza": "+25", "PŻ": "+700"}},
    "Kil": {"rank": 10, "cap": 24, "slots": 3, "type": "Tarcza", "stats": {"Siła": "+20", "Kondycja": "+150"}},
    "Szpony Seimhi": {"rank": 10, "cap": 24, "slots": 3, "type": "Rękawice", "stats": {"Wiedza": "+45", "PŻ": "+300"}},
    "Takerony": {"rank": 10, "cap": 24, "slots": 3, "type": "Karwasze", "stats": {"Siła": "+10", "PŻ": "+700"}},
    "Trójząb Admiralski": {"rank": 10, "cap": 24, "slots": 3, "type": "Laska", "stats": {"Obrażenia": "239", "Moc": "+65"}},
    "Aeterus Passio": {"rank": 10, "cap": 24, "slots": 3, "type": "Rękawice", "stats": {"Siła": "+40", "PŻ": "+300"}},
    "Miłość Morany": {"rank": 10, "cap": 24, "slots": 3, "type": "Hełm", "stats": {"Moc": "+27", "Wiedza": "+25"}},
    "Objęcia Morany": {"rank": 10, "cap": 24, "slots": 3, "type": "Pas", "stats": {"Moc": "+40", "Wiedza": "+45"}},
    "Pamięć Morany": {"rank": 10, "cap": 24, "slots": 3, "type": "Hełm", "stats": {"Siła": "+29", "Pancerz obuchowe": "+45"}},
    "Arhauty": {"rank": 11, "cap": 28, "slots": 3, "type": "Buty", "stats": {"Zręczność": "+25", "PŻ": "+750"}},
    "Dorbis": {"rank": 11, "cap": 28, "slots": 3, "type": "Naszyjnik", "stats": {"Siła": "+45", "Kondycja": "+170"}},
    "Ortasis": {"rank": 11, "cap": 28, "slots": 3, "type": "Naszyjnik", "stats": {"Wiedza": "+58", "Mana": "+170"}},
    "Temary": {"rank": 11, "cap": 28, "slots": 3, "type": "Spodnie", "stats": {"Wiedza": "+25", "PŻ": "+750"}},
    "Cień Tarula": {"rank": 11, "cap": 28, "slots": 3, "type": "Peleryna", "stats": {"Moc": "+68", "Wiedza": "+63"}},
    "Ziraki": {"rank": 11, "cap": 28, "slots": 3, "type": "Spodnie", "stats": {"Siła": "+63", "Kondycja": "+60"}},
    "Salmurn": {"rank": 12, "cap": 32, "slots": 3, "type": "Zbroja", "stats": {"Siła": "+22", "Zręczność": "+48"}},
    "Zalla": {"rank": 12, "cap": 32, "slots": 3, "type": "Zbroja", "stats": {"Moc": "+24", "Wiedza": "+46"}},
    "Dar Skrzydlatej": {"rank": 12, "cap": 32, "slots": 3, "type": "Pierścień", "stats": {"Wiedza": "+30", "PŻ": "+640"}},
    "Remigesy": {"rank": 12, "cap": 32, "slots": 3, "type": "Rękawice", "stats": {"Siła": "+58", "Zręczność": "+70"}},
    "Vengur": {"rank": 12, "cap": 32, "slots": 3, "type": "Peleryna", "stats": {"Siła": "+68", "Zręczność": "+56"}},
    "Voglery": {"rank": 12, "cap": 32, "slots": 3, "type": "Rękawice", "stats": {"Moc": "+74", "Wiedza": "+54"}},
    "Wyrok Hellara": {"rank": 12, "cap": 32, "slots": 3, "type": "Pas", "stats": {"Moc": "+52", "Wiedza": "+72"}}
}

# --- MAPOWANIE SLOTÓW (Poprawione o ID z script.js) ---
SLOT_MAPPING = {
    "head": ["Hełm"], 
    "neck": ["Naszyjnik"], 
    "gloves": ["Rękawice"], 
    "ring1": ["Pierścień"], 
    "ring2": ["Pierścień"], 
    "bracers": ["Karwasze"], 
    "boots": ["Buty"], 
    "legs": ["Spodnie"], 
    "waist": ["Pas"], 
    "body": ["Zbroja"], 
    "cape": ["Peleryna"], 
    "shield": ["Tarcza"],
    "weapon": ["Broń", "Miecz", "Miecz dwuręczny", "Miecz 2H", "Laska", "Łuk", "Topór", "Topór dwuręczny", "Topór 2H", "Młot", "Młot dwuręczny", "Młot 2H", "Kastety", "Kije"]
}

# --- FUNKCJA SKANUJĄCA PLIKI (POPRAWIONA ŚCIEŻKA DLA FLASKA) ---
def find_image_file(item_name):
    # 1. Mapa ręczna
    if item_name in MANUAL_FILENAME_FIXES:
        fname = MANUAL_FILENAME_FIXES[item_name]
        for f in ['epik', 'rary']:
            if os.path.exists(os.path.join(app.root_path, 'static', f, fname)):
                return fname, f
        return fname, "rary"

    # 2. Automatyczne szukanie
    target = item_name.lower().replace(" ", "").replace("'", "").replace("-", "")
    for folder in ['epik', 'rary']:
        img_dir = os.path.join(app.root_path, 'static', folder)
        if not os.path.exists(img_dir): continue
        for filename in os.listdir(img_dir):
            name_no_ext = os.path.splitext(filename)[0]
            cleaned_file = name_no_ext.lower().replace(" ", "").replace("_", "").replace("'", "").replace("-", "")
            if target == cleaned_file or (len(target) > 3 and target in cleaned_file):
                return filename, folder
    return "default.png", "rary"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_items/<slot_id>')
def get_items_list(slot_id):
    valid_types = SLOT_MAPPING.get(slot_id, [])
    result = {}
    for name, data in ITEMS_DB.items():
        if data['type'] in valid_types:
            real_filename, folder_name = find_image_file(name)
            item_data = data.copy()
            item_data['img'] = real_filename
            item_data['folder'] = folder_name
            result[name] = item_data
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)