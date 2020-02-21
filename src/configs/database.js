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
    dialect:  'postgres',
    use_env_variable: "DATABASE_URL",
    logging:  true,
    database: 'dbadministrai',
    define: {
        timestamps: true,
        freezeTableName: true
    },
  }
};