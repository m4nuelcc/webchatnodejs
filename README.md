# webchatnodejs
CREAR CONTENEDOR DE DOCKERFILE
11 build -t webchat .

PARA EJECUTAR EL CONTENEDOR DOCKERFILE
12 docker run -p 4000:3000 webchat


SUBIR IMAGEN A DOCKER HUB
13 docker login
13 docker tag  webchat malok0/webchat:v1
14 docker push malok0/webchat:v1

CREACCION FICHERO DOCKER-COMPOSE
15  docker-compose.yml

PARA CONSTRUIR EL CONTENEDOR DE COMPOSE
16 docker-compose build

PARA EJECUTAR CONTENEDOR
17 docker-compose up