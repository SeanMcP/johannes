# Johannes

🖨 A simple JSON to HTML printer

[Project Board](https://github.com/SeanMcP/johannes/projects/1)

## Documentation

Johannes prints a valid, mobile-first, and responsive HTML page based on some simple JSON input. All you need is a `data.json` file and an `index.html` referencing Johannes' `index.js` and `styles.css`.

### Overview

Johannes looks for a single `data.json` file from which to build a static site. That file contains basic information for building sections of content, or blocks, of the website. There are only two requirements for adding a new block to a website: `type` and `data`.

```json
{
    "type": "blockType",
    "data": { ...blockData }
}
```

To add a new block to a site, simply add a new object like the one above `content` array in `data.json`. See the API below for specific data requirements for each block type.

### Requirements

#### Favicons

Johannes looks for two `PNG` favicons in an `assets/` directory: 16x16, and 32x32. They can be [generated here](http://www.favicomatic.com/).

```
assets/
 +-- favicon-16x16.png
 +-- favicon-32x32.png
```

### Block types

#### Address

Street address.

Data:

```json
"data": {
    "heading": "Address",
    "address": ["P. Sherman", "42 Wallaby Way", "Sydney"]
}
```

Options:

- `backgroundColor: valid HTML color`
- `map: embed iframe src from Google Maps`
- `textAlign: enum('center', 'left', 'right')`

#### Button

A link that looks like a button

```json
"data": {
    "heading": "Heading",
    "text": "Button text",
    "href": "https://action.button/destination"
}
```

Options:

- `buttonColor: valid HTML color (default: primaryColor variable)`
- `buttonTextColor: valid HTML color (default: white)`
- `textAlign: enum('center', 'left', 'right') (default: left)`
- `textColor: valid HTML color (default: inherit)`

#### Contact

A list of contact options

Data:

```json
"data": {
    "heading": "Contact us",
    "address": "100 Street Address, City, State 000001",
    "email": "your@email.address",
    "phone": "(555) 867-5309"
}
```

Options:

- `alignment: enum('center', 'inline', 'inline-center') (default: inline left)`
- `backgroundColor: valid HTML color (default: contentBackground)`
- `icons: boolean (default: false)`
- `textColor: valid HTML color (default: contentBackground)`

#### Form

A simple contact form that uses `mailto:` to trigger an email.

Data:

```json
"data": {
    "email": "your@email.address",
    "heading": "Header",
    "message": "Message below the header"
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `buttonColor: valid HTML color (default: primaryColor variable)`
- `buttonTextColor: valid HTML color (default: white)`
- `textAlign: HEADER, BUTTON ONLY - enum('center', 'left', 'right') (default: left)`

#### Gallery

A simple photo gallery. Technically the number of images supported is unlimited, but keep it to 5-10.

Data:

```json
"data": {
    "heading": "Gallery",
    "images": [
        {
            "src": "assets/gallery/image1.jpg",
            "description": "Image 1"
        },
        {
            "src": "assets/gallery/image2.jpg",
            "description": "Image 2"
        }
    ]
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `textAlign: HEADER ONLY - enum('left', 'center', 'right') (default: left)`
- `textColor: valid HTML color (default: inherit)`

#### Hero

Background image with text, call-to-action

```json
"data": {
    "background": "https://path.to/image",
    "heading": "Heading",
    "body": ["Paragraph One", "Paragraph Two"],
    "action": {
        "text": "Button text",
        "href": "https://action.button/destination"
    }
}
```

Options:

- `buttonColor: valid HTML color (default: primaryColor variable)`
- `buttonTextColor: valid HTML color (default: white)`
- `textAlign: enum('center', 'left', 'right') (default: left)`
- `textColor: valid HTML color (default: inherit)`

#### Hours

A table of business hours

Data:

```json
"data": {
    "heading": "Hours",
    "sunday": "Closed",
    "monday": "9:00-5:00",
    "tuesday": "9:00-5:00",
    "wednesday": "11:00-7:00",
    "thursday": "9:00-5:00",
    "friday": "9:00-5:00",
    "saturday": "10:00-2:00"
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `mode: enum('light', 'dark')`
- `textAlign: HEADER ONLY - enum('center', 'left', 'right') (default: left)`

#### Html

HTML string containing elements.

Data:

```json
"data": {
    "innerHTML": "<h1>Hello!</h1>"
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `textColor: valid HTML color (default: inherit)`
- `textAlign: enum('center', 'left', 'right') (default: left)`

#### Logo

Displays a logo image, a title, and a tagline.

Data:

```json
"data": {
    "src": "url",
    "heading": "Johannes Ltd. Co.",
    "tagline": "Printing for everyone."
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `centerContent: boolean (default: false)`
- `textColor: valid HTML color (default: inherit)`

#### Social

Social media icons

Data:

```json
"data": {
    "platforms": {
        "twitter": "https://twitter.com/mcpcodes",
        "linkedin": "https://linkedin.com/company/mcpdesign",
        "instagram": "https://instagram.com/mcp.design",
        "facebook": "https://facebook.com/mcpdesignga"
    }
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `mode: enum('light', 'dark')`
- `size: enum('lg', '2x', '3x', 4x')`

#### Text

A heading (h1) followed by a number of paragraphs. Both are optional.

Data:

```json
"data": {
    "heading": "Hello!",
    "paragraphs": [
        "Each string in the array becomes a paragraph.",
        "So this text block will have two."
    ]
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `textColor: valid HTML color (default: inherit)`
- `textAlign: enum('center', 'left', 'right') (default: left)`

#### Window

Image banner, no text

Data:

```json
"data": {
    "url": "https://placebear.com/g/800/800"
}
```

Options:

- `height: value in pixels (default: 10rem, ~160px)`
- `parallax: boolean`

### Content options

The following are available for all content types:

- `stacked: boolean (removes padding-top on block)`

# Resources

- [Autoprefixer](https://autoprefixer.github.io/)
- [Favic-o-matic](http://www.favicomatic.com/)