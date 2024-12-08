#!/usr/bin/env bash

set -x -e -u -o pipefail

kubectl version

kubectl apply -f ./aws-secret.yml
kubectl apply -f ./env-secret.yml
kubectl apply -f ./env-configmap.yml
