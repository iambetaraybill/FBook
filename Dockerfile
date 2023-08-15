FROM node:18.14.1-alpine AS build
WORKDIR /dist/src/app
COPY . .
RUN npm install
RUN npm run build --prod
FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/fbook /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 4201
