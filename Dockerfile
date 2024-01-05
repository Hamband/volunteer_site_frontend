FROM node:18 AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN BASE_PATH=/volunteer npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/build /usr/share/nginx/html
