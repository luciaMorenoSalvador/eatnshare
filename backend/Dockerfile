FROM node:16-alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY tsconfig.json .
COPY . .

RUN yarn run build

FROM node:14-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules .
COPY --from=builder /app .

CMD ./start.sh