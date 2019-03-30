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

function buildGlobalCSS(data) {
    var output = ''
    if (data.theme.styles_v2) {
        var global = 'body {'
        for (var key in data.theme.styles_v2) {
            global += `${key}: ${data.theme.styles_v2[key]};`
        }
        global += '}'
        output += global
    }
    if (data.theme.variables) {
        var global = '.Block {'
        if (data.theme.variables.contentBackground)
            global += `background-color: ${data.theme.variables.contentBackground};`
        global += '}'
        output += global
    }
    return output
}

module.exports = {
    buildBlockCSS,
    buildGlobalCSS
}