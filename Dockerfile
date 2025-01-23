FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=512" npm run build

CMD ["node", ".output/server/index.mjs"]

EXPOSE 3000