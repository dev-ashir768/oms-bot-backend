module.exports = {
  apps : [{
    name: "bot-backend",
    script: "./src/index.ts", // Replace with your actual entry file
    interpreter: "bun",       // Use "node" if you aren't using Bun
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}