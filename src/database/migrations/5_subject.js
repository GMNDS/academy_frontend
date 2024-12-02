export async function up(pg) {
	await pg.exec(`CREATE TABLE IF NOT EXISTS subject (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL UNIQUE,
		code TEXT NOT NULL UNIQUE
	
	);
	INSERT INTO subject (name,code) VALUES ('Algoritmos e lógica de programação', 'ALP1') ;
	INSERT INTO subject (name,code) VALUES ('Banco de dados', 'BD1');
	INSERT INTO subject (name,code) VALUES ('Engenharia de software', 'ES1');
	INSERT INTO subject (name,code) VALUES ('Programação orientada a objetos', 'POO1');
	INSERT INTO subject (name,code) VALUES ('Programação web', 'PW1');
	`);
}

export async function down(pg) {
	await pg.exec(`DROP TABLE subject`);
}
