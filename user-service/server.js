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
  res.json({
    message: "User profile from user-service"
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`user-gateway running on port ${ PORT }`);
});