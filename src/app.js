const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const pretty = require('pretty')
const CleanCSS = require('clean-css')
const buildContent = require('./blocks').buildContent
const buildGlobalCSS = require('./styles').buildGlobalCSS
const buildHead = require('./meta').buildHead
const ifDev = require('./utils').ifDev

const config = require('./setup').getConfig()
global.config = config

ifDev(() => console.log('Build configs:', config))

console.log('Start time:', new Date())

try {
    global.data = require(path.join(config.cwd, config.input))
} catch (ex) {
    console.error(ex)
    process.exit(1)
}

function a11yTopLevelHeading() {
    const {
        data: { content, meta }
    } = global
    const isLogoBlock = content.some(function(block) {
        return block.type === 'logo'
    })
    return !isLogoBlock
        ? `<header><h1 class="--visually-hidden">${meta.title}</h1></header>`
        : ''
}

function generateHTML() {
    const { elements, styles } = buildContent()
    // Remember: order matters here ⤵️
    const css = buildGlobalCSS() + styles

    return pretty(`<!DOCTYPE html>
<!-- Johannes build: ${new Date()} -->
<html lang="en">
    ${buildHead(css)}
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
    const output = path.join(config.cwd, config.output)
    mkdirp(output, function(err) {
        if (err) {
            console.error(err)
            process.exit(1)
        } else {
            console.log('Gathering base styles...')
            const stylesBuffer = fs.readFileSync(
                path.join(__dirname, './styles.css'),
                {
                    encoding: 'utf-8'
                }
            )
            console.log('Gathering Gutenberg styles...')
            const gutenbergBuffer = fs.readFileSync(
                path.join(
                    __dirname,
                    '../node_modules/gutenberg-web-type/src/style/gutenberg.css'
                ),
                {
                    encoding: 'utf-8'
                }
            )
            console.log('Gathering Highlight.js theme...')
            const highlightBuffer = fs.readFileSync(
                path.join(
                    __dirname,
                    '../node_modules/highlight.js/styles/a11y-light.css'
                ),
                {
                    encoding: 'utf-8'
                }
            )
            const combindedStyles = new CleanCSS().minify(
                // highlight first so that styles can be
                // overwritten
                highlightBuffer.toString() +
                    gutenbergBuffer.toString() +
                    stylesBuffer.toString()
            ).styles
            console.log('Creating CSS file...')
            fs.writeFileSync(
                path.join(output, config.stylesFilename),
                combindedStyles
            )
            // Create HTML
            console.log('Creating HTML file...')
            fs.writeFileSync(path.join(output, config.filename), generateHTML())
            console.log('End time:', new Date())
        }
    })
}

module.exports = johannes
