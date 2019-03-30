var fs = require('fs')
var data = require('../examples/data.json')
var getId = require('./utils').getId
var pretty = require('pretty')

var CSS = ''

function buildHead(metaData) {
    return `
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${metaData.title}</title>
        <link rel="stylesheet" type="text/css" href="src/styles.css" />
        <style>${CSS}</style>
    </head>`
}

function buildContent(content) {
    return content.reduce(function (accumulator, block) {
        var id = getId(block.type)
        buildBlockCSS(id, block.styles)
        accumulator += `<section id="${id}" class="Block Block--${block.type} ${block.type}">`
        switch (block.type) {
            case 'text':
                {
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
        block.data.paragraphs.forEach(function (paragraph) {
            output += `<p>${paragraph}</p>`
        })
    }
    return output
}

function buildBlockCSS(id, styles) {
    if (styles) {
        var output = `#${id} {`
        for (var key in styles) {
            var value = styles[key]
            if (value[0] === '@') {
                var variable = value.slice(1)
                if (data.theme.variables.hasOwnProperty(variable)) {
                    value = data.theme.variables[variable];
                } else {
                    throw new Error(`Block "${id}" referenced variable "${variable}" but no variable by name exists in theme variables.`)
                }
            }
            output += `${key}:${value};`
        }
        output += '}'
        CSS += output;
    }
}

function generateHTML() {
    var content = buildContent(data.content)
    var head = buildHead(data.meta)
    return pretty(`<!DOCTYPE html>
<html lang="en">
    ${head}
    <body>
        <div class="___johannes">
            <main id="main" role="main">
                ${content}
            </main>
        </div>
    </body>
</html>`)
}

fs.writeFileSync('___dev.html', generateHTML())