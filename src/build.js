require('shelljs/global');


const webpack = require('webpack'); 
const conf = require('webpack.config.js');

rm("-rf", "build");

webpack(conf);