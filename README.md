# Johannes

🖨 A simple JSON to HTML printer


## Documentation

### Content types

#### Hero

Background image with text/call-to-action

- `align: enum('center', 'left', 'right')`
- `color: valid HTML color`

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