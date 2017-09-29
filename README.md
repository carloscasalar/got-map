# Game of Thrones interactive map

This repository is the result of follow steps in tutorials [Build An Interactive Game of Thrones Map (Part I) - Node.js, PostGIS, and Redis](https://blog.patricktriest.com/game-of-thrones-map-node-postgres-redis/) and [part 2](https://blog.patricktriest.com/game-of-thrones-leaflet-webpack/).

I'll use [nestjs](http://nestjs.com/) instead of "naked" express. 

I'll use dockerized verions of PostgreSQL and Redis.

## PostgreSQL

I'll use this postgis image: [mdillon/postgis](https://hub.docker.com/r/mdillon/postgis/) based on the [official alpine postgreSQL docker image](https://hub.docker.com/_/postgres/).

## Run application
To run the current version of application first start database with `docker-compose up`. 
Then go to `/server` and run `npm start`.

At this time the only endpoint implemented is `/time` witch shows database actual time.

By default, server will listen in port 3000.

Currently the docker-compose does not contains server configuration, only database.
