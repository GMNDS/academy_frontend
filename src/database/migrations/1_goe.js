export async function up(pg) {
  await pg.exec(`CREATE TABLE IF NOT EXISTS goe (
		id SERIAL PRIMARY KEY,
		campus_id INTEGER NOT NULL REFERENCES campus(id) ON DELETE CASCADE,
		name TEXT NOT NULL,
		last_name TEXT NOT NULL
	
	);
	INSERT INTO goe (name,last_name,campus_id) VALUES ('Adminstrador','um','1');
	`);
}

export async function down(pg) {
  await pg.exec(`DROP TABLE goe`);
}
