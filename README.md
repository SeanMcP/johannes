# Johannes

🖨 A simple JSON to HTML printer


## Documentation

Johannes prints a valid, mobile-first, and responsive HTML page based on some simple JSON input. All you need is a `data.json` file and an `index.html` referencing Johannes' `index.js` and `styles.css`.

### Content types

#### Hero

Background image with text/call-to-action

Options:

- `textAlign: enum('center', 'left', 'right')`
- `color: valid HTML color`

#### Hours

A table of business hours

Options:

- `backgroundColor: valid HTML color`
- `mode: enum('light', 'dark')`
- `textAlign: HEADER ONLY - enum('center', 'left', 'right')`

#### Social

Social media icons

Options:

- `mode: enum('light', 'dark')`
- `size: enum('lg', '2x', '3x', 4x')`

#### Text

HTML string containing elements.

Options:

- `backgroundColor: valid HTML color`
- `color: valid HTML color`
- `textAlign: enum('center', 'left', 'right')`

#### Window

Image banner, no text

Options:

- `parallax: boolean`