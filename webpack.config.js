var webpack = require('webpack');
var path = require('path');
var paths = require('./config.json').paths;
var srcPath = path.join(__dirname, paths.js.src);

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    entry: path.join(srcPath, 'index.js'),
    output: {
        path: path.join(__dirname, paths.js.dest),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx', '.json', '.html'],
        modulesDirectories: ['node_modules', paths.js.src + '/app'],
        alias: {}
    },
    module: {
        noParse: [],
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                include: [
                    path.resolve(__dirname, 'assets/js')
                ],
                exclude: [
                    /bundle\.js$/
                ],
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.jsx$|\.js$/,
                loaders: [
                    'babel-loader?' + JSON.stringify({presets: ['es2015', 'react']}),
                    'imports-loader?React=react&ReactDOM=react-dom'
                ],
                exclude: /node_modules/
            },
            {test: /\.json$/, loaders: ['json-loader']}
        ]
    },

    debug: true
};

module.exports = config;
