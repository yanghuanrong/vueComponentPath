const fs = require('fs')
const sep = require('path').sep
const patha = require('path')
function toHump(str) {
  return str.replace(/-([a-z])/g, function ($0, $1) {
    return $1.toUpperCase();
  })
}

function readDir(path, word) {
  let VueComponent = toHump(word) + '.vue'
  let vue_component = word + '.vue'
  let filePath
  function readDirCh(path) {
    var exists = fs.existsSync(path),
      stat = fs.statSync(path);

    if (exists && stat) { //判断文件、文件目录是否存在
      if (stat.isFile()) {
        var fpath = path.split(sep);
        if (patha.extname(fpath[fpath.length - 1]) === '.vue') {
          if(fpath[fpath.length - 1] == VueComponent || fpath[fpath.length - 1] == vue_component) {
            filePath = path.split('\\').join('/')
          }
        }
      } else if (stat.isDirectory()) {
        var fpath = path.split(sep);
        var files = fs.readdirSync(path);
        if (files && files.length > 0) {
          files.forEach(function (file) {
            readDirCh(path + sep + file); //递归
          });
        }
      }
    } else {
      console.info('根目录不存在.');
    }
  };

  readDirCh(path)

  return filePath
}


module.exports = {
  readDir: readDir
}