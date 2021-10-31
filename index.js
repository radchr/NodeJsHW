const os = require('os');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk'); // подсветка в консоли

const platf = os.platform(); //1
const arch = os.arch();  //2
const tmp = os.tmpdir(); // 3
const cpus = os.cpus();  //4
const host = os.hostname();  // 5
const ver = os.version();  // 6
const home = os.homedir(); //7
const rel = os.release(); // 8
const tot = os.totalmem(); //9
const type = os.type(); //10

const info = [platf, arch, tmp, cpus, host, ver, home, rel, tot, type];
const infoTxt = [];
info.forEach((elem) =>{
  if (typeof(elem) != 'object') {
  infoTxt.push(String(elem));} else {
  infoTxt.push(JSON.stringify(elem));
  }
})

const infoText = infoTxt.join(chalk.red("\n==============================================================\n"));
//  проверить на наличие папки
fs.stat(path.join(__dirname, "test"), function(err) {
  if (!err) {
      console.log(chalk.bold.green('Директория есть'));
      fs.writeFile( path.join(__dirname, "test", "txt.txt"), infoText, err => {
        if(err) throw err;
        console.log(chalk.bold.green("\n+++++++FILE WAS CREATE++++++++++\n"));
      });
      
      fs.readFile(path.join(__dirname, "test", "txt.txt"), "utf8", (err, data) => {
        if (err) throw err;
        console.log(chalk.bold.yellow("Читаем файл ---- > \n\n"), data )});
  }
  else if (err.code === 'ENOENT') {
      console.log(chalk.bold.red('Директории нет!!!'));
      fs.mkdir( "test", err => {
        if (err) throw err;
        console.log(chalk.bold.red("\n+++++++Directory WAS CREATE++++++++++\n"));
      })
      
      fs.writeFile( path.join(__dirname, "test", "txt.txt"), infoText, err => {
        if(err) throw err;
        console.log(chalk.bold.green("\n+++++++FILE WAS CREATE++++++++++\n"));
      });
      
      fs.readFile(path.join(__dirname, "test", "txt.txt"), "utf8", (err, data) => {
        if (err) throw err;
        console.log(chalk.bold.yellow("Читаем файл ---- > \n\n"), data )});
  }
});

// ============


