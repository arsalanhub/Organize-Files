let fs = require("fs")
let path = require("path")

function treeFn (dirPath) {
    if (dirPath == undefined) {
        // Picks address of curent working directory and calls
        // the function
        treeHelper(process.cwd(), "")
        return
    } else {
        let doesExist = fs.existsSync(dirPath)
        if (doesExist) {
           treeHelper(dirPath, "")
        } else {
            console.log("Enter valid path")
            return 
        }
    }
}

function treeHelper(dirPath, indent) {
   // If its file then simply print
   // If directory then go inside that 
   let isFile = fs.lstatSync(dirPath).isFile()
   if (isFile == true) {
      let fileName = path.basename(dirPath)
      console.log(indent + "├──" + fileName)
   } else {
       let dirName = path.basename(dirPath)
       console.log(indent + "└──" + dirName)
      
      let childrens = fs.readdirSync(dirPath)

      // We will recurcively traverse inside folder and if there
      // is another folder then we will explore that also 
      // and print all files and folders
      for(let i=0; i<childrens.length; i++) {
          let childPath = path.join(dirPath, childrens[i])
          treeHelper(childPath, indent + "\t")
      }
   }
}

module.exports = {
    treeKey: treeFn
}