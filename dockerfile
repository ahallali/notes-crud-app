
FROM node:18


WORKDIR /app


COPY package.json ./

RUN npm install  --legacy-peer-deps


COPY . .

RUN npx prisma generate migrate deploy


RUN npm run build 


EXPOSE 3000


CMD ["npm", "start"]
