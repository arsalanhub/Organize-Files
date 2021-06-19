let fs = require("fs")
let path = require("path")

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeFn (dirPath) {
    // console.log("Organize implemented", dirPath)
    // 1. input -> directory path given
    
    let destPath
    if (dirPath == undefined) {
        destPath = process.cwd()
        return
    } else {
        let doesExist = fs.existsSync(dirPath)
        if (doesExist) {

          // create organized_files
          destPath = path.join(dirPath, "orgnized_files")

          // If organized_files not present in current location then
          // only create else don't create
          if(fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath)
          }
        } else {
            console.log("Enter valid path")
            return 
        }
    }
    // dirPath => Initial location of files
    // destPath => Final location of all files
    organizeHelper(dirPath, destPath)
}

function organizeHelper(src, dest) {
    // list all files / directory present in the given directory
    let childNames = fs.readdirSync(src)
    
    for(let i=0; i<childNames.length; i++) {
        // store complete address of file / directory
        let childAddress = path.join(src, childNames[i])

        // Check if the address is of file or not
        let  isFile = fs.lstatSync(childAddress).isFile()
        if (isFile) {
            // Gives category of files 
            let category = getCategory(childNames[i])

            // Send find to its respective category
            sendFiles(childAddress, dest, category)
        }

    }
}

function sendFiles(srcFilePath, dest, category) {
  let categorypath = path.join(dest, category)

  // Check if that category folder exists or not
  // If doesn't exist then create
  if(fs.existsSync(categorypath) == false) {
    fs.mkdirSync(categorypath)
  }

  // Copy the file from its initial location to final location
  let fileName =  path.basename(srcFilePath)
  let destFilePath = path.join(categorypath, fileName)
  fs.copyFileSync(srcFilePath, destFilePath)

  // Once we have copied the file below command removes the file from
  // source directory
  fs.unlinkSync(srcFilePath)
  console.log("Organizing file name", fileName, 'in', category, "folder\n")
}

function getCategory(name) {
    // Store extension of file
    let ext = path.extname(name)

    // Remove . from the extensions
    ext = ext.slice(1)
    
    for(let type in types) {
        // Get individual type like media, archives ...
        let cTypeArray = types[type];
        for(let i=0; i<cTypeArray.length; i++) {
            if(ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

module.exports = {
    organizeKey: organizeFn
}