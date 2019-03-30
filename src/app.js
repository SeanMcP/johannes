var fs = require('fs')
var data = require('../examples/data.json')
var getId = require('./utils').getId
var pretty = require('pretty')

var CSS = ''

function buildHead(data) {
    return `
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${data.meta.title}</title>
        ${data.meta.description && `<meta name="description" content="${data.meta.description}">`}
        ${addCustomFont(data.theme.customFont)}
        <link rel="stylesheet" type="text/css" href="src/styles.css" />
        <style>${CSS}</style>
    </head>`
}

function isStacked(block) {
    if (block.options && block.options.stacked)
        return 'Block--stacked'
    return ''
}

function buildContent(content) {
    return content.reduce(function (accumulator, block) {
        var id = getId(block.type)
        buildBlockCSS(id, block.styles)
        accumulator += `<section id="${id}" class="Block Block--${block.type} ${block.type} ${isStacked(block)}">`
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

function addCustomFont(family) {
    if (family)
        return `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${family}" />`
    return ''
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

function a11yTopLevelHeading() {
    var isLogoBlock = data.content.some(function (block) {
        return block.type === "logo"
    })
    if (!isLogoBlock) {
        return `<header><h1 class="--visually-hidden">${data.meta.title}</h1></header>`
    }
    return ''
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

function buildGlobalCSS() {
    if (data.theme.styles_v2) {
        var global = 'body {'
        for (var key in data.theme.styles_v2) {
            global += `${key}: ${data.theme.styles_v2[key]};`
        }
        global += '}'
        CSS += global
    }
    if (data.theme.variables) {
        var global = '.Block {'
        if (data.theme.variables.contentBackground)
            global += `background-color: ${data.theme.variables.contentBackground};`
        global += '}'
        CSS += global
    }
}

function generateHTML() {
    buildGlobalCSS()
    var content = buildContent(data.content)
    var head = buildHead(data)
    return pretty(`<!DOCTYPE html>
<html lang="en">
    ${head}
    <body>
        <div class="___johannes">
            ${a11yTopLevelHeading()}
            <main id="main" role="main">
                ${content}
            </main>
        </div>
    </body>
</html>`)
}

fs.writeFileSync('___dev.html', generateHTML())