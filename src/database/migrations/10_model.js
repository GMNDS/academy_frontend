export async function up(pg) {
  await pg.exec(`CREATE TABLE IF NOT EXISTS model (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL UNIQUE
	
	);
	INSERT INTO model (name) VALUES ('Exemplo 1') ON CONFLICT (name) DO NOTHING;
	INSERT INTO model (name) VALUES ('Exemplo 2') ON CONFLICT (name) DO NOTHING;
	INSERT INTO model (name) VALUES ('Exemplo 3') ON CONFLICT (name) DO NOTHING;
	INSERT INTO model (name) VALUES ('Exemplo 4') ON CONFLICT (name) DO NOTHING;
	`);
}

export async function down(pg) {
  await pg.exec(`DROP TABLE model`);
}
