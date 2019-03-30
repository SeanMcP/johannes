var getId = require('./utils').getId
var buildBlockCSS = require('./styles').buildBlockCSS

function buildContent(data) {
    var styles = ''
    var elements = data.content.reduce(function (accumulator, block) {
        var id = getId(block.type)
        styles += buildBlockCSS(id, block.styles, data.theme)
        accumulator += `<section id="${id}" class="Block Block--${block.type} ${block.type} ${isStacked(block)}">`
        switch (block.type) {
            case 'text':
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

function isStacked(block) {
    if (block.options && block.options.stacked)
        return 'Block--stacked'
    return ''
}

function buildTextBlock(block) {
    var output = ''
    if (block.data.heading) output += `<h2>${block.data.heading}</h2>`
    if (block.data.paragraphs) {
        block.data.paragraphs.forEach(function (paragraph) {
            output += `<p>${paragraph}</p>`
        })
    }
    return output
}

module.exports = {
    buildContent
}