export async function up(pg) {
	await pg.exec(`CREATE TABLE IF NOT EXISTS class (
		id SERIAL PRIMARY KEY,
		professor_id INTEGER NOT NULL REFERENCES professor(id),
		subject_id INTEGER NOT NULL  REFERENCES subject(id)
	);
	INSERT INTO class (professor_id,subject_id) VALUES ('1','1');
	INSERT INTO class (professor_id,subject_id) VALUES ('1','2');
	INSERT INTO class (professor_id,subject_id) VALUES ('1','3');
	INSERT INTO class (professor_id,subject_id) VALUES ('2','4');
	INSERT INTO class (professor_id,subject_id) VALUES ('2','5');
	`);
}

export async function down(pg) {
	await pg.exec(`DROP TABLE class`);
}
