FROM node:10.16.3-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /app
RUN npm install --unsafe-perm=true --allow-root
RUN npm install -g serve --unsafe-perm=true --allow-root
# start app
CMD serve -s dist/ -l 4000
