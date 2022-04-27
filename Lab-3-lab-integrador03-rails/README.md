# Laboratorio II: 

### Instrucciones Proyecto rails:
### Build

  * docker-compose run --no-deps web rails new . --force --database=postgresql
  * docker-compose build
  * docker-compose up
  
### Crear base de datos:

  * docker-compose run web rake db:create

### Modificar el archivo de configuracion de DB de Rails (con el editor que prefieras)
  
  * vi config/database.yml
  
  1. username: postgres
  2. password: password
  3. host: db

  http://localhost:3000