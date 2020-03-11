const fs = require('fs').promises;

const mkdirp = (path) => 
  fs.mkdir(path, { recursive: true });

const writeJSON = (path, object) => 
  fs.writeFile (path, JSON.stringify(object));

const readJSON = (path) => fs.readFile(path, 'utf8')
  .then(content => JSON.parse(content));

const readDirectoryJSON = (path) => 
  fs.readdir(path)
    .then(files => Promise.all(files.map(file => readJSON(`${path}/${file}`))));

const updateJSON = (path, object) =>
  fs.readFile(path, 'utf-8')
    .then(content => JSON.parse(content))
    .then(fs.writeFile (path, JSON.stringify(object)));

const deleteFile = (path) =>
  fs.readFile(path, 'utf-8')
    .then(content => JSON.parse(content))
    .then(fs.unlink (path));

module.exports = { mkdirp, writeJSON, readJSON, readDirectoryJSON, updateJSON, deleteFile };
