var fs = require('fs')
var pretty = require('pretty')
var data = require('../examples/data.json')
var buildContent = require('./blocks').buildContent
var buildGlobalCSS = require('./styles').buildGlobalCSS

function buildHead({
    meta,
    theme
}, css) {
    return `
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${meta.title}</title>
        ${meta.description && `<meta name="description" content="${meta.description}">`}
        ${addCustomFont(theme.customFont)}
        <link rel="stylesheet" type="text/css" href="src/styles.css" />
        <style type="text/css">${css}</style>
    </head>`
}

function addCustomFont(family) {
    return family ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${family}" />` : ''
}

function a11yTopLevelHeading() {
    var isLogoBlock = data.content.some(function (block) {
        return block.type === "logo"
    })
    return !isLogoBlock ? `<header><h1 class="--visually-hidden">${data.meta.title}</h1></header>` : ''
}

function generateHTML() {
    var {
        elements,
        styles
    } = buildContent(data)
    // Remember: order matters here ⤵️
    var css = ''.concat(buildGlobalCSS(data), styles)

    return pretty(`<!DOCTYPE html>
<html lang="en">
    ${buildHead(data, css)}
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