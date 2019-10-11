const inquirer = require('inquirer');
const API = require('./API');
const generateHTML = require('./generateHTML');
const convertFactory = require('electron-html-to');
const open = require('open');
const path = require('path')

const fs = require('fs');


// function writeToFile (data) {
//     fs.writeFile('index.html', html, function (err) {
//       if (err) throw err;
//       console.log('Saved!');
//     });
//     }
    

const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub acct?"
    },
    {
        type: "list",
        choices: ["green", "blue", "pink", "red"],
        name: "color",
        message: "What is your favorite color?"
    }
];

async function initAsync() {
    try {
        let data = {};
        const { github, color } = await inquirer.prompt(questions);
        // and then
        data.github = github;
        data.color = color;
        data.response = await API.getUser(github);
        data.stars = await API.getStars(github);
        data.followers = await API.getFollowers(github);
        data.following = await API.getFollowing(github);
        data.repos = await API.getRepos(github);
        data.bio = await API.getUserbio(github);
        data.avatar_url = await API.getProfileimage(github);
        data.location = await API.getUserlocation(github);
        data.githubprofile = await API.getGithubprofile(github);
        data.company = await API.getCompany(github);

        console.log(data)
        const html = generateHTML(data);


        function writeToFile (data) {
            fs.writeFile('index.html', html, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
            }

        writeToFile(html);
        console.log(html)
        //   console.log(profileImage)
        // var conversion = convertFactory({
        //     converterPath: convertFactory.converters.PDF,
        //     timeout: 3 * 1000
        // });

        // conversion({ html: '<h1>Hello World</h1>' }, function (err, result) {
        //     if (err) {
        //         return console.error(err);
        //     }

        //     console.log(result.numberOfPages);
        //     console.log(result.logs);
        //     result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
        //     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        // });
        // let stuff = `<html><head>`
    } catch (error) {
        console.log(error)
    }
};



initAsync();