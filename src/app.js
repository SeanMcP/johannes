var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var pretty = require('pretty')
var CleanCSS = require('clean-css')
var buildContent = require('./blocks').buildContent
var buildGlobalCSS = require('./styles').buildGlobalCSS
var buildHead = require('./meta').buildHead
var ifDev = require('./utils').ifDev

var config = require('./setup').getConfig()
global.config = config

ifDev(() => console.log('Build configs:', config))

console.log('Start time:', new Date())

var data

try {
    data = require(path.join(config.cwd, config.input))
    global.data = require(path.join(config.cwd, config.input))
} catch (ex) {
    console.error(ex)
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
    var { elements, styles } = buildContent()
    // Remember: order matters here ⤵️
    var css = buildGlobalCSS(data) + styles

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
            var stylesBuffer = fs.readFileSync(
                path.join(__dirname, './styles.css'),
                {
                    encoding: 'utf-8'
                }
            )
            var gutenbergBuffer = fs.readFileSync(
                path.join(
                    __dirname,
                    '../node_modules/gutenberg-web-type/src/style/gutenberg.css'
                ),
                {
                    encoding: 'utf-8'
                }
            )
            var highlightBuffer = fs.readFileSync(
                path.join(
                    __dirname,
                    '../node_modules/highlight.js/styles/a11y-light.css'
                ),
                {
                    encoding: 'utf-8'
                }
            )
            var combindedStyles = new CleanCSS().minify(
                // highlight first so that styles can be
                // overwritten
                highlightBuffer.toString() +
                    gutenbergBuffer.toString() +
                    stylesBuffer.toString()
            ).styles
            fs.writeFileSync(
                path.join(output, config.stylesFilename),
                combindedStyles
            )
            // Create HTML
            fs.writeFileSync(path.join(output, config.filename), generateHTML())
            console.log('End time:', new Date())
        }
    })
}

module.exports = johannes
