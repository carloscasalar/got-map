FROM mdillon/postgis:9.2-alpine

ARG dbuser
ARG dbpass

ENV POSTGRES_USER=$dbuser
ENV POSTGRES_PASSWORD=$dbpass

COPY docker-entrypoint-initdb.d docker-entrypoint-initdb.d