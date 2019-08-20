#---- image for build (including dev dependencies) ----
FROM node:10.14.0 as build

#create app directory
WORKDIR /app

#install app dependencies (wildard to get package.json and package-lock.json)
COPY package*.json .npmrc tsconfig.json ./
RUN npm install

#move source code into the image
COPY schema.graphql ./
COPY src ./src/

#build it
RUN npm run build



#---- image for installing production dependencies ----
FROM node:10.14.0 as dependencies

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/.npmrc ./
RUN npm ci --only=production



#---- image for running the service ----
FROM node:10.14.0-alpine

#install what we need for gRPC
RUN apk update && apk add libc6-compat libstdc++

WORKDIR /app

#copy over only what we need
COPY database.json ./
COPY migrations ./migrations
COPY --from=build /app/package.json ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN mkdir -p /app/build
COPY --from=build /app/build ./build 
COPY --from=build /app/schema.graphql ./ 

# no need for grpc right now, but leaving this here in case it get's added to this service later, which feels likely
# RUN npm rebuild grpc

EXPOSE 5000

CMD npm run start