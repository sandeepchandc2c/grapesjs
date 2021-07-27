module.exports = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'link:href']
    }
  }
}   