import { EventRepositories } from '../repositories/EventRepositories';

export async function EventVersion(aggregateId:string,CassandraEventRepositories:EventRepositories):Promise<number> {
    const count = await CassandraEventRepositories.getCountAggergateId(aggregateId);
    return count +1 ;
}