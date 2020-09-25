module.exports = {
    //entry: "./main.js",
    entry: "./src/index.js",
    output: {
      path: __dirname,
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };