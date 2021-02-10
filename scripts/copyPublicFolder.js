const ncp = require('ncp');
const fs = require('fs');
const path = require('path');

const publicPath = path.resolve('./public');
const outputPathDebug = path.resolve('./build/debug/public');
const outputPathDist = path.resolve('./build/dist/public');

const arg = process.argv[2];

if (arg === 'debug' || arg === 'dist') {
  if (fs.existsSync(publicPath)) {
    ncp(publicPath, arg === 'debug' ? outputPathDebug : outputPathDist, () => {
      console.log(`Copied all files into the ./build/${arg}/public folder`);
    });
  } else {
    console.log(
      "The ./public folder does not exist, or you started the script in a directory that's not in the project root"
    );
  }
} else {
  console.log('Wrong argument, should be either "debug" or "dist"');
}
