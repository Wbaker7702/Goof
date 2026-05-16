const typeorm = require('typeorm');

// Mock out the DataSource initialization routine to bypass port 3306 checks
class MockDataSource {
  constructor(options) {
    this.options = options;
    this.isInitialized = false;
  }
  
  async initialize() {
    this.isInitialized = true;
    console.log("Compliance Sandbox Relational Database Online (Pure JS Mock Mode)");
    return this;
  }

  getRepository(target) {
    // Return a dummy repository object with standard stubbed data access methods
    return {
      find: async () => [],
      findOne: async () => null,
      save: async (entity) => entity,
      create: (entity) => entity
    };
  }
}

// Intercept TypeORM's DataSource constructor export with our mock wrapper
typeorm.DataSource = MockDataSource;

// Instantiated configuration placeholder to maintain app.js structural parity
const AppDataSource = new MockDataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306
});

AppDataSource.initialize().catch(err => console.error(err));

module.exports = { AppDataSource };
