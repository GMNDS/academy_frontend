export async function up(pg) {
  await pg.exec(`CREATE TABLE IF NOT EXISTS student (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE
	
	);
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','um','student@olcademy.astrum.app.br') ON CONFLICT (email) DO NOTHING;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','dois','student2@olcademy.astrum.app.br') ON CONFLICT (email) DO NOTHING;;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','três','student3@olcademy.astrum.app.br') ON CONFLICT (email) DO NOTHING;;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','quatro','student4@olcademy.astrum.app.br') ON CONFLICT (email) DO NOTHING;;
	INSERT INTO student (name,last_name,email) VALUES ('Aluno','cinco','student5@olcademy.astrum.app.br') ON CONFLICT (email) DO NOTHING;;

	`);
}

export async function down(pg) {
  await pg.exec(`DROP TABLE student`);
}
