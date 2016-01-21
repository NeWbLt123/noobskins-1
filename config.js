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
    "steam": {
      "apiKey": "9A7FDCB2502234CC8844096683E583BA"
    },
    "host": {
      "development": {
        "host": "http://localhost:8080"
      },
      "production": {
        "host": "http://api.noobskins.com"
      }
    }
};
