const fs = require("fs")
const inquirer = require("inquirer")
let renderFile = require("./renderHtml")
const generateManager = renderFile.createManager
const generateEngineer = renderFile.createEngineer
const generateIntern = renderFile.createIntern
const renderHTML = renderFile.renderMain


// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");

function askQuestions() {
    inquirer
        .prompt([{
                type: "input",
                message: "What is your name?",
                name: "name",
            },
            {
                type: "number",
                message: "What is your ID?",
                name: "id",
            }, {
                type: "input",
                message: "What is your email address?",
                name: "email",
            },
            {
                type: "list",
                message: "What is your role?",
                name: "role",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ]).then(
            function({ name, id, email, role }) {
                switch (role) {
                    case "Engineer":
                        inquirer
                            .prompt({
                                type: "input",
                                message: "What is your GitHub username?",
                                name: "github"
                            }).then(
                                function({ github }) {
                                    generateEngineer(name, id, email, github)
                                    addMoreMembers()
                                }
                            )
                        break
                    case "Intern":
                        inquirer
                            .prompt({
                                type: "input",
                                message: "What school do you attend?",
                                name: "school"
                            }).then(
                                function({ school }) {
                                    generateIntern(name, id, email, school)
                                    addMoreMembers()
                                }
                            )
                        break
                    case "Manager":
                        inquirer
                            .prompt({
                                type: "input",
                                message: "What is your Office Number?",
                                name: "officeNumber"
                            }).then(
                                function({ officeNumber }) {
                                    generateManager(name, id, email, officeNumber)
                                    addMoreMembers()
                                }
                            )
                        break
                }
            })    
    }

    function addMoreMembers() {
        inquirer.prompt({
                type: "confirm",
                message: "Add other Team Members?",
                name: "addOtherMembers"
            }).then(
                function({ addMoreMembers }) {
                    console.log("add other members", addMoreMembers)
                    if (addMoreMembers) {
                        askQuestions()
                    } else {
                        renderHTML()
                    }
                }
            )
            .catch(err => {
                console.log("Error adding other members", err)
                throw err
            })
    }
askQuestions();

