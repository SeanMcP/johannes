var fs = require('fs')
var pretty = require('pretty')
var data = require('../examples/data.json')
var buildContent = require('./blocks').buildContent
var buildGlobalCSS = require('./styles').buildGlobalCSS
var buildHead = require('./meta').buildHead

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