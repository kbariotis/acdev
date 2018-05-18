FROM node:8.11.1-onbuild

#INSTALL
RUN apt-get update -y

#workaround to mount the directory for dev without having to rerun npm i
RUN mkdir -p /dist/
ADD package.json /dist/
# Install packages
RUN cd /dist && npm install
ENV NODE_PATH /dist/node_modules
ENV PATH=/dist/node_modules/.bin/:$PATH

RUN mkdir /frontend
WORKDIR /frontend

# Make everything available for start
ADD . /frontend

EXPOSE  3001
