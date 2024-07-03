


# Start 

`pnpm install`

`pnpm run -r dev`

## Docker + Env

```bash
$ cat env.example > .server.env
$ docker-compose --env-file .server.env up -d
```

## Migrations

`pnpm run -r migrate`

# Where

Client: `http://localhost:5173/`

Server: `http://localhost:4444/`
  -  Hit TRPC endpoint: `curl -X GET "http://localhost:4444/trpc/userList" -H 'content-type: application/json'`
-  

