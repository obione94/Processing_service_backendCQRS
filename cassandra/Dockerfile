FROM cassandra:4.1.3

ENV LANG C.UTF-8

USER root
RUN apt-get update && apt-get install -y gettext && rm -rf /var/lib/apt/lists/*

COPY cassandra.yaml.template /etc/cassandra/cassandra.yaml.template

# Copier tous les scripts CQL dans le dossier dédié
COPY cql-scripts/*.cql /docker-entrypoint-initdb.d/

# Copier le script d'entrée personnalisé
COPY entrypoint.sh /

# Rendre le script d'entrée exécutable
RUN chmod +x /entrypoint.sh

# Remplacer l'entrypoint par notre script custom
ENTRYPOINT ["/entrypoint.sh"]

# Commande par défaut pour lancer cassandra en premier plan
CMD ["cassandra", "-f"]