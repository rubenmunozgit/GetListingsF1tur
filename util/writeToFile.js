const fs = require('fs');

const writeTofile = (data) => {
  fs.writeFile('Asociaciones_profesionales.json',  JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('file write finish');
    });
}

module.exports = {
  writeTofile
}
