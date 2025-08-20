import { v4 as uuidv4 } from 'uuid';
import { EventVersion } from "../valueObjects/EventVersion";
import { Event } from '../entities/Event';

export class EventAggregateRoot {

  constructor(
    public id: string,
    public aggregate_id: string,
    public event_name: string,
    public event_state: string,
    public event_type: string,
    public event_data: string,
    public event_priority: number,
    public event_version: number,
    public event_metadata: Record<string, string>,
    public event_retries: number,
    public event_start: Date | null,
    public event_end: Date | null,
    public event_timestamp: Date
  ) {
  }

  static async generate(event:Event,eventVersion:number):Promise<EventAggregateRoot>{
 
    const timestamp = new Date();

    return new EventAggregateRoot(
      event.id,
      event.aggregate_id,
      event.event_name,
      event.event_state,
      event.event_type,
      event.event_data,
      event.event_priority,
      eventVersion,
      event.event_metadata,
      0,
      null,
      null,
      timestamp
    );
  }

}
