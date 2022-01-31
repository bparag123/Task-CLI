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
        return ele.title === title
    })
    return matchedObj[0]
}

let deleteTask = (title) => {
    let data = getDataFromStore();

    let foundAt = data.findIndex((ele)=>{
        return ele.title === title
    })
    if(foundAt<0) return false
    data.splice(foundAt, 1)
    updateStore(data)
    return true
}

let addTask = (title, desc="No Desc.") =>{
    let fileData = getDataFromStore();
    let found = fileData.find((ele)=>{
       return ele.title === title
    })

    if(found) return false;
    fileData.push({
        title,
        desc,
        date: Date.now().toLocaleString()
    })
    updateStore(fileData)
    return true
}

module.exports = {
    generateBuiderMetadata,
    addTask,
    viewAll,
    viewTask,
    deleteTask
}