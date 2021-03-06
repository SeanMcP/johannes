function buildHead(css) {
    const { meta, theme } = global.data
    return `
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${meta.title}</title>
        ${meta.description &&
            `<meta name="description" content="${meta.description}">`}
        ${addCustomFont(theme.customFont)}
        <link rel="stylesheet" type="text/css" href="./${
            global.config.stylesFilename
        }" />
        <style type="text/css">${css}</style>
    </head>`
}

function addCustomFont(family) {
    return family
        ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${family}" />`
        : ''
}

module.exports = {
    buildHead
}
