const inquirer = require('inquirer');
const API = require('./API');
const generateHTML = require('./generateHTML');
const convertFactory = require('electron-html-to');
const fs = require('fs');
const open = require('open');
const path = require('path')

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

function writeToFile(fileName, data) {

    console.log(generateHTML(data));
}


async function initAsync() {
    try {
        const { github, color } = await inquirer.prompt(questions);
        const response = await API.getUser(github);
        const stars = await API.getStars(github);
        const followers = await API.getFollowers(github);
        const following = await API.getFollowing(github);
        const repos = await API.getRepos(github);
        const userbio = await API.getUserbio(github);
        const profileimage = await API.getProfileimage(github);
        const userlocation = await API.getUserlocation(github);
        const githubprofile = await API.getGithubprofile(github);
        const company = await API.getCompany(github);
        
        const html = generateHTML({ stars, color, followers, following, repos, userbio, profileimage, userlocation, githubprofile, userblog, ...response.data });
          console.log(html)
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
}



///appending elements
$('#stars').append(stars);
$('#followers').append(followers);
$('#following').append(following);
$('#repos').append(repos);
$('#userbio').append(userbio);
$('#profileimage').append(profileimage);
$('#userlocation').append(userlocation);
$('#githubprofile').append(githubprofile);
$('#userblog').append(userblog);



initAsync();