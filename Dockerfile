FROM node:14-alpine

ARG env_name

# Create app directory
WORKDIR /app

# Bundle app source (node_modules are excluded)
COPY . .

# Install package dependencies 
RUN npm install

# Build react next app 
RUN npm run build

# Install PM2 
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:rotateInterval '0 * * * *'

# Generate pm2.json file 
RUN printf '{\n "name": "%s", \n "cwd":"%s",\n "script": "%s",\n "merge_logs"  : true,\n "exec_mode": "%s",\n "instances"  : 2,\n "env" : {\n  "NODE_ENV": "%s"\n } \n}\n' "fo-frontend" "/app" "src/server.js" "cluster_mode" "${env_name}"> pm2.json
RUN chmod +x run.sh

EXPOSE 3000

ENV NODE_ENV=${env_name}


CMD [ "pm2-runtime", "start", "pm2.json"]



