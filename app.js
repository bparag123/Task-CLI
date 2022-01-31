const yargs = require("yargs");
const utils = require("./utils")

yargs.command({
    command : "add",
    describe: "To Add new Task",
    handler: (argv)=>{
        utils.addTask(argv.title, argv.desc);
    },
    builder:{
        title: utils.generateBuiderMetadata("string", "Task Title", true),
        desc: utils.generateBuiderMetadata("string", "Task Description")
    }
})

yargs.command({
    command : "del",
    describe: "To Delete Task",
    handler: (argv)=>{
        utils.deleteTask(argv.title)
    },
    builder:{
        title: utils.generateBuiderMetadata("string", "Task Title", true),
    }
})

yargs.command({
    command : "view",
    describe: "To View Task",
    handler: (argv)=>{
       let data = utils.viewTask(argv.title)
       console.log(`1.)\t${data.title}\t->\t${data.desc}\n${data.date}`)
    },
    builder:{
        title: utils.generateBuiderMetadata("string", "Task Title", true),
    }
})

yargs.command({
    command : "all",
    describe: "To List All TAsks",
    handler: (argv)=>{
        let data = utils.viewAll();
        data.forEach((ele, index)=>{
            console.log(`${index+1}.)\t${ele.title}\t->\t${ele.desc}\n${ele.date}`)
        })
    },
})


yargs.parse()