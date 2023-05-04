FROM node:15-alpine as build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run prod


FROM nginx:1.19-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

#docker build -t pod-isante-ui .
#docker tag pod-isante-ui lahcenezinnour/pod-isante-ui:latest
#docker push lahcenezinnour/pod-isante-ui
