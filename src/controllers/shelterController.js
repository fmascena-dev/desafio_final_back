const Shelter = require('../models/shelter');

async function index(req, res) {
  try {
    const { search, status, accepts_pets, accepts_elderly, accepts_disabled } = req.query;
    const shelters = await Shelter.findAll({ search, status, accepts_pets, accepts_elderly, accepts_disabled });
    res.json({ shelters, total: shelters.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function show(req, res) {
  try {
    const shelter = await Shelter.findById(req.params.id);
    if (!shelter) return res.status(404).json({ message: 'Shelter not found' });
    res.json(shelter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function store(req, res) {
  try {
    const { capacity, current_occupancy } = req.body;
    if (current_occupancy !== undefined && Number(current_occupancy) > Number(capacity)) {
      return res.status(400).json({ message: 'current_occupancy cannot exceed capacity' });
    }
    const shelter = await Shelter.create(req.body);
    res.status(201).json(shelter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function update(req, res) {
  try {
    const existing = await Shelter.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Shelter not found' });

    const capacity = req.body.capacity ?? existing.capacity;
    const occupancy = req.body.current_occupancy ?? existing.current_occupancy;
    if (Number(occupancy) > Number(capacity)) {
      return res.status(400).json({ message: 'current_occupancy cannot exceed capacity' });
    }

    const shelter = await Shelter.update(req.params.id, req.body);
    res.json(shelter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function destroy(req, res) {
  try {
    const shelter = await Shelter.remove(req.params.id);
    if (!shelter) return res.status(404).json({ message: 'Shelter not found' });
    res.json({ message: 'Shelter deleted successfully', shelter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { index, show, store, update, destroy };
