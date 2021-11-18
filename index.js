const { get } = require('axios')
const { readFileSync , existsSync , mkdirSync , createWriteStream } = require('fs')
const colors = require('colors')

readFileSync(__dirname + "/tags.txt", "utf-8").split("\r\n").forEach(async tags => {
    const pics_url = (await get("https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=1000&tags=" + tags)).data.map(d => d.file_url)
    if (!existsSync(__dirname + "\\" + tags)) mkdirSync(__dirname + "\\" + tags)
    pics_url.forEach(url => {
        if (!existsSync(__dirname + "\\" + tags + "\\" + pics_url.lastIndexOf(url) + "." + url.split(".")[url.split(".").length - 1])) getNsave(tags, pics_url, url)
    })
})

function getNsave(tags, pics_url, url) {
    (async () => {
        try {
            (await get(url, { responseType: 'stream' })).data.pipe(createWriteStream(__dirname + "\\" + tags + "\\" + pics_url.lastIndexOf(url) + "." + url.split(".")[url.split(".").length - 1]))
            console.log(`[${tags}] `.yellow + `(${pics_url.indexOf(url)}/${pics_url.length}) => ` + `${__dirname + "\\" + tags + "\\" + pics_url.lastIndexOf(url) + "." + url.split(".")[url.split(".").length - 1]}`.blue)
        } catch (e) {
            console.log(e.code)
            if (e.code === "ETIMEDOUT") getNsave(tags, pics_url, url)
        }
    })()
}

process.on('unhandledRejection', (reason, p) => {
    console.log('\n=== unhandled Rejection ==='.toUpperCase())
    console.log('Promise: ', p , 'Reason: ', reason.stack ? reason.stack : reason);
    console.log('=== unhandled Rejection ==='.toUpperCase())
})
process.on("uncaughtException", (err, origin) => {
    console.log('\n=== uncaught Exception ==='.toUpperCase())
    console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ==='.toUpperCase())
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('\n=== uncaught Exception Monitor ==='.toUpperCase())
    console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception Monitor ==='.toUpperCase())
})
process.on('beforeExit', (code) => {
    console.log('\n=== before Exit ==='.toUpperCase())
    console.log('Code: ', code);
    console.log('=== before Exit ==='.toUpperCase())
})
process.on('exit', (code) => {
    console.log('\n=== exit ==='.toUpperCase())
    console.log('Code: ', code)
    console.log('=== exit ==='.toUpperCase())
})
process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n=== multiple Resolves ==='.toUpperCase())
    console.log(type, promise, reason)
    console.log('=== multiple Resolves ==='.toUpperCase())
})
