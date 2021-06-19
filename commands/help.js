function helpFn (dirPath) {
    console.log(`
    List of All the commands:
            ars tree "directoryPath"
            ars organize "directoryPath"
            ars help
    `)
}

module.exports = {
    helpKey: helpFn
}