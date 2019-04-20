var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var pretty = require('pretty')
var buildContent = require('./blocks').buildContent
var buildGlobalCSS = require('./styles').buildGlobalCSS
var buildHead = require('./meta').buildHead
var ifDev = require('./utils').ifDev

var config = require('./setup').getConfig()

process.env.NODE_ENV = config.env

ifDev(() => console.log('Build configs:', config))

console.log('Start time:', new Date())

var data

try {
    data = require(path.join(config.cwd, config.input))
} catch (ex) {
    console.log(ex)
    process.exit(1)
}

function a11yTopLevelHeading() {
    var isLogoBlock = data.content.some(function(block) {
        return block.type === 'logo'
    })
    return !isLogoBlock
        ? `<header><h1 class="--visually-hidden">${
              data.meta.title
          }</h1></header>`
        : ''
}

function generateHTML() {
    var { elements, styles } = buildContent(data)
    // Remember: order matters here ⤵️
    var css = ''.concat(buildGlobalCSS(data), styles)

    return pretty(`<!DOCTYPE html>
<!-- Johannes build: ${new Date()} -->
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

function johannes() {
    var output = path.join(config.cwd, config.output)
    mkdirp(output, function(err) {
        if (err) {
            console.error(err)
            process.exit(1)
        } else {
            fs.writeFileSync(path.join(output, config.filename), generateHTML())
            console.log('End time:', new Date())
        }
    })
}

module.exports = johannes
