# Johannes

🖨 A simple JSON to HTML printer


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


#### Hero

Background image with text/call-to-action

Options:

- `buttonColor: valid HTML color (default: primaryColor variable)`
- `buttonTextColor: valid HTML color (default: white)`
- `textColor: valid HTML color (default: inherit)`
- `textAlign: enum('center', 'left', 'right') (default: left)`

#### Hours

A table of business hours

Options:

- `backgroundColor: valid HTML color (default: contentBackground)`
- `mode: enum('light', 'dark')`
- `textAlign: HEADER ONLY - enum('center', 'left', 'right') (default: left)`

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