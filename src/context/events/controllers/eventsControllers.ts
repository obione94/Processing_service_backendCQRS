import { Request, Response } from 'express';
import { Event } from '../domain/entities/Event';
import { v4 as uuidv4 } from 'uuid';
import { creationService } from '../application/creationService';
import { CassandraEventRepositories} from '../infrastructure/repositories/CassandraEventRepositories';

export const events = async (req: Request, res: Response): Promise<void> => {
  try {
    const cassandraEventRepositories:CassandraEventRepositories = new CassandraEventRepositories();
    const events = await cassandraEventRepositories.getAllEvents();
    res.status(200).json({
      status: 'success',
      message: events,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des events'
    });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const event = {
            "id":uuidv4(),
            "aggregate_id":"bd8b2ce7-f99c-49f9-a1fd-a43e6ae16d3d",
            "event_name":"UserCreated",
            "event_state":"created",
            "event_type":"create",
            "event_data":"{\"name\":\"John\",\"age\":30}",
            "event_priority":1,
            "event_metadata":{},
        } as Event

        creationService(event);

        res.status(200).json({
            status: 'success',
            message: [event],
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erreur lors de l\'insertion de l\'event'
        });
    }
};