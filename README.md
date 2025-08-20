# Processing_service_backendCQRS


Voici un exemple d'insertion dans la table events pour créer, modifier, puis supprimer un utilisateur avec les événements correspondants et les champs adaptés à ta structure.

1. Insertion d'un événement création utilisateur
text
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
) VALUES (
  uuid(),                          -- id événement unique
  <user_uuid>,                    -- aggregate_id correspondant à l'id utilisateur
  'UserCreated',                  -- nom de l'événement
  'created',                     -- état de l'événement
  'create',                     -- type d'événement
  '{ "user_name": "Alice", "user_email": "alice@example.com", "user_birthday": "1990-05-15" }',  -- données JSON sérialisées
  1,                            -- priorité (1 = haute)
  1,                            -- version (premier événement de cet agrégat)
  { 'source': 'signup_form' },  -- métadonnées (facultatif)
  0,                            -- nombre de retries
  toTimestamp(now()),           -- événement commencé maintenant
  null,                         -- pas encore fini
  toTimestamp(now())            -- timestamp de l'événement
);
2. Insertion d'un événement désactivation utilisateur
text
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
) VALUES (
  uuid(),
  <user_uuid>,
  'UserDeactivated',
  'deactivated',
  'update',
  '{ "user_deactivated_at": "2025-08-18T16:00:00Z" }',
  2,
  2,
  { 'admin': 'system' },
  0,
  toTimestamp(now()),
  null,
  toTimestamp(now())
);
3. Insertion d'un événement suppression utilisateur (soft delete)
text
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
) VALUES (
  uuid(),
  <user_uuid>,
  'UserDeleted',
  'deleted',
  'delete',
  '{ "user_deleted_at": "2025-08-18T16:05:00Z" }',
  3,
  3,
  { 'admin': 'system' },
  0,
  toTimestamp(now()),
  null,
  toTimestamp(now())
);



mettre en place fixture pour tes fonctionnels