const express = require("express");
const app = express();

// test route
app.get("/health", (req, res) => {
    res.status(200).json({
        service: "user-gateway",
        status: "ok"
    });
});

// route
app.get("/profile", (req, res) => {
  const userId = req.headers["x-user-id"];

  res.json({
    message: "User profile from user-service",
    userId
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`user-gateway running on port ${ PORT }`);
});