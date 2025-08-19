import { EventAggregateRoot } from "../domain/aggregates/EventAggregateRoot";
import { Event } from "../domain/entities/Event";
import { createEvent } from '../infrastructure/repositories/EventRepositories';

export const creationService = async (event:Event): Promise<void> => {
    try {
        console.log(event);

        const aggregateRoot:EventAggregateRoot = new EventAggregateRoot(
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
            event.event_timestamp
        );

        const result = await createEvent(aggregateRoot);
        console.log(result);
    } catch (error) {
        
    }
};
