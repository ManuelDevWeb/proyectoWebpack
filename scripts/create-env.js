const fs = require('fs');

//Crear archivo en la raiz del proyecto
fs.writeFileSync('./.env', `API=${process.env.API}\n`)