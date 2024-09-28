#!/bin/bash

http \
  --form POST \
  "http://localhost:5000/users/create_account/" \
  username=admin \
  password=pass \
  email=admin@gmail.com