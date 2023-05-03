

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