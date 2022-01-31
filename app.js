const yargs = require("yargs");
const utils = require("./utils")
const chalk = require("chalk")

let error = chalk.red.bold;
let success = chalk.green.bold;
let primary = chalk.blue.bold;

yargs.command({
    command: "add",
    describe: "To Add new Task",
    handler: (argv) => {
        let added = utils.addTask(argv.title, argv.desc)
        if (!added) console.log(error(`Entry with title "${argv.title}" already found`))
        else console.log(success("task added"))
    },
    builder: {
        title: utils.generateBuiderMetadata("string", "Task Title", true),
        desc: utils.generateBuiderMetadata("string", "Task Description")
    }
})

yargs.command({
    command: "del",
    describe: "To Delete Task",
    handler: (argv) => {
        let deleted = utils.deleteTask(argv.title);
        if (deleted) console.log(success(`Entry with title "${argv.title}" is Deleted`))
        else console.log(error(`There is no Entry found with title "${argv.title}"`))
    },
    builder: {
        title: utils.generateBuiderMetadata("string", "Task Title", true),
    }
})

yargs.command({
    command: "view",
    describe: "To View Task",
    handler: (argv) => {
        let data = utils.viewTask(argv.title)
        if (data) console.log(primary(`1.)\t${data.title}\t->\t${data.desc}\n${data.date}`))
        else console.log(error(`Entry with title "${argv.title}" not found`))
    },
    builder: {
        title: utils.generateBuiderMetadata("string", "Task Title", true),
    }
})

yargs.command({
    command: "all",
    describe: "To List All TAsks",
    handler: (argv) => {
        let data = utils.viewAll();
        if (data.length === 0) {
            console.log(error(`Currently no Tasks Found in Storage`))
        }
        else {
            data.forEach((ele, index) => {
                console.log(primary(`${index + 1}.)\t${ele.title}\t->\t${ele.desc}\n${ele.date}`))
            })
        }
    },
})


yargs.parse()