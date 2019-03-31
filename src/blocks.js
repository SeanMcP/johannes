var utils = require('./utils')
var getId = utils.getId
var capitalize = utils.capitalize
var buildBlockCSS = require('./styles').buildBlockCSS
var BLOCK_TYPE = require('./constants').BLOCK_TYPE

function openBlockTag({
    block,
    className = '',
    id,
    style = ""
}) {
    return `
    <section
        id="${id}"
        class="Block ${
            capitalize(block.type)
        } ${
            block.type
        } ${className} ${
            isStacked(block.options)
        }"
        ${style ? `style="${style}"` : ''}
    >`
}

function closeBlockTag() {
    return `</section>`
}

function buildContent({
    content,
    theme
}) {
    var styles = ''
    var elements = content.reduce(function (accumulator, block) {
        var id = getId(block.type)
        styles += buildBlockCSS(id, block.styles, theme)
        switch (block.type) {
            case BLOCK_TYPE.text:
                {
                    var output = buildTextBlock({
                        block,
                        id,
                        theme
                    })
                    accumulator += output.elements
                    styles += output.styles
                    break
                }
            case BLOCK_TYPE.window:
                {
                    var output = buildWindowBlock({
                        block,
                        id,
                        theme
                    })
                    accumulator += output.elements
                    styles += output.styles
                    break
                }
        }
        // accumulator += `</section>`
        return accumulator
    }, '')
    return {
        elements,
        styles
    }
}

function isStacked(options) {
    if (options && options.stacked) return 'Block--stacked'
    return ''
}

function buildTextBlock({
    block,
    id,
    theme
}) {
    var {
        data: {
            heading,
            paragraphs
        }
    } = block
    var styles = buildBlockCSS(id, block.styles, theme)
    var output = openBlockTag({
        block,
        id
    })
    if (heading) output += `<h2>${heading}</h2>`
    if (paragraphs) {
        paragraphs.forEach(function (paragraph) {
            output += `<p>${paragraph}</p>`
        })
    }
    output += closeBlockTag()
    return {
        elements: output,
        styles
    }
}

function buildWindowBlock({
    block,
    id,
    theme
}) {
    var {
        options
    } = block
    var styles = buildBlockCSS(id, {
        ...block.styles,
        'background-image': `url(${block.data.url})`
    }, theme)
    var output = openBlockTag({
        block,
        className: options && options.parallax ? 'Window--parallax' : '',
        id
    })
    output += closeBlockTag()
    return {
        elements: output,
        styles
    }
}

module.exports = {
    buildContent
}