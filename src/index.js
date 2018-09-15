// ========================================
// Global variables
// ========================================

var appTag = document.getElementById('app')
var headTag = document.querySelector('head')

// ========================================
// Get data
// ========================================

function fetchData() {
    fetch('./data.json')
        .then(function(raw) {
            return raw.json()
        })
        .then(function(res) {
            johannes(res)
        })
        // Handle fetch error
}

// ========================================
// Utility functions
// ========================================

function createExternalLink(href) {
    var aTag = document.createElement('a')
    aTag.href = href
    aTag.target = '_blank'
    aTag.rel = 'noopener noreferrer'
    return aTag
}

// ========================================
// Add styles
// ========================================

function addGlobalStyles(styles) {
    var tag = document.querySelector('body')

    for (var prop in styles) {
        tag.style[prop] = styles[prop]
    }
}

// ========================================
// Add meta data
// ========================================

function setPageTitle(title) {
    var tag = document.querySelector('title')
    tag.textContent = title
}

// ========================================
// Print content
// ========================================

function addFontAwesome() {
    var linkTag = document.createElement('link')
    linkTag.rel = 'stylesheet'
    linkTag.href = 'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
    linkTag.integrity = 'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU'
    linkTag.crossOrigin = 'anonymous'

    headTag.appendChild(linkTag)
}

function printSocialIcons(obj) {
    var social = document.createElement('div')
    social.classList.add('social')
    addFontAwesome()

    for (var platform in obj.data) {
        var aTag = createExternalLink(obj.data[platform])

        var iTag = document.createElement('i')
        iTag.classList.add(
            'fab',
            `fa-${platform}`,
            obj.options && obj.options.size
                ? `fa-${obj.options.size}`
                : ''
        )

        aTag.appendChild(iTag)
        social.appendChild(aTag)
    }

    appTag.appendChild(social)
}

function printText(obj) {
    var text = document.createElement('div')
    text.classList.add('text')
    if (obj.options) {
        if (obj.options.backgroundColor) {
            text.style.backgroundColor = obj.options.backgroundColor
        }
        if (obj.options.color) {
            text.style.color = obj.options.color
        }
        if (obj.options.textAlign) {
            text.style.textAlign = obj.options.textAlign
        }
    }
    text.innerHTML = obj.data
    appTag.appendChild(text)
}

function printWindow(obj) {
    var window = document.createElement('div')
    window.classList.add('window')
    if (obj.options) {
        if (obj.options.parallax) {
            window.classList.add('parallax')
        }
    }
    window.style.backgroundImage = `url(${obj.data})`
    appTag.appendChild(window)
}

function printContent(content) {
    var functionHash = {
        social: printSocialIcons,
        text: printText,
        window: printWindow
    }
    content.forEach(function (obj) {
        if (functionHash.hasOwnProperty(obj.type)) {
            functionHash[obj.type](obj)
        }
    })
}

// ========================================
// Build page
// ========================================

function johannes(data) {
    setPageTitle(data.meta.title)
    addGlobalStyles(data.styles)
    printContent(data.content)
}

fetchData()