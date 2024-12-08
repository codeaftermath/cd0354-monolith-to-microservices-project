#!/usr/bin/env bash

set -x -e -u -o pipefail

kubectl version

kubectl apply -f ./aws-secret.yaml
kubectl apply -f ./env-secret.yaml
kubectl apply -f ./env-configmap.yaml
