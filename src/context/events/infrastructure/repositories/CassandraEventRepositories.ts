import { client } from '../db/cassandraClient';
import { EventAggregateRoot } from '../../domain/aggregates/EventAggregateRoot';
import { types } from 'cassandra-driver';
import { EventRepositories } from '../../domain/repositories/EventRepositories';

export class CassandraEventRepositories implements EventRepositories {
  
  //constructor(private cassandraClient: any) {} // Type adapté à ton driver

   async getAllEvents(): Promise<types.Row[]> {
    const query = 'SELECT * FROM events';
    const result = await client.execute(query);
    
    return result.rows;
  }

  async getCountAggergateId(aggregateId: string): Promise<number> {
    const query = `SELECT count(*) as eventVersion FROM events WHERE aggregate_id = ?`;
    const params = [aggregateId];
    const result = await client.execute(query, params, { prepare: true });
    
    return result.rows[0].eventversion.toNumber();
  }

  async createEvent(event: EventAggregateRoot): Promise<void> {
    const query = `
      INSERT INTO events (
        id,
        aggregate_id,
        event_name,
        event_state,
        event_type,
        event_data,
        event_priority,
        event_version,
        event_metadata,
        event_retries,
        event_start,
        event_end,
        event_timestamp
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const params = [
      event.id,
      event.aggregate_id,
      event.event_name,
      event.event_state,
      event.event_type,
      event.event_data,
      event.event_priority,
      event.event_version,
      event.event_metadata,
      event.event_retries,
      event.event_start,
      event.event_end,
      event.event_timestamp,
    ];

    client.execute(query, params, { prepare: true });
  }

}


