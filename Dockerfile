FROM node:16.18.0-alpine

# Set working directory
WORKDIR /app

# Copy packages to working directory
COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production
RUN npm install --force

# Copy source code to working directory
COPY . ./

# Expose to port 9000
EXPOSE 9000

# Start command as per package.json
CMD ["npm", "start"]