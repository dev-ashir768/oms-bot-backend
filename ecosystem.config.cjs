module.exports = {
  apps : [{
    name: "bot-backend",
    script: "./dist/server.js",
    interpreter: "node",
    env: {
      NODE_ENV: "production",
    }
  }]
}