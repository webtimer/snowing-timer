#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail
set -o xtrace

readonly SCRIPT_DIR="$(cd "$(dirname "$0")"; pwd)"
readonly PROJECT_HOME="${SCRIPT_DIR}/.."
readonly PROJECT_NAME="$(basename "$(cd "${PROJECT_HOME}"; pwd)")"

readonly IMAGE_NAME='node:12.14.1-alpine3.11'

docker run \
  --rm \
  -it \
  -v "${PROJECT_HOME}:/${PROJECT_NAME}" \
  -w "/${PROJECT_NAME}" \
  "${IMAGE_NAME}" \
  "$@"
