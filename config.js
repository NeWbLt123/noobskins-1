module.exports = {
    "pg": {
        "username": "postgres",
        "password": "postgres",
        "database": "noobskins",
        "dialect": "postgres",
        "port": 5432
    },
    "authentication": {
    	"secret": "bananaSecret"
    },
    "host": {
      "development": {
        "host": "http://localhost:8080"
      },
      "production": {
        "host": "https://noobskins-2.herokuapp.com"
      }
    }
};
