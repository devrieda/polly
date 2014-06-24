module.exports = {
  entry: "./app/main.js",
  output: {
    filename: "build/application.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
