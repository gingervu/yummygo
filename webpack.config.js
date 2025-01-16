const path = require('path');

module.exports = {
  entry: './src/index.js',  // Điểm đầu vào
  output: {
    path: path.resolve(__dirname, 'dist'),  // Thư mục xuất ra
    filename: 'bundle.js'  // Tên file xuất ra
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Tìm các file .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'  // Sử dụng Babel để biên dịch
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    proxy: {
      '/graphql': 'http://localhost:8000'  // Ví dụ cấu hình proxy
    }
  }
};
