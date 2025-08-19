
var migration1755428028 = {
   up: function (db, handler) {
    db.execute(
      `CREATE TABLE users (
        id UUID PRIMARY KEY,
        user_name text,
        user_email text,
        user_birthday date,
        user_password text,
        user_role text,
        user_status text,
        user_created_at timestamp,
        user_updated_at timestamp,
        user_deleted_at timestamp,
        user_activated_at timestamp,
        user_deactivated_at timestamp
      );`,
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