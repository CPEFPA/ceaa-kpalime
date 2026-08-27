FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY ../../database/prisma ./prisma/

# Installer les dépendances
RUN npm install

# Générer Prisma Client
RUN npx prisma generate

# Copier le reste du code
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
