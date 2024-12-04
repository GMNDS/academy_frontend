export async function up(pg) {
  await pg.exec(`CREATE TABLE IF NOT EXISTS course (
		id SERIAL PRIMARY KEY,
		coordenador_id INTEGER NOT NULL UNIQUE REFERENCES professor(id) ON DELETE CASCADE,
		name TEXT NOT NULL,
		description TEXT NOT NULL,
		category TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT NOW(),
		status boolean DEFAULT TRUE
	);
  
	INSERT INTO course (coordenador_id,name,description,category) VALUES ('1','Curso de Go','Aprenda desenvolver em GO','Programação');
	INSERT INTO course(coordenador_id,name,description,category) VALUES ('2','Curso de Python','Aprenda desenvolver em Python','Programação');
	INSERT INTO course(coordenador_id,name,description,category) VALUES ('3','Curso de Java','Aprenda desenvolver em Java','Programação');
	INSERT INTO course(coordenador_id,name,description,category) VALUES ('4','Curso de C#','Aprenda desenvolver em C#','Programação');
	`);
}

export async function down(pg) {
  await pg.exec(`DROP TABLE course`);
}
