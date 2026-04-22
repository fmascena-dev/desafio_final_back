\c shelters_db;

INSERT INTO shelters (name, address, city, state, phone, capacity, current_occupancy, accepts_pets, accepts_elderly, accepts_disabled, needs, coordinator_name, coordinator_phone)
VALUES
  ('Escola Estadual João Paulo II', 'Rua das Flores, 123', 'Porto Alegre', 'RS', '(51) 3333-1111', 200, 80, TRUE, TRUE, FALSE, ARRAY['água potável', 'cobertores', 'fraldas'], 'Maria Silva', '(51) 99999-1111'),
  ('Ginásio Municipal Centro', 'Av. Central, 456', 'Canoas', 'RS', '(51) 3444-2222', 350, 310, FALSE, TRUE, TRUE, ARRAY['medicamentos', 'alimentos não perecíveis'], 'João Souza', '(51) 98888-2222'),
  ('Igreja Nossa Senhora Aparecida', 'Rua da Igreja, 789', 'São Leopoldo', 'RS', '(51) 3555-3333', 100, 100, FALSE, FALSE, FALSE, ARRAY['roupas adulto', 'calçados'], 'Ana Costa', '(51) 97777-3333'),
  ('CRAS Bairro Novo', 'Rua Progresso, 321', 'Gravataí', 'RS', '(51) 3666-4444', 150, 90, TRUE, TRUE, TRUE, ARRAY['colchões', 'água potável'], 'Carlos Lima', '(51) 96666-4444'),
  ('Clube Social Esperança', 'Av. da Esperança, 654', 'Cachoeirinha', 'RS', '(51) 3777-5555', 80, 20, FALSE, FALSE, FALSE, ARRAY['higiene pessoal', 'leite'], 'Fernanda Ramos', '(51) 95555-5555');
