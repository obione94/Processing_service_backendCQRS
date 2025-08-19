import { Request, Response } from 'express';
import { getAllEvents, createEvent } from '../infrastructure/repositories/EventRepositories';
import { Event } from '../domain/entities/Event';
import { v4 as uuidv4 } from 'uuid';
import { creationService } from '../application/creationService';

export const events = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await getAllEvents();
    res.status(200).json({
      status: 'success',
      message: events,
    });
  } catch (error) {
    console.error(error);
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
            "aggregate_id":uuidv4(),
            "event_name":"UserCreated",
            "event_state":"created",
            "event_type":"create",
            "event_data":"{\"name\":\"John\",\"age\":30}",
            "event_priority":1,
            "event_version":1,
            "event_metadata":{},
            "event_retries":0,
            "event_start":null,
            "event_end":null,
            "event_timestamp":new Date()
        } as Event

        const eventAggregate = creationService(event);
    
        res.status(200).json({
            status: 'success',
            message: [event, eventAggregate],
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Erreur lors de l\'insertion de l\'event'
        });
    }
};