const express = require("express");
const app = express();

// test route
app.get("/health", (req, res) => {
    res.status(200).json({
        service: "order-gateway",
        status: "ok"
    });
});

// routes
app.get("/my", (req, res) => {
  res.json({
    message: "Orders from order-service"
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`order-gateway running on port ${ PORT }`);
});