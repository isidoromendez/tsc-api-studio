:: This batch ....
ECHO OFF
ECHO Stopping mongo...
podman container stop dev-mongo-express
podman container rm dev-mongo-express
podman container stop dev-mongo
podman container rm dev-mongo
podman network rm dev-mongo
podman container list -a