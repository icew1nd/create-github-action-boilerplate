const fs = require("fs-extra");
const child_process = require("child_process");
const ora = require("ora");

function copyFiles(projectName, spinner) {
  try {
    fs.copySync(__dirname + "/src", process.cwd() + "/" + projectName);
    spinner.succeed("Copied files");
  } catch (err) {
    spinner.fail(err);
  }
}

function rewriteFile(projectName, spinner) {
  try {
    var pkgjson = fs.readFileSync(
      process.cwd() + "/" + projectName + "/package.json",
      "utf8"
    );
    pkgjson = pkgjson.replace("test-action", projectName);
    fs.writeFileSync(
      process.cwd() + "/" + projectName + "/package.json",
      pkgjson
    );
    spinner.succeed("Rewrote files");
  } catch (err) {
    console.log("i am here", err);
    spinner.fail(err);
  }
}

function install(projectName, spinner) {
  try {
    child_process.execSync(
      "npm i --prefix " + process.cwd() + "/" + projectName
    );
    spinner.succeed("Installed dependencies");
  } catch (err) {}
}

function main() {
  const projectName = process.argv[2];
  const spinner = ora("Copying files").start();
  copyFiles(projectName, spinner);
  rewriteFile(projectName, spinner);
  spinner.text = "Rewriting files";
  install(projectName, spinner);
  spinner.text = "Installing dependencies";

  spinner.succeed("You're all set!");
  console.log("\nYour new action is located in:");
  console.log("\ncd " + projectName + "\n\n\n\n\n");
}

main();
