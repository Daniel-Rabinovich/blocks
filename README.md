# About
Privacy oriented note taking app [Demo](https://mdblocks.xyz)


* The data is encrypted with AES-256 in the frontend before sent to the backend.
* Use markdown to style your notes
* Simple registration


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