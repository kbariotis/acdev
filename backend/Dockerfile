FROM node:8.11.1-onbuild

MAINTAINER Kostas Bariotis

#INSTALL
RUN apt-get update -y
RUN apt-get install -y mysql-client
RUN npm i -g supervisor

#workaround to mount the directory for dev without having to rerun npm i
RUN mkdir -p /dist/
ADD package.json /dist/
# Install packages
RUN cd /dist && npm install
ENV NODE_PATH /dist/node_modules
ENV PATH=/dist/node_modules/.bin/:$PATH


RUN mkdir /backend
WORKDIR /backend

# Make everything available for start
ADD . /backend

ADD ./db-structure/init-db.sh /init-db.sh
RUN chmod +x /init-db.sh

EXPOSE  3000
