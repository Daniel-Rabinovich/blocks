# Blocks
Privacy oriented note taking app

The data is encrypted with AES in the frontend before sent to the backend, **TLS should be used**

## Setting up the database

```
cd database
podman pull docker.io/postgres
podman run --name blocks-db -e POSTGRES_PASSWORD=123123 -p 5432:5432 -d postgres
podman exec -i blocks-db bash -c 'exec psql -U postgres' < database.sql
```

## Starting backend
```
cd backend
npm install
npm start
```

## Starting frontend
```
cd frontend
npm install
npm run dev2
```