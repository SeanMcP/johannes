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

function printWindow(src) {
    var window = document.createElement('div')
    window.classList.add('window')
    window.style.backgroundImage = `url(${src})`
    appDiv.appendChild(window)
}

function printText(src) {
    var text = document.createElement('div')
    text.classList.add('text')
    text.innerHTML = src
    appDiv.appendChild(text)
}

function printContent(content) {
    var functionHash = {
        text: printText,
        window: printWindow
    }
    content.forEach(function (obj) {
        if (functionHash.hasOwnProperty(obj.type)) {
            functionHash[obj.type](obj.src)
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