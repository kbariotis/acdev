#!/bin/bash

mysql -hmysql -u $MYSQL_USER -p$MYSQL_ROOT_PASSWORD -hmysql < /backend/db-structure/db-example.sql
