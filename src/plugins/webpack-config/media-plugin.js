export default function mediaPlugin () {
  return {
    module: {
      loaders: [
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
        }
      ]
    }
  }
}
