
var migration1755428028 = {
   up: function (db, handler) {
    db.execute(
      `CREATE TABLE events (
        id UUID,
        aggregate_id UUID,
        event_name text,
        event_state text,
        event_type text,
        event_data text,
        event_priority int,
        event_version int,
        event_metadata map<text,text>,
        event_retries int,
        event_start timestamp,
        event_end timestamp,
        event_timestamp timestamp,
        PRIMARY KEY ((aggregate_id), event_version)
      ) WITH CLUSTERING ORDER BY (event_version ASC);`,
      null,
      {
        prepare: true
      },
      function (err) {
        handler(err, null);
      });
  },
  down: function (db, handler) {
    db.execute(
      `DROP TABLE events;`,
      null,
      {
        prepare: true
      },
      function (err) {
        handler(err, null);
      });
  }
};
module.exports = migration1755428028;