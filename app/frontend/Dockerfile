FROM node:16.14-alpine
WORKDIR /app-frontend
COPY ["package.json", "package-lock.json*", "./" ]
RUN npm install
COPY . /app-frontend/
CMD ["npm", "start"]
