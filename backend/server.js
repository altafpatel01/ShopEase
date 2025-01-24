const app = require("./app");

const cloudinary = require('cloudinary')
require("dotenv").config({ path: "backend/config/config.env" });
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Optional: process.exit(1) to terminate the process
  process.exit(1);
});
const dbConnection = require("./config/database");
port = process.env.PORT || 3000;

dbConnection();
try {
  cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
  })
  console.log('cloudinary connection done')
} catch (error) {
  console.log('cloudinary connection is stablished',error)
}
const server = app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  console.log(
    `shutting down the server due to unhandle promise rejection ${reason.message}`
  );
  // Optionally, exit the process or handle the error appropriately
  server.close(() => {
    process.exit(1);
  });
});
