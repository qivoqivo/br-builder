import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# --- TWOJA BAZA PRZEDMIOTÓW ---
ITEMS_DB = {
    # Tutaj wklej CAŁĄ zawartość ITEMS_DB ze swojego starego main.py
    # (Pomiń MANUAL_FILENAME_FIXES, bo Flask obsłuży to prościej)
}

SLOT_MAPPING = {
    "head": ["Hełm"], "neck": ["Naszyjnik"], "gloves": ["Rękawice"],
    "ring": ["Pierścień"], "bracers": ["Karwasze"], "boots": ["Buty"],
    "legs": ["Spodnie"], "waist": ["Pas"], "body": ["Zbroja"],
    "cape": ["Peleryna"], "shield": ["Tarcza"],
    "weapon": ["Broń", "Miecz", "Miecz dwuręczny", "Laska", "Łuk", "Topór", "Topór dwuręczny", "Młot", "Młot dwuręczny", "Kastety", "Kije"]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_items/<slot_type>')
def get_items_list(slot_type):
    # Ring handling
    search_slot = "ring" if "ring" in slot_type else slot_type
    valid_types = SLOT_MAPPING.get(search_slot, [])
    
    result = {}
    for name, data in ITEMS_DB.items():
        if data['type'] in valid_types:
            item_data = data.copy()
            # Domyślnie szukamy w static/rary lub static/epik
            folder = "epik" if data.get('rank', 0) == 9 else "rary"
            item_data['folder'] = folder
            
            # Obsługa Twoich specyficznych nazw plików
            clean_name = name.lower().replace(" ", "_") + ".png"
            # Możesz tu dodać specyficzne poprawki jeśli plik nazywa się inaczej niż item
            if name == "Unduriusy": clean_name = "undurisy.png"
            
            item_data['img'] = clean_name
            result[name] = item_data
            
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)