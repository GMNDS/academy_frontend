export async function up(pg) {
  await pg.exec(`CREATE TABLE IF NOT EXISTS class (
    id SERIAL PRIMARY KEY,
    professor_id INTEGER NOT NULL REFERENCES professor(id),
    subject_id INTEGER NOT NULL REFERENCES subject(id) ON DELETE CASCADE,
    name TEXT NOT NULL
  );
  INSERT INTO class (professor_id, subject_id, name) VALUES (1, 1, 'Turma A');
  INSERT INTO class (professor_id, subject_id, name) VALUES (1, 2, 'Turma B');
  INSERT INTO class (professor_id, subject_id, name) VALUES (1, 3, 'Turma C');
  INSERT INTO class (professor_id, subject_id, name) VALUES (2, 4, 'Turma D');
  INSERT INTO class (professor_id, subject_id, name) VALUES (2, 5, 'Turma E');
  `);
}

export async function down(pg) {
  await pg.exec(`DROP TABLE class`);
}
