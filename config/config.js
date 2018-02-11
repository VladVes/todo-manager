export default () => ({
  "development": {
    connectionString: 'mongodb://localhost/test',
  },
  "test": {
    connectionString: 'mongodb://localhost/test',
  },
  "production": {
    use_env_variable: 'DATABASE_URL',
  },
});
