export async function up(pg) {
  await pg.exec(`CREATE TABLE IF NOT EXISTS grade (
    id SERIAL PRIMARY KEY,
    p1 FLOAT,
    p2 FLOAT,
    t FLOAT,
    grade FLOAT
  );
  INSERT INTO grade (p1, p2, t, grade) VALUES (8.5, 7.0, 9.0, 8.2);
  INSERT INTO grade (p1, p2, t, grade) VALUES (6.0, 5.5, 7.0, 6.2);
  INSERT INTO grade (p1, p2, t, grade) VALUES (9.0, 8.5, 8.0, 8.5);
  INSERT INTO grade (p1, p2, t, grade) VALUES (7.5, 6.0, 7.5, 7.0);
  INSERT INTO grade (p1, p2, t, grade) VALUES (8.0, 7.5, 8.5, 8.0);
  `);
}

export async function down(pg) {
  await pg.exec(`DROP TABLE grade`);
}
