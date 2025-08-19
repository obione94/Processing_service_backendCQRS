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
  ) {}



}