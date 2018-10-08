# Johannes

🖨 A simple JSON to HTML printer

[Project Board](https://github.com/SeanMcP/johannes/projects/1)

## Documentation

Johannes prints a valid, mobile-first, and responsive HTML page based on some simple JSON input. All you need is a `data.json` file and an `index.html` referencing Johannes' `index.js` and `styles.css`.

### Content types

#### Address

Street address. Use `<br>` to format correctly

Options:

- `backgroundColor: valid HTML color`
- `map: embed iframe src from Google Maps`
- `textAlign: enum('center', 'left', 'right')`

#### Contact

A simple contact form that uses `mailto:` to trigger an email.

Data:

```json
"data": {
    "email": "your@email.address",
    "title": "Header",
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
    "title": "Gallery",
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

Background image with text/call-to-action

Options:

- `buttonColor: valid HTML color (default: primaryColor variable)`
- `buttonTextColor: valid HTML color (default: white)`
- `textAlign: enum('center', 'left', 'right') (default: left)`
- `textColor: valid HTML color (default: inherit)`

#### Hours

A table of business hours

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
    "title": "Johannes Ltd. Co.",
    "tagline": "Printing for everyone."
}
```

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `centerContent: boolean (default: false)`
- `textColor: valid HTML color (default: inherit)`

#### Social

Social media icons

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