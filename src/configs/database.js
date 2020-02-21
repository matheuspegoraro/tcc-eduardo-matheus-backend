module.exports = {
  "development": {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'dbadministrai',
    define: {
        timestamps: true,
        freezeTableName: true
    },
  },
  "staging": {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'dbadministrai',
    define: {
        timestamps: true,
        freezeTableName: true
    },
  },
  "production": {
<<<<<<< HEAD
      "use_env_variable": "DATABASE_URL",
      dialect: 'postgres',
      port: match[4],
      host: match[3],
      logging: true,
      database: 'dbadministrai',
      define: {
          timestamps: true,
          freezeTableName: true
      }
=======
    dialect:  'postgres',
    use_env_variable: "DATABASE_URL",
    logging:  true,
    database: 'dbadministrai',
    define: {
        timestamps: true,
        freezeTableName: true
    }
>>>>>>> 9f5046d2f1c197e475f3d189e15c6c6cb159b7a3
  }
};