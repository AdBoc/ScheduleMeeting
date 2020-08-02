FROM node:14.7.0-alpine3.10 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g 

COPY . ./
EXPOSE 3000

CMD ["npm", "start"]