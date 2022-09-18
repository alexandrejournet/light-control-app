let exec = require('child_process').exec;
let pack = require('./package.json');

let old_version = pack.version;
let version = "";
const myArgs = process.argv.slice(2);

let semverCmd = "semver " + old_version + " -i ";

if (!myArgs[0]) {
  semverCmd += "release";
  console.log("Build release")
} else {
  semverCmd += "prerelease --preid " + myArgs[0];
  console.log("Build " + myArgs[0])
}

let cmd = exec(semverCmd, function (err, stdout) {
  if (err) {
    console.log('err', err);
  }

  version = stdout;

  let cmd2 = exec("npm version " + version, function (err) {
    if (err) {
      console.log('err', err);
    }

    console.log('Up version from ' + old_version + ' to ' + version);
    cmd2.on('exit', function (code) {
      // return value from "npm build"
    });
  });

});

cmd.on('exit', function (code) {
  // return value from "npm build"
});
