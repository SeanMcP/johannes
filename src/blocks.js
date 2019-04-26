const fs = require('fs')
const path = require('path')
const remark = require('remark')
const html = require('remark-html')
const highlight = require('remark-highlight.js')
const { capitalize, getClass, getId } = require('./utils')
const buildBlockCSS = require('./styles').buildBlockCSS
const BLOCK_TYPE = require('./constants').BLOCK_TYPE

function openBlockTag({ block, className = '', style = '' }) {
    // TODO: Remove lowercase block.type
    const classList = ['Block', capitalize(block.type), block.type]
    if (block.options && block.options.stacked) classList.push('Block--stacked')
    if (className) classList.push(className)
    return `
    <section
        id="${block.id}"
        class="${classList.join(' ')}"
        ${style ? `style="${style}"` : ''}
    >`
}

function closeBlockTag() {
    return `</section>`
}

const buildFunctionMap = {
    [BLOCK_TYPE.button]: buildButtonBlock,
    [BLOCK_TYPE.text]: buildTextBlock,
    [BLOCK_TYPE.markdown]: buildMarkdownBlock,
    [BLOCK_TYPE.window]: buildWindowBlock
}

function buildContent() {
    const { content } = global.data
    let styles = ''
    let elements = ''
    for (const block of content) {
        block.id = getId(block.type)

        // TODO: Replace this with try/catch once
        // all builder functions are completed
        if (buildFunctionMap.hasOwnProperty(block.type)) {
            const output = buildFunctionMap[block.type](block)
            if (output.elements) elements += output.elements
            if (output.styles) styles += output.styles
        }
    }
    return {
        elements,
        styles
    }
}

function buildButtonBlock(block) {
    const {
        data: { href, text },
        id,
        options = {}
    } = block
    const styles = buildBlockCSS(id, block.styles)
    let elements = openBlockTag({ block })

    const buttonClass = 'Button__button'
    const buttonStyles = `
    #${id} a.${buttonClass} {
        background: ${options.buttonColor || global.theme.primaryColor};
        color: ${options.buttonTextColor || white};
    }
    `

    elements += `
        <a class=${buttonClass} href=${href}>${text}</a>
    `
    elements += closeBlockTag()

    return {
        elements,
        styles: styles + buttonStyles
    }
}

function buildMarkdownBlock(block) {
    const {
        data: { source },
        id
    } = block
    const styles = buildBlockCSS(id, block.styles)
    let elements = openBlockTag({
        block
    })

    try {
        const buffer = fs.readFileSync(path.join(global.config.cwd, source), {
            encoding: 'utf8'
        })
        remark()
            .use(highlight)
            .use(html)
            .process(buffer.toString(), function(err, htmlString) {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
                elements += htmlString
            })
    } catch (ex) {
        console.error(ex)
        process.exit(1)
    }

    elements += closeBlockTag()

    return {
        elements,
        styles
    }
}

function buildTextBlock(block) {
    const {
        data: { heading, paragraphs },
        id
    } = block
    const styles = buildBlockCSS(id, block.styles)
    let elements = openBlockTag({
        block
    })
    if (heading) elements += `<h2>${heading}</h2>`
    if (paragraphs) {
        paragraphs.forEach(function(paragraph) {
            elements += `<p>${paragraph}</p>`
        })
    }
    elements += closeBlockTag()
    return {
        elements,
        styles
    }
}

function buildWindowBlock(block) {
    const { id, options } = block
    const styles = buildBlockCSS(id, {
        ...block.styles,
        'background-image': `url(${block.data.url})`
    })
    let elements = openBlockTag({
        block,
        className: getClass(options && options.parallax, 'Window--parallax')
    })
    elements += closeBlockTag()
    return {
        elements,
        styles
    }
}

module.exports = {
    buildContent
}
