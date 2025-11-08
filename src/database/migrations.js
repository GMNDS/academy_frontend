import { PGlite } from "https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js";

let pg;

export async function runMigrations() {
  const response = await fetch("https://olcademy.astrum.app.br/migrations/");
  const files = (await response.json()).map((obj) => obj.name);

  pg = await PGlite.create("idb://pgdata");

  await pg.exec(`CREATE TABLE IF NOT EXISTS migrations (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
)`);

  await pg.exec(`CREATE TABLE IF NOT EXISTS migrations_counter (
	id INTEGER PRIMARY KEY,
	counter INTEGER NOT NULL
);
INSERT INTO migrations_counter (id,counter) VALUES (1,0) ON CONFLICT (id) DO NOTHING;
	`);

  const migration_counter = (
    await pg.query(`SELECT counter FROM migrations_counter`)
  ).rows[0].counter;

  if (migration_counter < files.length) {
    for (let i in files) {
      if (i < migration_counter) {
        continue;
      }

      const { up } = await import(`./migrations/${files[i]}`);
      await up(pg);
      console.log(`Migration ${files[i]} executada com sucesso`);
      await pg.exec(
        `INSERT INTO migrations (name) VALUES ('${files[i]}') ON CONFLICT (name) DO NOTHING`
      );
      await pg.exec(`UPDATE migrations_counter SET counter = counter + 1`);
    }
  }
}

export async function executeQuery(query) {
  const pg = await PGlite.create("idb://pgdata");
  const result = await pg.query(query);
  return result.rows;
}

export { pg };
