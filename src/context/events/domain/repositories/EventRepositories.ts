import { types } from "cassandra-driver"
import { EventAggregateRoot } from "../aggregates/EventAggregateRoot"

export interface EventRepositories {
    getAllEvents(): Promise<types.Row[]>
    createEvent(event: EventAggregateRoot): Promise<any>
    getCountAggergateId(aggregateId: string): Promise<number>
}