const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    // Where do I find the entry point to the source code for your client application?
    entry: {
        path: path.join(__dirname, './src/index.jsx'),
    },
    // Do you want to show the actual line in the source code in the console when an error happens? Use this. (Trick Answer: You do.)
    devtool: 'source-map',
    // Whats the name of the transpiled/built file going to be called? Where should I put it?
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './dist'),
    },
    // What sort of files is webpack looking for?
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    // Are there any rules you have for certain modules?
    module: {
        rules: [
            // Yes, for all js/jsx files, I want them to be run through the babel-loader. It knows how to transpile JSX to actual JS.
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    // Are there any extra things you want webpack to do?
    plugins: [
        // Yes, I'd love if it auto-generated the index.html for me, and added whatever the link is to my built webpack file automatically.
        new HtmlWebpackPlugin({
            templateContent: `
        <html>
            <head>
                <title>2101 React Intro</title>
                <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' rel='stylesheet' />
            </head>
            <body>
                <div id='app'></div>
            </body>
        </html>
      `,
        }),
    ],
};

module.exports = webpackConfig;
