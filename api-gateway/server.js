const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("./middlewares/auth");
const jwt = require('jsonwebtoken');

// test route
app.get("/health", (req, res) => {
    res.status(200).json({
        service: "api-gateway",
        status: "ok"
    });
});

// proxy to user service
app.use('/api/users', authMiddleware, createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
        '/api/users': ''
    },
    onProxyReq(proxyReq, req) {
      proxyReq.setHeader("x-user-id", req.user.userId);
    }
}));

// proxy to order service
app.use("/api/orders", authMiddleware, createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": ""
    },
    onProxyReq(proxyReq, req) {
      proxyReq.setHeader("x-user-id", req.user.userId);
    }
}));

// DEV: generate JWT for Postman testing
app.get("/dev/token", (req, res) => {
  const token = jwt.sign(
    { userId: "123" },
    "mysecretkey",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`api-gateway running on port ${ PORT }`);
});