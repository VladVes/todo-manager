export default () => ({
  "development": {
    storage: 'mongodb://localhost/test',
  },
  "test": {
    storage: 'mongodb://localhost/test',
  },
  "production": {
    use_env_variable: 'DATABASE_URL',
  },
});
