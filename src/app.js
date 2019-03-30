var fs = require('fs')
var pretty = require('pretty')
var data = require('../examples/data.json')
var buildContent = require('./blocks').buildContent
var buildGlobalCSS = require('./styles').buildGlobalCSS

function buildHead(data, CSS) {
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

function addCustomFont(family) {
    if (family)
        return `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${family}" />`
    return ''
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

function generateHTML() {
    var {
        elements,
        styles
    } = buildContent(data)
    // Remember: order matters here
    var CSS = ''.concat(buildGlobalCSS(data), styles)

    return pretty(`<!DOCTYPE html>
<html lang="en">
    ${buildHead(data, CSS)}
    <body>
        <div class="___johannes">
            ${a11yTopLevelHeading()}
            <main id="main" role="main">
                ${elements}
            </main>
        </div>
    </body>
</html>`)
}

fs.writeFileSync('___dev.html', generateHTML())