const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const pretty = require('pretty')
const CleanCSS = require('clean-css')
const buildContent = require('./blocks').buildContent
const buildGlobalCSS = require('./styles').buildGlobalCSS
const buildHead = require('./meta').buildHead
const { ifDev, logProcess } = require('./utils')
const { preprocessData } = require('./preprocess')

const config = require('./setup').getConfig()
global.config = config

ifDev(() => console.log('Build configs:', config))

console.log('Start at', new Date())

try {
    global.data = logProcess(`Reading from ${config.input}`, () =>
        require(path.join(config.cwd, config.input))
    )
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
            const stylesBuffer = logProcess('Gathering base styles', () =>
                fs.readFileSync(path.join(__dirname, './styles.css'), {
                    encoding: 'utf-8'
                })
            )

            const gutenbergBuffer = logProcess(
                'Gathering Gutenberg styles',
                () =>
                    fs.readFileSync(
                        path.join(
                            __dirname,
                            '../node_modules/gutenberg-web-type/src/style/gutenberg.css'
                        ),
                        {
                            encoding: 'utf-8'
                        }
                    )
            )

            const highlightBuffer = logProcess(
                'Gathering Highlight theme',
                () =>
                    fs.readFileSync(
                        path.join(
                            __dirname,
                            '../node_modules/highlight.js/styles/a11y-light.css'
                        ),
                        {
                            encoding: 'utf-8'
                        }
                    )
            )

            const cssClasses = logProcess(
                'Processing data',
                preprocessData
            )

            const combindedStyles = new CleanCSS().minify(
                // highlight first so that styles can be
                // overwritten
                highlightBuffer.toString() +
                    gutenbergBuffer.toString() +
                    stylesBuffer.toString() +
                    cssClasses
            ).styles
            logProcess('Creating CSS file', () =>
                fs.writeFileSync(
                    path.join(output, config.stylesFilename),
                    combindedStyles
                )
            )
            // Create HTML
            logProcess('Creating HTML file', () =>
                fs.writeFileSync(
                    path.join(output, config.filename),
                    generateHTML()
                )
            )
            console.log('End at', new Date())
            console.log(`Done in ${chalk.green(process.uptime() + 's')}`)
        }
    })
}

module.exports = johannes
