
# NPM command
    "dev": "nodemon",
    "init-db": "docker-compose -f ./builder/docker-compose.yml --env-file ./.env up -d --build db",
    "migrate": "npx prismix && prisma format && npx prisma migrate dev && npx prisma generate",
    "build": "tsc --project ./",
    "docker:build": "docker-compose -f ./builder/docker-compose.yml --env-file ./.env up -d --build mt-section",
    "prismix:set": "npm remove dotenv && npm i prismix",
    "prismix:remove": "npm remove prismix && npm i dotenv"


# Prisma migrate
> npx prisma migrate dev --name [commit msg]

# Prisma generate client
> npx prisma generate

# Kill process
netstat -ano | findstr :3300

# RUN Production mode (pm2)
pm2 start ecosystem.config.js
pm2 stop ecosystem.config.js
pm2 delete all
pm2 monit

taskkill /PID <PID> /F

sonar-scanner.bat -D"sonar.projectKey=MTSection" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9001" -D"sonar.login=sqp_1b553861913f9eac5bb234ed82a77fa25f046c24"

prismix, dotenv : conflict

## for dev
npm remove dotenv
npm i prismix --save-dev



a30df192-5e5e-40dd-b82b-c207518075e0
$2b$12$tK7SkGJRiavN7Hl1bJ.DMuA8waV.EecDGz7tIU85uZEL/v/oB4fgy