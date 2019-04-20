var fs = require('fs')
var path = require('path')
var remark = require('remark')
var html = require('remark-html')
var highlight = require('remark-highlight.js')
var { capitalize, getClass, getId } = require('./utils')
var buildBlockCSS = require('./styles').buildBlockCSS
var BLOCK_TYPE = require('./constants').BLOCK_TYPE

function openBlockTag({ block, className = '', id, style = '' }) {
    var classList = ['Block', capitalize(block.type), block.type]
    if (block.options && block.options.stacked) classList.push('Block--stacked')
    if (className) classList.push(className)
    return `
    <section
        id="${id}"
        class="${classList.join(' ')}"
        ${style ? `style="${style}"` : ''}
    >`
}

function closeBlockTag() {
    return `</section>`
}

var buildFunctionMap = {
    [BLOCK_TYPE.text]: buildTextBlock,
    [BLOCK_TYPE.markdown]: buildMarkdownBlock,
    [BLOCK_TYPE.window]: buildWindowBlock
}

function buildContent({ content, theme }) {
    var styles = ''
    var elements = content.reduce(function(accumulator, block) {
        var id = getId(block.type)

        if (buildFunctionMap.hasOwnProperty(block.type)) {
            var output = buildFunctionMap[block.type]({
                block,
                id,
                theme
            })
            if (output.elements) accumulator += output.elements
            if (output.styles) styles += output.styles
        }

        return accumulator
    }, '')
    return {
        elements,
        styles
    }
}

function buildMarkdownBlock({ block, id, theme }) {
    var {
        data: { source }
    } = block
    var styles = buildBlockCSS(id, block.styles, theme)
    var elements = openBlockTag({
        block,
        id
    })

    try {
        var buffer = fs.readFileSync(path.join(global.config.cwd, source), {
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
        console.log(ex)
        process.exit(1)
    }

    elements += closeBlockTag()

    return {
        elements,
        styles
    }
}

function buildTextBlock({ block, id, theme }) {
    var {
        data: { heading, paragraphs }
    } = block
    var styles = buildBlockCSS(id, block.styles, theme)
    var elements = openBlockTag({
        block,
        id
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

function buildWindowBlock({ block, id, theme }) {
    var { options } = block
    var styles = buildBlockCSS(
        id,
        {
            ...block.styles,
            'background-image': `url(${block.data.url})`
        },
        theme
    )
    var elements = openBlockTag({
        block,
        className: getClass(options && options.parallax, 'Window--parallax'),
        id
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
