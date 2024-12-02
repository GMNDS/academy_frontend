export async function up(pg) {
	await pg.exec(`CREATE TABLE IF NOT EXISTS professor (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		last_name TEXT NOT NULL
	);
	INSERT INTO professor (name,last_name) VALUES ('Professor','um');
	INSERT INTO professor (name,last_name) VALUES ('Professor','dois');
	INSERT INTO professor (name,last_name) VALUES ('Professor','três');
	INSERT INTO professor (name,last_name) VALUES ('Professor','quatro');
	INSERT INTO professor (name,last_name) VALUES ('Professor','cinco');
	INSERT INTO professor (name,last_name) VALUES ('Professor','seis');
	`);
}

export async function down(pg) {
	await pg.exec(`DROP TABLE professor`);
}
