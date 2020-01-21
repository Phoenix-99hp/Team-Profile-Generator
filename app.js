const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

function generateHTML(man, eng, int) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Profile</title>
        <link rel="stylesheet" href="../style/reset.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
        <link rel="stylesheet" href="../style/style.css">
    </head>
    
    <body>
        <header class="row">
            <p class="col-12">My Team</p>
        </header>
        <div class="container" id="main-container">
            <div class="row" id="content">
                <div class="card col-sm-3">
                    <div class="card-header">
                        <h3>${man.name}</h3>
                        <h4><i class="fas fa-tasks"></i> ${man.role}</h4>
                    </div>
                    <div class="card-body container">
                        <div class="attribute">ID: ${man.id}</div>
                        <div class="attribute">Email: ${man.email}</div>
                        <div class="attribute">Office number: ${man.officeNumber}</div>
                    </div>
                </div>
                ${eng}
                ${int}
            </div>
        </div>
    </body>
    </html>`
}

inquirer
    .prompt([
        {
            type: "input",
            message: "Welcome to the software engineering team generator. A team consists of one manager and any number of engineers and interns. Enter a name for the manager:",
            name: "managerName",
            validate: (input) => {
                if (/[a-z\s\-]+/gi.test(input.trim()) === true) {
                    return true;
                }
                return 'Please enter a valid name';
            },
            filter: (input) => input.trim()
        },
        {
            type: "input",
            message: "What is the Manager's ID?",
            name: "managerId",
            validate: (input) => {
                if (/^[0-9]+$/gi.test(input.trim()) === true) {
                    return true;
                }
                return "Please enter a valid number";
            },
            filter: (input) => input.trim()
        },
        {
            type: "input",
            message: "What is the Manager's email address?",
            name: "managerEmail",
            validate: (input) => {
                if (/.\S+/gi.test(input.trim()) === true) {
                    return true;
                }
                return "Please enter a valid email";
            },
            filter: (input) => input.trim()
        },
        {
            type: "input",
            message: "What is the Manager's office number?",
            name: "managerOffice",
            validate: (input) => {
                if (/^[0-9]+$/gi.test(input.trim()) === true) {
                    return true;
                }
                return "Please enter a valid number";
            },
            filter: (input) => input.trim()
        },
        {
            type: "input",
            message: "How many Engineers are a part of this team?",
            name: "engineers",
            validate: (input) => {
                if (/^[0-9]+$/gi.test(input.trim()) === true) {
                    return true;
                }
                return "Please enter a valid number";
            },
            filter: (input) => input.trim()
        },
        {
            type: "input",
            message: "How many Interns are a part of this team?",
            name: "interns",
            validate: (input) => {
                if (/^[0-9]+$/gi.test(input.trim()) === true) {
                    return true;
                }
                return "Please enter a valid number";
            },
            filter: (input) => input.trim()
        }
    ]).then(async function ({ managerName, managerId, managerEmail, managerOffice, engineers, interns }) {
        let numEngineers = engineers;
        let numInterns = interns;
        const engineerArr = [];
        const internArr = [];
        for (let i = 0; numEngineers > 0; i++) {
            numEngineers -= 1
            await inquirer.prompt([
                {
                    type: "input",
                    message: `What is Engineer ${i + 1}'s name?`,
                    name: "engineerName",
                    validate: (input) => {
                        if (/[a-z\s\-]+/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return 'Please enter a valid name';
                    },
                    filter: (input) => input.trim()
                },
                {
                    type: "input",
                    message: `What is Engineer ${i + 1}'s ID?`,
                    name: "engineerId",
                    validate: (input) => {
                        if (/^[0-9]+$/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return "Please enter a valid number";
                    },
                    filter: (input) => input.trim()
                },
                {
                    type: "input",
                    message: `What is Engineer ${i + 1}'s email?`,
                    name: "engineerEmail",
                    validate: (input) => {
                        if (/.\S+/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return "Please enter a valid email";
                    },
                    filter: (input) => input.trim()
                },
                {
                    type: "input",
                    message: `What is Engineer ${i + 1}'s GitHub username?`,
                    name: "engineerGithub",
                    validate: (input) => {
                        if (/.\S+/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return "Please enter a valid username";
                    },
                    filter: (input) => input.trim()

                }
            ]).then(function ({ engineerName, engineerId, engineerEmail, engineerGithub }) {
                const engineer = new Engineer(engineerName, engineerId, engineerEmail, engineerGithub);
                engineerArr.push(engineer);
            })
        }
        for (let j = 0; numInterns > 0; j++) {
            numInterns -= 1;
            await inquirer.prompt([
                {
                    type: "input",
                    message: `What is Intern ${j + 1}'s name?`,
                    name: "internName",
                    validate: (input) => {
                        if (/[a-z\s\-]+/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return 'Please enter a valid name';
                    },
                    filter: (input) => input.trim()
                },
                {
                    type: "input",
                    message: `What is Intern ${j + 1}'s ID?`,
                    name: "internId",
                    validate: (input) => {
                        if (/^[0-9]+$/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return "Please enter a valid number";
                    },
                    filter: (input) => input.trim()
                },
                {
                    type: "input",
                    message: `What is Intern ${j + 1}'s email?`,
                    name: "internEmail",
                    validate: (input) => {
                        if (/.\S+/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return "Please enter a valid email";
                    },
                    filter: (input) => input.trim()
                },
                {
                    type: "input",
                    message: `What is Intern ${j + 1}'s school affiliation?`,
                    name: "internSchool",
                    validate: (input) => {
                        if (/[a-z\s\-]+/gi.test(input.trim()) === true) {
                            return true;
                        }
                        return 'Please enter a valid name';
                    },
                    filter: (input) => input.trim()

                }
            ]).then(function ({ internName, internId, internEmail, internSchool }) {
                const intern = new Intern(internName, internId, internEmail, internSchool);
                internArr.push(intern);
            })
        }
        const manager = new Manager(managerName, managerId, managerEmail, managerOffice);
        const engineersDyn = engineerArr.map(function (engineer) {
            return `
            <div class="card col-sm-3">
                <div class="card-header">
                    <h3>${engineer.name}</h3>
                    <h4><i class="fas fa-cog"></i> ${engineer.role}</h4>
                </div>
                <div class="card-body container">
                    <div class="attribute">ID: ${engineer.id}</div>
                    <div class="attribute">Email: ${engineer.email}</div>
                    <div class="attribute">GitHub: <a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a></div>
                </div>
            </div>`
        }).join("");

        const internsDyn = internArr.map(function (intern) {
            return `
            <div class="card col-sm-3">
            <div class="card-header">
                <h3>${intern.name}</h3>
                <h4><i class="fas fa-user-graduate"></i> ${intern.role}</h4>
            </div>
            <div class="card-body container">
                <div class="attribute">ID: ${intern.id}</div>
                <div class="attribute">Email: ${intern.email}</div>
                <div class="attribute">School: ${intern.school}</div>
            </div>
        </div>`
        }).join("");

        fs.writeFile("./output/team.html", generateHTML(manager, engineersDyn, internsDyn), function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Successfully created team.html in output folder");
        })
        console.log(internArr, engineerArr, manager);
    })