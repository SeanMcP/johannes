var fs = require('fs')
var data = require('../examples/data.json')

function buildHeadTag(metaData) {
    return `
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${metaData.title}</title>
    </head>`
}

var site =
`<!DOCTYPE html>
<html lang="en">
    ${buildHeadTag(data.meta)}
    <body>
        <div class="___johannes">
            Hello world!
        </div>
    </body>
</html>`

fs.writeFileSync('dev/index.html', site)