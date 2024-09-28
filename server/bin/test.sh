#!/bin/bash

http \
  --form POST \
  "http://localhost:5000/users/create_account/" \
  username=test \
  password=pass \
  email=test@gmail.com