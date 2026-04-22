CREATE DATABASE shelters_db;

\c shelters_db;

CREATE TABLE IF NOT EXISTS shelters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state CHAR(2) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  current_occupancy INTEGER NOT NULL DEFAULT 0 CHECK (current_occupancy >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'critical', 'full')),
  accepts_pets BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_elderly BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_disabled BOOLEAN NOT NULL DEFAULT FALSE,
  needs TEXT[] DEFAULT '{}',
  coordinator_name VARCHAR(255) NOT NULL,
  coordinator_phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT occupancy_not_exceed_capacity CHECK (current_occupancy <= capacity)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON shelters
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION calculate_shelter_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.current_occupancy >= NEW.capacity THEN
    NEW.status = 'full';
  ELSIF NEW.current_occupancy::FLOAT / NEW.capacity >= 0.8 THEN
    NEW.status = 'critical';
  ELSE
    NEW.status = 'available';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_shelter_status
BEFORE INSERT OR UPDATE ON shelters
FOR EACH ROW EXECUTE FUNCTION calculate_shelter_status();
