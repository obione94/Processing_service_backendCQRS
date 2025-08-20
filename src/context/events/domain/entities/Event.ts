
import { v4 as uuidv4 } from 'uuid';

export interface Event {
  id: string; // UUID unique de l'événement
  aggregate_id: string; // UUID de l’agrégat (ex: user id)
  event_name: string; // Nom fonctionnel de l'événement (ex: UserCreated)
  event_state: string; // État de l’événement ('created', 'deleted', etc.)
  event_type: string; // Nature (ex: 'create', 'update', 'delete')
  event_data: string; // Données métier, souvent au format JSON sérialisé
  event_priority: number; // Priorité de traitement
  event_metadata: Record<string, string>; // Métadonnées additionnelles
}