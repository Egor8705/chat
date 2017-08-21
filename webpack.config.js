const webpack = require('webpack');

module.exports = {
  entry : './chat_client/src/client.js',
  resolve: {
        alias: {
            dist: "node_modules/jquery" 
        },
        modules:[
            "jquery", "node_modules"
        ]
    },
    output: {
        path: __dirname + '/chat_client/public/javascripts',
        filename: 'bundle.js'
    },
  plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery"
        })
    ]
};


