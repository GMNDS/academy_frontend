export async function up(pg) {
  await pg.exec(`CREATE TABLE IF NOT EXISTS class_enroll (
    id SERIAL PRIMARY KEY,
    enroll_id INTEGER NOT NULL REFERENCES enroll(id),
    class_id INTEGER NOT NULL REFERENCES class(id),
    grade_id INTEGER NOT NULL UNIQUE REFERENCES grade(id),
    status BOOLEAN NOT NULL 
  );
  INSERT INTO class_enroll (enroll_id, class_id, grade_id, status) VALUES (1, 1, 1, TRUE);
  INSERT INTO class_enroll (enroll_id, class_id, grade_id, status) VALUES (2, 1, 2, TRUE);
  INSERT INTO class_enroll (enroll_id, class_id, grade_id, status) VALUES (3, 2, 3, TRUE);
  INSERT INTO class_enroll (enroll_id, class_id, grade_id, status) VALUES (4, 2, 4, TRUE);
  INSERT INTO class_enroll (enroll_id, class_id, grade_id, status) VALUES (5, 3, 5, TRUE);
  `);
}

export async function down(pg) {
  await pg.exec(`DROP TABLE class_enroll`);
}
