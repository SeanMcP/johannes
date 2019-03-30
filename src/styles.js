function buildBlockCSS(id, styles, theme) {
    var output = ''
    if (styles) {
        output += `#${id} {`
        for (var key in styles) {
            var value = styles[key]
            if (value[0] === '@') {
                var variable = value.slice(1)
                if (theme.variables.hasOwnProperty(variable)) {
                    value = theme.variables[variable];
                } else {
                    throw new Error(`Block "${id}" referenced variable "${variable}" but no variable by name exists in theme variables.`)
                }
            }
            output += `${key}:${value};`
        }
        output += '}'
    }
    return output
}

function buildGlobalCSS(theme) {
    var output = ''
    if (theme.styles_v2) {
        var global = 'body {'
        for (var key in theme.styles_v2) {
            global += `${key}: ${theme.styles_v2[key]};`
        }
        global += '}'
        output += global
    }
    if (theme.variables) {
        var global = '.Block {'
        if (theme.variables.contentBackground)
            global += `background-color: ${theme.variables.contentBackground};`
        global += '}'
        output += global
    }
    return output
}

module.exports = {
    buildBlockCSS,
    buildGlobalCSS
}