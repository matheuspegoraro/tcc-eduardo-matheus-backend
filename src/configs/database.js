module.exports = {
  dialect:  'postgres',
  use_env_variable: "DATABASE_URL",
  logging:  true,
  database: 'dbadministrai',
  define: {
      timestamps: true,
      freezeTableName: true
  },
};