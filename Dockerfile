FROM node:20-alpine3.16 AS builder
COPY . /app/MTSection
WORKDIR /app/MTSection
RUN npm i --force
RUN npx prisma generate 
RUN npm run build
COPY .env /app/MTSection/dist
RUN npm i pm2 -g

CMD ["pm2-runtime", "ecosystem.config.js"]

# FROM node:20-alpine3.16 AS runner
# WORKDIR /app
# RUN npm i pm2 -g
# COPY --from=builder /app/MTSection/dist ./dist
# COPY --from=builder /app/MTSection/.env ./dist
# COPY --from=builder /app/MTSection/ecosystem.config.js .