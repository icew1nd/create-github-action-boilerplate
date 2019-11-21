#!/usr/bin/env node
"use strict";

var fs = require("fs-extra");
var child_process = require("child_process");
var ora = require("ora");

function copyFiles(projectName, spinner) {
  try {
    fs.copySync(__dirname + "/src", process.cwd() + "/" + projectName);
    spinner.succeed("Copied files");
  } catch (err) {
    spinner.fail(err);
  }
}

function rewriteFile(projectName, userName, spinner) {
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

    var readme = fs.readFileSync(
      process.cwd() + "/" + projectName + "/README.md",
      "utf8"
    );

    readme = readme.replace("actions/", userName + "/");
    readme = readme.replace("Hello world javascript action", projectName);
    readme = readme.replace("hello-world-javascript-action", projectName);
    fs.writeFileSync(process.cwd() + "/" + projectName + "/README.md", readme);

    var actionyml = fs.readFileSync(
      process.cwd() + "/" + projectName + "/action.yml",
      "utf8"
    );
    actionyml = actionyml.replace("Hello World", projectName);
    fs.writeFileSync(
      process.cwd() + "/" + projectName + "/action.yml",
      actionyml
    );

    spinner.succeed("Rewrote files");
  } catch (err) {
    spinner.fail(err);
  }
}

function install(projectName, spinner) {
  try {
    child_process.execSync(
      "npm i --prefix " +
        process.cwd() +
        "/" +
        projectName +
        " --loglevel=error"
    );
    spinner.succeed("Installed dependencies");
  } catch (err) {}
}

function main() {
  var standard_input = process.stdin;
  standard_input.setEncoding("utf-8");

  console.log("Put in your GitHub username and press enter");

  standard_input.on("data", function(userName) {
    if (userName === "exit\n") {
      process.exit();
    } else {
      var projectName = process.argv[2];
      if (!projectName) {
        console.error("Project name empty");
      } else {
        var spinner = ora("Copying files").start();
        copyFiles(projectName, spinner);
        rewriteFile(projectName, userName, spinner);
        spinner.text = "Rewriting files";
        install(projectName, spinner);
        spinner.text = "Installing dependencies";

        spinner.succeed("You're all set!");
        console.log("\nYour new action is located in:");
        console.log("\ncd " + projectName + "\n\n\n\n\n");
      }
    }
  });
}

main();
