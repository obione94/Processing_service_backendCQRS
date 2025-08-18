import { connect } from '../../infrastructure/db/cassandraClient';

export async function getAllUsers() {
  const client = await connect();
  const query = 'SELECT * FROM shopping_cart';
  const result = await client.execute(query);
  return result.rows;
}
