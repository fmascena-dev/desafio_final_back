const pool = require('../config/database');
const json = require('../persistence/jsonPersistence');

async function findAll({ search, status, accepts_pets, accepts_elderly, accepts_disabled } = {}) {
  const conditions = [];
  const values = [];
  let i = 1;

  if (search) {
    conditions.push(`(name ILIKE $${i} OR city ILIKE $${i} OR address ILIKE $${i})`);
    values.push(`%${search}%`);
    i++;
  }
  if (status) {
    conditions.push(`status = $${i}`);
    values.push(status);
    i++;
  }
  if (accepts_pets === 'true') {
    conditions.push(`accepts_pets = TRUE`);
  }
  if (accepts_elderly === 'true') {
    conditions.push(`accepts_elderly = TRUE`);
  }
  if (accepts_disabled === 'true') {
    conditions.push(`accepts_disabled = TRUE`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM shelters ${where} ORDER BY created_at DESC`;
  const result = await pool.query(query, values);

  json.syncFromDB(result.rows);
  return result.rows;
}

async function findById(id) {
  const result = await pool.query('SELECT * FROM shelters WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function create(data) {
  const {
    name, address, city, state, phone, capacity, current_occupancy,
    accepts_pets, accepts_elderly, accepts_disabled, needs, coordinator_name, coordinator_phone,
  } = data;

  const result = await pool.query(
    `INSERT INTO shelters
      (name, address, city, state, phone, capacity, current_occupancy,
       accepts_pets, accepts_elderly, accepts_disabled, needs, coordinator_name, coordinator_phone)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [name, address, city, state, phone, capacity, current_occupancy ?? 0,
     accepts_pets ?? false, accepts_elderly ?? false, accepts_disabled ?? false,
     needs ?? [], coordinator_name, coordinator_phone],
  );

  const shelter = result.rows[0];
  json.save(shelter);
  return shelter;
}

async function update(id, data) {
  const fields = [];
  const values = [];
  let i = 1;

  const allowed = [
    'name', 'address', 'city', 'state', 'phone', 'capacity', 'current_occupancy',
    'accepts_pets', 'accepts_elderly', 'accepts_disabled', 'needs',
    'coordinator_name', 'coordinator_phone',
  ];

  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = $${i}`);
      values.push(data[key]);
      i++;
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const result = await pool.query(
    `UPDATE shelters SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
    values,
  );

  const shelter = result.rows[0] || null;
  if (shelter) json.save(shelter);
  return shelter;
}

async function remove(id) {
  const result = await pool.query('DELETE FROM shelters WHERE id = $1 RETURNING *', [id]);
  const shelter = result.rows[0] || null;
  if (shelter) json.remove(id);
  return shelter;
}

module.exports = { findAll, findById, create, update, remove };
