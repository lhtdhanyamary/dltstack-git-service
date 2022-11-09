const simpleGitPromise = require("simple-git")();
let fs = require("fs");
const { exec } = require("node:child_process");

export default class Manger {
  commit = async (requestData) => {
    let gitHubUrl = "https://github.com/lhtvikaschauhan/vikas-cosmos-sdk.git";
    let dir = __dirname + "/newFolder";

    exec(
      `git clone ${gitHubUrl} -b main ./app/modules/codeCommit/newFolder`,
      (err, output) => {
        // once the command has completed, the callback function is called
        if (err) {
          // log and return if we encounter an error
          console.error("could not execute command: ", err);
          return;
        }
        // log the output received from the command
        console.log("Output: \n", output);

        if (!fs.existsSync(dir + "/config")) {
          fs.mkdirSync(dir + "/config");
        }

        fs.writeFile(
          dir + "/config/genesis.json",
          JSON.stringify(requestData),
          function (err) {
            if (err) throw err;
            console.log("Saved!");
          }
        );
      }
    );

    // exec(`cd ./app/modules/codeCommit/newFolder`, (err, output) => {
    //   // once the command has completed, the callback function is called
    //   if (err) {
    //     // log and return if we encounter an error
    //     console.error("could not execute command: ", err);
    //     return;
    //   }
    //   // log the output received from the command
    //   console.log("Output: \n", output);
    //   exec(`ls ./app/modules/codeCommit/newFolder`, (err, output) => {
    //     // once the command has completed, the callback function is called
    //     if (err) {
    //       // log and return if we encounter an error
    //       console.error("could not execute command: ", err);
    //       return;
    //     }
    //     // log the output received from the command
    //     console.log("Output: \n", output);
    //   });
    // });

    var cur_dir = process.cwd();
    console.log(cur_dir);

    // simpleGitPromise.addRemote("origin", gitHubUrl);

    exec(`git remote set-url origin ${gitHubUrl}`, (err, output) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err);
        return;
      }
      // log the output received from the command
      console.log("Output: \n", output);
    });

    simpleGitPromise.add(dir).then(
      (addSuccess) => {
        console.log(addSuccess);
      },
      (failedAdd) => {
        console.log("adding files failed");
      }
    );

    simpleGitPromise.commit("Intial commit by simplegit").then(
      (successCommit) => {
        console.log(successCommit);
      },
      (failed) => {
        console.log("failed commmit");
      }
    );

    simpleGitPromise.push("-u", "origin", "main").then(
      (success) => {
        console.log("repo successfully pushed", success);
      },
      (failed) => {
        console.log("repo push failed",failed);
      }
    );
    await simpleGit()
      .add("./*")
      .commit("first commit!")
      .addRemote("origin", "https://github.com/lhtdhanyamary/test-commit.git")
      .push(["-u", "origin", "main"], () => console.log("done"));
    // API business logic
    // return undefined;
  };
}
