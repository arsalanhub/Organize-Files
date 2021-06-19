#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path")
let helpObj = require("./commands/help")
let treeObj = require("./commands/tree")
let organizeObj = require("./commands/organize")

let command = inputArr[0];
switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1])
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1])
        break;
    case "help":
        helpObj.helpKey()
    default:
        console.log("Press Enter right command!!")     
        console.log("Refer help")
        break;

}
