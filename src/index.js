// ========================================
// Global variables
// ========================================

var appDiv = document.getElementById('app')

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
// Add styles
// ========================================

function addGlobalStyles(styles) {
    var parent = document.querySelector('head')
    var tag = document.createElement('style')
    var str = 'body{'

    // Check for valid CSS

    for (var prop in styles) {
        str += `${prop}:${styles[prop]};`
    }
    str += '}'

    tag.textContent = str
    parent.appendChild(tag)
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

function printWindow(obj) {
    var window = document.createElement('div')
    window.classList.add('window')
    if (obj.options) {
        if (obj.options.parallax) {
            window.classList.add('parallax')
        }
    }
    window.style.backgroundImage = `url(${obj.data})`
    appDiv.appendChild(window)
}

function printText(obj) {
    var text = document.createElement('div')
    text.classList.add('text')
    if (obj.options) {
        text.style.textAlign = obj.options.align
    }
    text.innerHTML = obj.data
    appDiv.appendChild(text)
}

function printContent(content) {
    var functionHash = {
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