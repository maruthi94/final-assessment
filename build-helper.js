const fse = require('fs-extra');

// if (!fse.existsSync('dist')) {
//     fse.mkdirSync('dist');
// }

//copy server
fse.copySync('./server/src', 'dist', { overwrite: true });
fse.copyFileSync('./server/package.json', 'dist/package.json');

//copy client
fse.copySync('./client/build', 'dist/public', { overwrite: true, recursive: true });
