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

function createDivWithClass(htmlClass) {
    var tag = document.createElement('div')
    tag.classList.add(htmlClass)
    return tag
}

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

function printAddress(obj) {
    var address = createDivWithClass('address')

    var heading = document.createElement('h2')
    heading.textContent = "Address"
    address.appendChild(heading)

    var pTag = document.createElement('p')
    var html = obj.data.slice(0, obj.data.indexOf(',')) 
        + `<br>`
        + obj.data.slice(obj.data.indexOf(',') + 1)
    pTag.innerHTML = html

    address.appendChild(pTag)

    if (obj.options) {
        if (obj.options.backgroundColor) {
            address.style.backgroundColor = obj.options.backgroundColor
        }
        if (obj.options.map) {
            var map = document.createElement('iframe')
            map.classList.add('map')
            map.src = obj.options.map
            map.allowFullscreen = true
            map.frameBorder = 0
            map.height = 300
            map.style.border = 0
            map.width = '100%'

            address.appendChild(map)
        }
        if (obj.options.textAlign) {
            address.style.textAlign = obj.options.textAlign
        }
    }

    appTag.appendChild(address)
}

function printHero(obj) {
    var hero = document.createElement('div')
    hero.classList.add('hero')
    hero.style.backgroundImage = `url(${obj.data.background})`

    var title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML = obj.data.title
    hero.appendChild(title)

    var tag = document.createElement('div')
    tag.classList.add('tag')
    tag.innerHTML = obj.data.tag
    hero.appendChild(tag)

    var action = document.createElement('div')
    action.classList.add('call-to-action')
    var link = createExternalLink(obj.data.action.href)
    link.textContent = obj.data.action.text
    action.appendChild(link)
    hero.appendChild(action)

    if (obj.options) {
        if (obj.options.textAlign) {
            hero.style.textAlign = obj.options.textAlign
        }
        if (obj.options.color) {
            hero.style.color = obj.options.color
        }
    }

    appTag.appendChild(hero)
}

function printHours(obj) {
    var hours = document.createElement('div')
    hours.classList.add(
        'hours',
        obj.options && obj.options.mode
            ? obj.options.mode
            : ''
    )

    var heading = document.createElement('h2')
    heading.textContent = "Hours"
    hours.appendChild(heading)

    if (obj.options) {
        if (obj.options.backgroundColor) {
            hours.style.backgroundColor = obj.options.backgroundColor
        }
        if (obj.options.textAlign) {
            heading.style.textAlign = obj.options.textAlign
        }
    }

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    
    days.forEach(function(day) {
        var row = document.createElement('div')
        row.classList.add('row')

        var daySpan = document.createElement('span')
        daySpan.classList.add('day')
        daySpan.textContent = day[0].toUpperCase() + day.slice(1)
        row.appendChild(daySpan)

        var divider = document.createElement('span')
        divider.classList.add('divider')
        row.appendChild(divider)

        var time = document.createElement('span')
        time.classList.add('time')
        time.textContent = obj.data[day]
        row.appendChild(time)

        hours.appendChild(row)
    })

    appTag.appendChild(hours)
}

function printSocialIcons(obj) {
    var social = document.createElement('div')
    social.classList.add(
        'social',
        obj.options && obj.options.mode
            ? obj.options.mode
            : ''
    )
    addFontAwesome()

    for (var platform in obj.data) {
        var aTag = createExternalLink(obj.data[platform])
        
        var iTag = document.createElement('i')
        iTag.title = platform[0].toUpperCase() + platform.slice(1)
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
        address: printAddress,
        hero: printHero,
        hours: printHours,
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