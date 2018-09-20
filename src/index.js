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
    pTag.innerHTML = obj.data

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

function printContactForm(obj, variables) {
    var contact = createDivWithClass('contact')
    contact.style.backgroundColor = obj.options && obj.options.backgroundColor
        ? obj.options.backgroundColor
        : variables.contentBackground

    var title = document.createElement('h2')
    title.textContent = obj.data.title
    contact.appendChild(title)

    var message = document.createElement('p')
    message.textContent = obj.data.message
    contact.appendChild(message)

    var form = createDivWithClass('form')
    form.onchange = function() {
        var subjectVal = document.getElementById('contact-subject').value
        var bodyVal = document.getElementById('contact-body').value
        var button = this.querySelector('.button')

        if (subjectVal && bodyVal) {
            if (button.classList.contains('disabled')) {
                button.classList.remove('disabled')
            }
        } else {
            if (!button.classList.contains('disabled')) {
                button.classList.add('disabled')
            }
        }
    }

    function dismissError(e) {
        if (e.target.value && this.classList.contains('error')) {
            this.classList.remove('error')
            document.querySelector('.contact .message').textContent = ''
        }
    }

    var subject = createDivWithClass('subject')
    subject.classList.add('field')
    var subjectLabel = document.createElement('label')
    subjectLabel.htmlFor = 'contact-subject'
    subjectLabel.textContent = 'Subject'
    subject.appendChild(subjectLabel)

    var subjectInput = document.createElement('input')
    subjectInput.id = 'contact-subject'
    subjectInput.type = 'text'
    subjectInput.onchange = dismissError
    subject.appendChild(subjectInput)

    form.appendChild(subject)

    var body = createDivWithClass('body')
    body.classList.add('field')
    var bodyLabel = document.createElement('label')
    bodyLabel.htmlFor = 'contact-body'
    bodyLabel.textContent = 'Message'
    body.appendChild(bodyLabel)

    var bodyInput = document.createElement('textarea')
    bodyInput.id = 'contact-body'
    bodyInput.onchange = dismissError
    body.appendChild(bodyInput)
    
    form.appendChild(body)

    var footer = createDivWithClass('footer')

    var button = document.createElement('span')
    button.classList.add('button', 'disabled')
    button.style.backgroundColor = obj.options && obj.options.buttonColor
        ? obj.options.buttonColor
        : variables.primaryColor
    button.style.color = obj.options && obj.options.buttonTextColor
        ? obj.options.buttonTextColor
        : 'white'
    button.id = 'contact-submit'
    button.textContent = 'Send email'
    button.onclick = function() {
        var subject = document.getElementById('contact-subject')
        var body = document.getElementById('contact-body')

        if (subject.value && body.value) {
            var anchor = document.createElement('a')
            anchor.href = `mailto:${obj.data.email}?subject=${
                encodeURIComponent(subject.value)
            }&body=${encodeURIComponent(body.value)}`
            anchor.click()
            subject.value = ''
            body.value = ''
        }
    }
    footer.appendChild(button)

    form.appendChild(footer)

    contact.appendChild(form)

    if (obj.options) {
        if (obj.options.textAlign) {
            var textAlign = obj.options.textAlign
            title.style.textAlign = textAlign
            var justifyContent
            if (textAlign === 'center') {
                justifyContent = textAlign
            } else if (textAlign === 'right') {
                justifyContent = 'flex-end'
            }
            footer.style.justifyContent = justifyContent
        }
    }

    appTag.appendChild(contact)
}

function printHero(obj, variables) {
    var hero = document.createElement('div')
    hero.classList.add('hero')
    hero.style.backgroundColor = variables.contentBackground
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
    link.classList.add('button')
    link.style.backgroundColor = obj.options && obj.options.buttonColor
        ? obj.options.buttonColor
        : variables.primaryColor
    link.style.color = obj.options && obj.options.buttonTextColor
        ? obj.options.buttonTextColor
        : 'white'
    link.textContent = obj.data.action.text
    action.appendChild(link)
    hero.appendChild(action)

    if (obj.options) {
        if (obj.options.textAlign) {
            hero.style.textAlign = obj.options.textAlign
        }
        if (obj.options.textColor) {
            hero.style.color = obj.options.textColor
        }
    }

    appTag.appendChild(hero)
}

function printHours(obj, variables) {
    var hours = createDivWithClass('hours')
    if (obj.options && obj.options.mode) {
        hours.classList.add(obj.options.mode)
    }
    hours.style.backgroundColor = obj.options && obj.options.backgroundColor
        ? obj.options.backgroundColor
        : variables.contentBackground

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
        var row = createDivWithClass('row')

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

function printHtml(obj, variables) {
    var html = createDivWithClass('html')
    html.style.backgroundColor = obj.options && obj.options.backgroundColor
        ? obj.options.backgroundColor
        : variables.contentBackground
    if (obj.options) {
        if (obj.options.textColor) {
            html.style.color = obj.options.textColor
        }
        if (obj.options.textAlign) {
            html.style.textAlign = obj.options.textAlign
        }
    }
    html.innerHTML = obj.data.innerHTML
    appTag.appendChild(html)
}

function printSocialIcons(obj, variables) {
    addFontAwesome()
    var social = createDivWithClass('social')
    if (obj.options && obj.options.mode) {
        social.classList.add(obj.options.mode)
    }
    social.style.backgroundColor = obj.options && obj.options.backgroundColor
        ? obj.options.backgroundColor
        : variables.contentBackground

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

function printText(obj, variables) {
    var text = createDivWithClass('text')
    text.style.backgroundColor = obj.options && obj.options.backgroundColor
        ? obj.options.backgroundColor
        : variables.contentBackground
    
    if (obj.data.heading) {
        var header = document.createElement('h1')
        header.textContent = obj.data.heading
        text.appendChild(header)
    }

    if (obj.data.paragraphs) {
        obj.data.paragraphs.forEach(function(paragraph) {
            var pTag = document.createElement('p')
            pTag.textContent = paragraph
            text.appendChild(pTag)
        })
    }

    if (obj.options) {
        if (obj.options.textColor) {
            text.style.color = obj.options.textColor
        }
        if (obj.options.textAlign) {
            text.style.textAlign = obj.options.textAlign
        }
    }

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

function printContent(content, variables) {
    var functionHash = {
        address: printAddress,
        contact: printContactForm,
        hero: printHero,
        hours: printHours,
        html: printHtml,
        social: printSocialIcons,
        text: printText,
        window: printWindow
    }
    content.forEach(function (obj) {
        if (functionHash.hasOwnProperty(obj.type)) {
            functionHash[obj.type](obj, variables)
        }
    })
}

// ========================================
// Build page
// ========================================

function johannes(data) {
    setPageTitle(data.meta.title)
    addGlobalStyles(data.theme.styles)
    printContent(data.content, data.theme.variables)
}

fetchData()