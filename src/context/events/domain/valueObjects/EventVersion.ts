import { v4 as uuidv4 } from 'uuid';
import { connect } from '../../infrastructure/db/cassandraClient';

export async function EventVersion():Promise<Number> {
    const client = await connect();
    const query = `SELECT count(*) as eventVersion FROM events WHERE aggregate_id = ?`;
    const params = ["eee"];
    const result = await client.execute(query, params, { prepare: true });
    
    return result.rows[0]["eventVersion"] +1 ;
}