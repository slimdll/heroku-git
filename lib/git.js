'use strict';
let child_process = require('child_process');
let h = require('heroku-cli-util');

function exec (cmd) {
  return new Promise(function (fulfill, reject) {
    child_process.exec(`git ${cmd}`, function (error, stdout) {
      if (error) { return reject(error); }
      fulfill(stdout.trim());
    });
  });
}

function spawn (cmd, args) {
  return new Promise(function (fulfill, reject) {
    let s = child_process.spawn('git', args, {stdio: [0,1,2]});
    s.on('error', reject);
    s.on('close', fulfill);
  });
}

function remoteFromGitConfig () {
  return exec('config heroku.remote').catch(function () {});
}

function sshGitUrl(app) {
  return `git@${h.gitHost()}:${app}.git`;
}

function httpGitUrl(app) {
  return `https://${h.httpGitHost()}/${app}.git`;
}

exports.exec = exec;
exports.spawn = spawn;
exports.remoteFromGitConfig = remoteFromGitConfig;
exports.sshGitUrl = sshGitUrl;
exports.httpGitUrl = httpGitUrl;