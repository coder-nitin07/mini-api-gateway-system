const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

// test route
app.get("/health", (req, res) => {
    res.status(200).json({
        service: "api-gateway",
        status: "ok"
    });
});

// proxy to user service
app.use('/api/users', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
        '/api/users': ''
    }
}));

// proxy to order service
app.use("/api/orders", createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": ""
    }
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`api-gateway running on port ${ PORT }`);
});