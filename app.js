const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// const confirmName = async (input) => {
//     if (input !== 'y' || input !== 'n') {
//         return 'Incorrect asnwer';
//     }
//     return true;
// };

// const confirmNumber = async (input) => {
//     if (input) {

//     }
//     return true;
// }


// const ;

// async function collectRes() {
//     try {
//         const initialPrompt = await
// }

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
            // validate: confirmName()
        },
        {
            type: "number",
            message: "What is the manager's ID?",
            name: "managerId",
            // validate: confirmNumber()
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "managerEmail",
            // validate: confirmEmail()
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "managerOffice",
            // validate: confirmEmail()
        },
        {
            type: "number",
            message: "How many engineers are a part of this team?",
            name: "engineers",
            // validate: confirmNumber()
        },
        {
            type: "number",
            message: "How many interns are a part of this team?",
            name: "interns",
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
                    message: `What is engineer ${i + 1}'s name?`,
                    name: "engineerName"
                },
                {
                    type: "number",
                    message: `What is engineer ${i + 1}'s ID?`,
                    name: "engineerId"
                },
                {
                    type: "input",
                    message: `What is engineer ${i + 1}'s email?`,
                    name: "engineerEmail"
                },
                {
                    type: "input",
                    message: `What is engineer ${i + 1}'s github username?`,
                    name: "engineerGithub"
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
                    message: `What is intern ${j + 1}'s name?`,
                    name: "internName"
                },
                {
                    type: "number",
                    message: `What is intern ${j + 1}'s ID?`,
                    name: "internId"
                },
                {
                    type: "input",
                    message: `What is intern ${j + 1}'s email?`,
                    name: "internEmail"
                },
                {
                    type: "input",
                    message: `What is intern ${j + 1}'s school affiliation?`,
                    name: "internSchool"
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
                    <div class="attribute">GitHub: ${engineer.github}</div>
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

// const engineersDyn = engineerArr.forEach(function (engineer) {
//     return `
//     <div class="card col-sm-3">
//         <div class="card-header">
//             <h3>${engineer.engineerName}</h3>
//             <h4><i></i>${engineer.role}</h4>
//         </div>
//         <div class="card-body container">
//             <div class="attribute">ID: ${engineer.engineerId}</div>
//             <div class="attribute">Email: ${engineer.engineerEmail}</div>
//             <div class="attribute">GitHub: ${engineer.engineerGithub}</div>
//         </div>
//     </div>`
// })

// const internsDyn = internArr.forEach(function (intern) {
//     return `
//     <div class="card col-sm-3">
//     <div class="card-header">
//         <h3>${intern.internName}</h3>
//         <h4><i></i>${intern.role}</h4>
//     </div>
//     <div class="card-body container">
//         <div class="attribute">ID: ${intern.internId}</div>
//         <div class="attribute">Email: ${intern.internEmail}</div>
//         <div class="attribute">School: ${intern.internSchool}</div>
//     </div>
// </div>`
// })

