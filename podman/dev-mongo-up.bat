:: This batch ....
ECHO OFF
podman network create dev-mongo
podman run -d -p 27017:27017 --name dev-mongo --network dev-mongo docker.io/library/mongo

podman container list -a

podman run -d --name dev-mongo-express -e ME_CONFIG_MONGODB_SERVER=dev-mongo --network dev-mongo -e ME_CONFIG_MONGODB_PORT=27017 -p 8081:8081 docker.io/library/mongo-express

podman container list -a