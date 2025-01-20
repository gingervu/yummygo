FROM node:17

WORKDIR /app1

COPY package*.json ./

RUN npm install
RUN npm install vite-plugin-node-polyfills --save-dev
RUN rm -rf node_modules/.vite

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
