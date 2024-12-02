export async function up(pg) {
	await pg.exec(`CREATE TABLE IF NOT EXISTS student (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE
	
	);
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','um','student@academyuniverse.site') ON CONFLICT (email) DO NOTHING;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','dois','student2@academyuniverse.site') ON CONFLICT (email) DO NOTHING;;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','três','student3@academyuniverse.site') ON CONFLICT (email) DO NOTHING;;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','quatro','student4@academyuniverse.site') ON CONFLICT (email) DO NOTHING;;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','cinco','student5@academyuniverse.site') ON CONFLICT (email) DO NOTHING;;

	`);
}

export async function down(pg) {
	await pg.exec(`DROP TABLE student`);
}
