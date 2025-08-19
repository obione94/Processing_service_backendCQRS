import { connect } from '../db/cassandraClient';
import { EventAggregateRoot } from '../../domain/aggregates/EventAggregateRoot';

export async function getAllEvents() {
  const client = await connect();
  const query = 'SELECT * FROM events';
  const result = await client.execute(query);
  return result.rows;
}

export async function createEvent(event: EventAggregateRoot) {
  const client = await connect();
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

  return await client.execute(query, params, { prepare: true });
}


