FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
COPY . .
RUN npx tsc -b


CMD ["node","index.js"]