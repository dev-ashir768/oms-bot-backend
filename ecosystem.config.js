module.exports = {
  apps : [{
    name: "bot-backend",
    script: "./src/server.ts",
    interpreter: "bun",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}