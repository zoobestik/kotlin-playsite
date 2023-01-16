#!/usr/bin/env bash

PWD=$(pwd)
IMAGE="kotlin-playsite-test"

docker build --rm -t "$IMAGE" -f "$PWD/test.dockerfile" .
docker run -it --rm -v "$PWD":/app -v "/app/node_modules/" "$IMAGE" /bin/bash -c "npm ci && TEST_PROJECT_LIST=short npm run test:snapshots"
docker rmi "$IMAGE"

npm ci
