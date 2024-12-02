export async function up(pg) {
	await pg.exec(`CREATE TABLE IF NOT EXISTS campus (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL UNIQUE
	
	);
	INSERT INTO campus (name) VALUES ('Diadema') ON CONFLICT (name) DO NOTHING;
	INSERT INTO campus (name) VALUES ('Santo andré') ON CONFLICT (name) DO NOTHING;
	INSERT INTO campus (name) VALUES ('São Caetano') ON CONFLICT (name) DO NOTHING;
	INSERT INTO campus (name) VALUES ('Mauá') ON CONFLICT (name) DO NOTHING;
	`);
}

export async function down(pg) {
	await pg.exec(`DROP TABLE campus`);
}
