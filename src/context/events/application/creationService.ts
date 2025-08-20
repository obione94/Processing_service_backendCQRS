import { EventAggregateRoot } from "../domain/aggregates/EventAggregateRoot";
import { Event } from "../domain/entities/Event";
import { EventVersion } from "../domain/valueObjects/EventVersion";
import { CassandraEventRepositories } from "../infrastructure/repositories/CassandraEventRepositories";
export const creationService = async (event:Event): Promise<void> => {
    try {
        const cassandraEventRepositories:CassandraEventRepositories = new CassandraEventRepositories();
        const eventVersion = await EventVersion(event.aggregate_id,cassandraEventRepositories);
        const generateEvent:EventAggregateRoot = await EventAggregateRoot.generate(
            event,
            eventVersion
        );
        cassandraEventRepositories.createEvent(generateEvent);
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la création de l\'event');
    }
};
