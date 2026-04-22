INSERT INTO shelters (name, address, city, state, phone, capacity, current_occupancy, accepts_pets, accepts_elderly, accepts_disabled, needs, coordinator_name, coordinator_phone)
VALUES
  ('Centro Comunitário Vila Nova', 'Rua Ipiranga, 210', 'Porto Alegre', 'RS', '(51) 3211-0001', 120, 30, TRUE, FALSE, TRUE, ARRAY['agua potavel', 'fraldas', 'leite'], 'Roberto Alves', '(51) 99111-0001'),
  ('Pavilhão da Feira Municipal', 'Av. Farrapos, 1500', 'Porto Alegre', 'RS', '(51) 3211-0002', 500, 480, FALSE, TRUE, TRUE, ARRAY['medicamentos', 'cadeiras de rodas'], 'Lucia Ferreira', '(51) 99111-0002'),
  ('Escola Municipal Tiradentes', 'Rua Tiradentes, 88', 'Novo Hamburgo', 'RS', '(51) 3599-0003', 180, 144, TRUE, TRUE, FALSE, ARRAY['roupas infantis', 'calcados', 'cobertores'], 'Marcos Oliveira', '(51) 99111-0003'),
  ('Igreja Batista Central', 'Rua das Acacias, 45', 'São Leopoldo', 'RS', '(51) 3590-0004', 60, 10, FALSE, TRUE, FALSE, ARRAY['higiene pessoal', 'agua potavel'], 'Pastora Helena', '(51) 99111-0004'),
  ('Ginásio Poliesportivo Leste', 'Av. Leste, 900', 'Alvorada', 'RS', '(51) 3480-0005', 300, 300, FALSE, FALSE, TRUE, ARRAY['alimentos', 'medicamentos', 'colchoes'], 'Diego Santos', '(51) 99111-0005'),
  ('Salão Paroquial São José', 'Rua São José, 77', 'Esteio', 'RS', '(51) 3461-0006', 90, 50, TRUE, TRUE, TRUE, ARRAY['fraldas', 'leite', 'agua potavel'], 'Padre Antonio', '(51) 99111-0006'),
  ('CRAS Vila dos Trabalhadores', 'Rua Operaria, 333', 'Sapucaia do Sul', 'RS', '(51) 3452-0007', 200, 160, FALSE, TRUE, TRUE, ARRAY['cadeiras de rodas', 'medicamentos'], 'Silvia Nunes', '(51) 99111-0007'),
  ('Centro Esportivo Municipal', 'Av. das Nacoes, 2200', 'Viamão', 'RS', '(51) 3485-0008', 250, 50, TRUE, FALSE, FALSE, ARRAY['cobertores', 'roupas adulto'], 'Paulo Menezes', '(51) 99111-0008'),
  ('Escola Estadual Dom Pedro II', 'Rua Dom Pedro, 400', 'Canoas', 'RS', '(51) 3472-0009', 160, 128, FALSE, TRUE, FALSE, ARRAY['agua potavel', 'alimentos nao pereciveis'], 'Claudia Borges', '(51) 99111-0009'),
  ('Associacao de Moradores Jardim Bela Vista', 'Rua das Rosas, 55', 'Gravataí', 'RS', '(51) 3488-0010', 70, 65, TRUE, TRUE, TRUE, ARRAY['fraldas', 'leite', 'higiene pessoal', 'medicamentos'], 'Tereza Lima', '(51) 99111-0010');
