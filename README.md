# blocks
Privacy oriented note taking app

# setting up database

```
cd database
podman pull docker.io/postgres
podman run --name blocks-db -e POSTGRES_PASSWORD=123123 -p 5432:5432 -d postgres
podman exec -i blocks-db bash -c 'exec psql -U postgres' < database.sql
```