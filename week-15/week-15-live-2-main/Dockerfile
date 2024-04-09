FROM node:20

WORKDIR /usr/src/app

COPY package* .
COPY ./prisma .

RUN npm install 
RUN npx prisma generate

# We don't often change package.json and prisma schema in our project, so to optimize the docker image build, we need to make as much as layers cached. line 8 depends on line 5 and line 9 depends on line 6, so unless 5/6 changes, everything till 9 is cached. 

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js", ]