// ========================================
// Global variables
// ========================================

var appTag = document.getElementById('app')
var headTag = document.querySelector('head')

var galleryImages = []
var galleryIndex = 0

// ========================================
// Create loader
// ========================================

var loading = createDivWithClass('loading')
var spinner = createDivWithClass('spinner')
loading.appendChild(spinner)
document.body.appendChild(loading)

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
        .catch(function(err) {
            printError(err)
        })
        .finally(function() {
            appTag.classList.add('ready')
            loading.classList.add('exit')
            setTimeout(function () {
                document.body.removeChild(loading)
            }, 1000)
        })
}

function printError(errorMessage) {
    var error = createDivWithClass('error')
    var heading = document.createElement('h1')
    heading.textContent = "Uh oh!"
    error.appendChild(heading)

    var pTag = document.createElement('p')
    pTag.textContent = "Somewhen went wrong when loading loading the site. Try again later."
    error.appendChild(pTag)

    var detailsTag = document.createElement('details')
    var summaryTag = document.createElement('summary')
    summaryTag.textContent = "Site admin:"
    detailsTag.appendChild(summaryTag)

    var message = createElementWithClass('p', 'error-message')
    message.textContent = errorMessage
    detailsTag.appendChild(message)
    
    var suggestion = document.createElement('p')
    suggestion.innerHTML = "Does this directory have a <code>data.json</code> file?"
    detailsTag.appendChild(suggestion)
    
    error.appendChild(detailsTag)
    appTag.appendChild(error)
}

// ========================================
// Utility functions
// ========================================

function createElementWithClass(element, htmlClass) {
    var tag = document.createElement(element)
    if (Array.isArray(htmlClass)) {
        htmlClass.forEach(function(singleClass) {
            tag.classList.add(singleClass)
        })
    } else {
        tag.classList.add(htmlClass)
    }
    return tag
}

function createDivWithClass(htmlClass) {
    return createElementWithClass('div', htmlClass)
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

function addCustomFont(family) {
    var tag = document.createElement('link')
    tag.rel = 'stylesheet'
    tag.href = `https://fonts.googleapis.com/css?family=${family}`
    headTag.appendChild(tag)
}

function addFavicons() {
    var sizes = ['16x16', '32x32']
    sizes.forEach(function(size) {
        var tag = document.createElement('link')
        tag.rel = 'icon'
        tag.type = 'image/png'
        tag.href = `assets/favicon-${size}.png`
        sizes = size

        headTag.appendChild(tag)
    })
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
    obj.data.forEach(function(line, i) {
        var tag = document.createElement('span')
        tag.textContent = line;
        pTag.appendChild(tag)
        if (i < obj.data.length - 1) {
            pTag.appendChild(document.createElement('br'))
        }
    })

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

    var subject = createDivWithClass(['subject', 'field'])
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

    var body = createDivWithClass(['body', 'field'])
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

    var button = createElementWithClass('span', ['button', 'disabled'])
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

function printGallery(obj, variables) {
    var gallery = createDivWithClass('gallery')
    gallery.style.backgroundColor = obj.options && obj.options.backgroundColor
        ? obj.options.backgroundColor
        : variables.contentBackground

    if (obj.data.title) {
        var title = document.createElement('h2')
        title.textContent = obj.data.title
        if (obj.options && obj.options.textAlign) {
            title.style.textAlign = obj.options.textAlign
        }
        gallery.appendChild(title)
    }

    galleryImages = obj.data.images

    var viewer = createDivWithClass('viewer')
    viewer.style.backgroundImage = `url(${galleryImages[galleryIndex].src})`
    viewer.title = galleryImages[galleryIndex].description

    var backButton = createDivWithClass('gallery-button')
    backButton.textContent = '⟨'
    backButton.onclick = function() {
        if (galleryIndex - 1 < 0) {
            galleryIndex = galleryImages.length - 1
        } else {
            galleryIndex--
        }
        changeCurrentImage(galleryIndex, variables.primaryColor)
    }
    viewer.appendChild(backButton)

    var nextButton = createDivWithClass('gallery-button')
    nextButton.textContent = '⟩'
    nextButton.onclick = function() {
        if (galleryIndex + 1 > galleryImages.length - 1) {
            galleryIndex = 0
        } else {
            galleryIndex++
        }
        changeCurrentImage(galleryIndex, variables.primaryColor)
    }

    viewer.appendChild(nextButton)

    gallery.appendChild(viewer)

    function changeCurrentImage(newIndex, primaryColor) {
        var viewer = document.querySelector('.viewer')
        viewer.style.backgroundImage = `url(${galleryImages[newIndex].src})`
        viewer.title = galleryImages[newIndex].description
        document.querySelectorAll('.thumb')
            .forEach(function(node) {
                node.removeAttribute('style')
                if (node.classList.contains('current')) {
                    node.classList.remove('current')
                }
            })
        var currentThumb = document.querySelector(`.image-${newIndex}`)
        currentThumb.classList.add('current')
        currentThumb.style.borderColor = primaryColor
    }

    var thumbnails = createDivWithClass('thumbnails')
    galleryImages.forEach(function(imageData, index) {
        var image = document.createElement('img')
        image.src = imageData.src
        image.alt = imageData.description
        image.classList.add('thumb', `image-${index}`)
        if (index === galleryIndex) {
            image.classList.add('current')
            image.style.borderColor = variables.primaryColor
        }
        image.onclick = function() {
            changeCurrentImage(index, variables.primaryColor)
        }
        thumbnails.appendChild(image)
    })
    gallery.appendChild(thumbnails)

    if (obj.options) {
        if (obj.options.textColor) {
            gallery.style.color = obj.options.textColor
        }
    }

    appTag.appendChild(gallery)
}

function printHero(obj, variables) {
    var hero = createDivWithClass('hero')
    hero.style.backgroundColor = variables.contentBackground
    hero.style.backgroundImage = `url(${obj.data.background})`

    var title = createDivWithClass('title')
    title.innerHTML = obj.data.title
    hero.appendChild(title)

    var tag = createDivWithClass('tag')
    tag.innerHTML = obj.data.tag
    hero.appendChild(tag)

    var action = createDivWithClass('call-to-action')
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

        var daySpan = createElementWithClass('span', 'day')
        daySpan.textContent = day[0].toUpperCase() + day.slice(1)
        row.appendChild(daySpan)

        var divider = createElementWithClass('span', 'divider')
        row.appendChild(divider)

        var time = createElementWithClass('span', 'time')
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

function printLogo(obj, variables) {
    var logo = createDivWithClass('logo')
    logo.style.backgroundColor = obj.options && obj.options.backgroundColor ?
        obj.options.backgroundColor :
        variables.contentBackground

    var image = document.createElement('img')
    image.src = obj.data.src
    image.alt = obj.data.title
    logo.appendChild(image)

    var details = createDivWithClass('details')

    var title = document.createElement('h1')
    title.textContent = obj.data.title
    details.appendChild(title)

    var tagline = document.createElement('p')
    tagline.textContent = obj.data.tagline
    details.appendChild(tagline)

    logo.appendChild(details)
    
    if (obj.options) {
        if (obj.options.textColor) {
            logo.style.color = obj.options.textColor
        }
        if (obj.options.centerContent) {
            logo.style.flexDirection = 'column'
            details.style.marginTop = '1rem'
            details.style.textAlign = 'center'
        }
    }

    appTag.appendChild(logo)
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
        
        var iTag = createElementWithClass('i', [
            'fab',
            `fa-${platform}`,
            obj.options && obj.options.size ?
                `fa-${obj.options.size}` :
                '_'
        ])
        iTag.title = platform[0].toUpperCase() + platform.slice(1)

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
    var win = createDivWithClass('window')
    if (obj.options) {
        if (obj.options.height) {
            win.style.height = obj.options.height
        }
        if (obj.options.parallax) {
            win.classList.add('parallax')
        }
    }
    win.style.backgroundImage = `url(${obj.data.url})`
    appTag.appendChild(win)
}

function printContent(content, variables) {
    var functionHash = {
        address: printAddress,
        contact: printContactForm,
        gallery: printGallery,
        hero: printHero,
        hours: printHours,
        html: printHtml,
        logo: printLogo,
        social: printSocialIcons,
        text: printText,
        window: printWindow
    }
    content.forEach(function (obj) {
        if (functionHash.hasOwnProperty(obj.type)) {
            functionHash[obj.type](obj, variables)
        }
        if (obj.options && obj.options.stacked) {
            const blocks = document.querySelectorAll('#app > *')
            blocks[blocks.length - 1].classList.add('stacked')
        }
    })
}

// ========================================
// Build page
// ========================================

function johannes(data) {
    setPageTitle(data.meta.title)
    if (data.theme.customFont) {
        addCustomFont(data.theme.customFont)
    }
    addFavicons()
    addGlobalStyles(data.theme.styles)
    printContent(data.content, data.theme.variables)
    // appTag.classList.add('ready')
    // loading.classList.add('exit')
    // setTimeout(function() {
    //     document.body.removeChild(loading)
    // }, 1000)
}

fetchData()