export async function up(pg) {
	await pg.exec(`CREATE TABLE IF NOT EXISTS enroll (
		id SERIAL PRIMARY KEY,
		student_id INTEGER NOT NULL REFERENCES student(id),
		course_id INTEGER NOT NULL  REFERENCES course(id),
		created_at TIMESTAMP DEFAULT NOW(),
		status BOOLEAN DEFAULT TRUE
	);
	INSERT INTO enroll (student_id,course_id) VALUES ('1','1');
	INSERT INTO enroll (student_id,course_id) VALUES ('2','1');
	INSERT INTO enroll (student_id,course_id) VALUES ('3','1');
	INSERT INTO enroll (student_id,course_id) VALUES ('4','2');
	INSERT INTO enroll (student_id,course_id) VALUES ('5','2');
	`);
}

export async function down(pg) {
	await pg.exec(`DROP TABLE enroll`);
}
