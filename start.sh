(cd api-gateway && npm install && npm run start:dev) &
(cd auth-service && npm install && npm run start:dev) &
(cd user-service && npm install && npm run start:dev)

wait
