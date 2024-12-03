# BUILD frontend with Ionic (add platform to explicitly pull available arch version of image)
FROM --platform=linux/amd64 beevelop/ionic:v2023.10.1 AS ionic

WORKDIR /usr/src/app

COPY . .
RUN npm ci -f

# Current node version is 18, need the following option to get ionic to work
ENV NODE_OPTIONS=--openssl-legacy-provider 

RUN ionic build

FROM nginx:alpine
#COPY www /usr/share/nginx/html
COPY --from=ionic  /usr/src/app/www /usr/share/nginx/html