var fs = require('fs')
var data = require('../examples/data.json')

function buildHeadTag(metaData) {
    return `
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${metaData.title}</title>
        <link rel="stylesheet" type="text/css" href="src/styles.css" />
    </head>`
}

function buildContent(content) {
    return content.reduce((string, block) => {
        string += `\n<section class="Block Block--${block.type} ${block.type}">\n`
        switch (block.type) {
            case 'text': {
                if (block.data.heading) string += `<h2>${block.data.heading}</h2>`
                if (block.data.paragraphs) {
                    block.data.paragraphs.forEach(function(paragraph) {
                        string += `<p>${paragraph}</p>`
                    })
                }
            }
        }
        string += `\n</section>`
        return string
    }, '')
}

var site =
    `<!DOCTYPE html>
<html lang="en">
    ${buildHeadTag(data.meta)}
    <body>
        <div class="___johannes">
            Hello world!
            ${buildContent(data.content)}
        </div>
    </body>
</html>`

fs.writeFileSync('___dev.html', site)