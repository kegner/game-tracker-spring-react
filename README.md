# Game Tracker

Game Tracker is a fullstack Spring Boot/React/PostgreSQL webapp to keep a running list of video games to play or games you have played.


## Build Instructions


#### Setup the DB

* Install [PostgreSQL](https://www.postgresql.org/download/) on your system (or download [PgAdmin](https://www.postgresql.org/download/) for a database GUI tool).
* Create a new database. The `application.properties` file will default to look for a `game_tracker` database.
* Run the SQL script `/scripts/create_schema.sql`

#### Run the Spring Boot backend (and build the frontend)

* Add the database credentials to the `application.properties` file
```
spring.datasource.url=jdbc:postgresql://localhost:5432/game_tracker
spring.datasource.username=postgres
spring.datasource.password=
```
* `mvn clean install` to create the jar
* `java -jar game-tracker-[version].jar`
or
* `mvn spring-boot:run` to do a clean install and run

This will default to running the app on 8080 if you are using HTTP. You may use the `server.port` property in the `application.properties` file to change it.

HTTPS may be set up by adding a p12 certficate and password to the ssl properties.
```
server.ssl.key-store-type=PKCS12
server.ssl.key-store=
server.ssl.key-store-password=
server.ssl.key-alias=
server.ssl.enabled=false
```

#### Run the React frontend (for development)

Running the frontend separately while developing allows for faster iteration by utilizing React's hot reloading.

* Navigate to the `/client/` folder
* Run the command `npm start`. This will start the app on localhost:3000

Confirm the `package.json` file has the correct port for your Spring Boot applicaton.

```
"proxy": "http://localhost:8080/",
```

## Custom Properties

* `user.create-default-user` (defaults to false)

This property may be used to create a default user. This user can be used immediately to login to the system without needing to create a new user. This is useful when using the `create` option for `spring.jpa.hibernate.ddl-auto` since it will rebuild the database.
