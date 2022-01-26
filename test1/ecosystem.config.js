const port = 90;
module.exports = {
  apps : [{
    script: 'server/app.js',
    watch: '.',
    ignore_watch: [
      // 不用监听的文件
      "node_modules",
      "logs",
    ],
    env: {
      NODE_ENV: 'prod',
      port: port
    }
  }]
};
const port = 80;
module.exports = {
  apps : [{
    script: 'server/app.js',
    watch: '.',
    ignore_watch: [
      // 不用监听的文件
      "node_modules",
      "logs",
    ],
    env: {
      NODE_ENV: 'prod',
      port: port
    }
  }]
};
