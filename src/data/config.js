var configMongoDB = {};

configMongoDB.mongoURI = {
  development: 'mongodb://localhost/tasksmanager-dev',
  test: 'mongodb://localhost/tasksmanager-test'
};

module.exports = configMongoDB;
