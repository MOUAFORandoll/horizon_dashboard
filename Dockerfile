
# # Build stage 
# FROM node:14 as build-stage

# # Install dependencies
# RUN apt-get update && apt-get install -y \
#     openssl 

# WORKDIR /app
# RUN rm -rf node_modules package-lock.json

# COPY package*.json ./

# # RUN npm config set registry https://registry.npmjs.org/
# # RUN npm cache clean --force
# RUN npm -v 
# RUN npm install webpack@^5.0.0 --save-dev

# RUN npm install vue-loader@latest --save-dev




# RUN npm install
# RUN export NODE_OPTIONS=–openssl-legacy-provider

# COPY . .
# RUN npm run build


# # Production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# Utilisation d'une image Node.js
# FROM node:14-alpine

# # Création d'un répertoire pour l'application
# WORKDIR /app

# # Copie des fichiers package.json et package-lock.json dans le répertoire de travail
# COPY package*.json ./

# # RUN npm install webpack@^5.0.0 --save-dev

# RUN npm install vue-loader@latest --save-dev
# # Installation des dépendances
# RUN npm install

# # Copie des fichiers de l'application dans le répertoire de travail
# COPY . .

# # Build de l'application
# RUN npm run build

# # Exposition du port 8080
# EXPOSE 8080

# # Commande pour lancer l'application
# CMD [ "npm", "run", "serve" ]


#  build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/
# RUN npm install vue-loader@latest --save-dev
RUN npm install --force
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


#Ceci est une alternative d'attente

# # Utiliser une image de nginx stable
# FROM nginx:stable

# # Copier les fichiers de build dans le répertoire de publication nginx
# COPY dist/ /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # Exposer le port 80
# EXPOSE 80

# # Démarrer le serveur nginx
# CMD ["nginx", "-g", "daemon off;"]
