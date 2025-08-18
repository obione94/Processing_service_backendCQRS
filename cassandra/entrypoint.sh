#!/bin/bash
set -e

# Start Cassandra en arrière-plan
cassandra -R -f &

CASSANDRA_PID=$!

# Attendre que Cassandra soit prêt à accepter des connexions cqlsh
until cqlsh -e 'describe cluster' > /dev/null 2>&1; do
  echo "En attente du démarrage de Cassandra..."
  sleep 5
done

# Exécuter les scripts CQL d'initialisation
for f in /docker-entrypoint-initdb.d/*.cql; do
  echo "Exécution du script $f"
  cqlsh -f $f
done

echo "fin"

# Attendre que Cassandra se termine (habituellement jamais)
wait $CASSANDRA_PID
