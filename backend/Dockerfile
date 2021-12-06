FROM node:14-alpine as builder

WORKDIR /app

COPY tsconfig.json .
COPY package.json .
COPY yarn.lock .
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn run build

FROM node:14-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules .
COPY --from=builder /app .

CMD ./start.sh