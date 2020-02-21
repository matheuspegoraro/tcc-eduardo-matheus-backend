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
  }
};