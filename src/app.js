var fs = require('fs')
var data = require('../examples/data.json')
var getId = require('./utils').getId
var pretty = require('pretty')

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
    return content.reduce(function(accumulator, block) {
        accumulator += `<section id="${getId(
            block.type
        )}" class="Block Block--${block.type} ${block.type}">`
        switch (block.type) {
            case 'text': {
                accumulator += buildTextBlock(block)
            }
        }
        accumulator += `</section>`
        return accumulator
    }, '')
}

function buildTextBlock(block) {
    var output = ''
    if (block.data.heading) output += `<h2>${block.data.heading}</h2>`
    if (block.data.paragraphs) {
        block.data.paragraphs.forEach(function(paragraph) {
            output += `<p>${paragraph}</p>`
        })
    }
    return output
}

var HTML = `<!DOCTYPE html>
<html lang="en">
    ${buildHeadTag(data.meta)}
    <body>
        <div class="___johannes">
            <main id="main" role="main">
                ${buildContent(data.content)}
            </main>
        </div>
    </body>
</html>`

fs.writeFileSync('___dev.html', pretty(HTML))
