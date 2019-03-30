var getId = require('./utils').getId
var buildBlockCSS = require('./styles').buildBlockCSS
var BLOCK_TYPE = require('./constants').BLOCK_TYPE

function buildContent({
    content,
    theme
}) {
    var styles = ''
    var elements = content.reduce(function (accumulator, block) {
        var id = getId(block.type)
        styles += buildBlockCSS(id, block.styles, theme)
        accumulator += `<section id="${id}" class="Block Block--${block.type} ${block.type} ${isStacked(block)}">`
        switch (block.type) {
            case BLOCK_TYPE.text:
                {
                    accumulator += buildTextBlock(block)
                }
        }
        accumulator += `</section>`
        return accumulator
    }, '')
    return {
        elements,
        styles
    }
}

function isStacked({
    options
}) {
    if (options && options.stacked)
        return 'Block--stacked'
    return ''
}

function buildTextBlock({
    data
}) {
    var output = ''
    if (data.heading) output += `<h2>${data.heading}</h2>`
    if (data.paragraphs) {
        data.paragraphs.forEach(function (paragraph) {
            output += `<p>${paragraph}</p>`
        })
    }
    return output
}

module.exports = {
    buildContent
}