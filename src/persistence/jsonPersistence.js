const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/shelters.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { shelters: [] };
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function syncFromDB(shelters) {
  writeData({ shelters, lastSync: new Date().toISOString() });
}

function getAll() {
  return readData().shelters;
}

function getById(id) {
  return readData().shelters.find((s) => s.id === Number(id)) || null;
}

function save(shelter) {
  const data = readData();
  const idx = data.shelters.findIndex((s) => s.id === shelter.id);
  if (idx >= 0) {
    data.shelters[idx] = shelter;
  } else {
    data.shelters.push(shelter);
  }
  writeData(data);
}

function remove(id) {
  const data = readData();
  data.shelters = data.shelters.filter((s) => s.id !== Number(id));
  writeData(data);
}

module.exports = { syncFromDB, getAll, getById, save, remove };
