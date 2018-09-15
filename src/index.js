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

function setPageTitle(title) {
    var tag = document.querySelector('title')
    tag.textContent = title
}

function johannes(data) {
    console.log(data)
    setPageTitle(data.meta.title)
    addGlobalStyles(data.styles)
}

fetchData()