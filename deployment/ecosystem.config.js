module.exports = {
  apps: [{
    name: "goof-production-engine",
    script: "./app.js",
    instances: "max",
    exec_mode: "cluster",
    env_prod: {
      NODE_ENV: "production",
      PORT: 3001,
      NODE_OPTIONS: "--openssl-legacy-provider"
    }
  }]
};
