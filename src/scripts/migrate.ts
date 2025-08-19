import { Client, auth } from 'cassandra-driver';
import * as fs from 'fs';
import * as path from 'path';

const client = new Client({
  contactPoints: ['cassandra'], // nom du conteneur Cassandra sur le réseau docker
  localDataCenter: 'dc1', // comme dans docker-compose (CASSANDRA_DC)
  keyspace: 'keyspace', // à adapter selon ton usage
  protocolOptions: { port: 9042 }, // port CQL exposé par Cassandra
  authProvider: new auth.PlainTextAuthProvider('cassandra', 'password123')

});

async function applyMigrations() {
  const migrationsDir = path.join(__dirname, '../migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.cql')).sort();

  for (const file of files) {
    const query = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log(`Applying migration: ${file}`);
    await client.execute(query);
  }

  await client.shutdown();
  console.log('Migrations applied!');
}

applyMigrations().catch(console.error);