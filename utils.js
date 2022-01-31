const fs = require("fs")

let getDataFromStore = () => {
    try {
        let dataStream = fs.readFileSync("./data.json")
        let data = JSON.parse(dataStream.toString())
        return data
    } catch (error) {
        return []
    }
}

let generateBuiderMetadata = (type, desc = "", required = false) => {
    return {
        type: type,
        describe: desc,
        demandOption: required

    }
}

let updateStore = (data) => {
    fs.writeFileSync("./data.json", JSON.stringify(data))
}

let viewAll = ()=>{
    return getDataFromStore();
}

let viewTask = (title) => {
    let data = getDataFromStore();
    let matchedObj = data.filter((ele)=>{
        return ele.title == title
    })
    return matchedObj[0]
}

let deleteTask = (title) => {
    let data = getDataFromStore();
    let updatedData = data.filter((ele)=>{
        return ele.title !== title
    })
    updateStore(updatedData)
}

let addTask = (title, desc="No Desc.") =>{
    let fileData = getDataFromStore();
    console.log(fileData);
    fileData.push({
        title,
        desc,
        date: Date.now().toLocaleString()
    })
    updateStore(fileData)
}

module.exports = {
    generateBuiderMetadata,
    addTask,
    viewAll,
    viewTask,
    deleteTask
}