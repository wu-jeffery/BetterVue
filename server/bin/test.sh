#!/bin/bash

http \
  --form POST \
  "http://localhost:5000/users/create_account/" \
  username=test4 \
  password=password_ni \
  email=test@gmail.com