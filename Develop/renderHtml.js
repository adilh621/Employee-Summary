const fs = require("fs")
const path = require("path")
const templateDir = "./templates/"
const employeeGen = require("./lib/employee")
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
const Manager = require("./lib/manager")
let teamMembers = ""




module.exports = {
    createManager: createManager,
    createEngineer: createEngineer,
    createIntern: createIntern,
    renderMain: renderMain
}