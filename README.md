# ASCII Converter

A web application built with **React**, **TypeScript**, and **Vite** that converts both **text** and **images** into beautiful ASCII art.

## 🖋️ Description

This application can convert not only text but also images into ASCII art style, while enhancing the result with various filters — including color and size adjustments.

You can also use different sets of characters for the conversion to achieve unique visual effects.

After the conversion is complete, the result can be saved to your device — you can copy it, save it as a plain text file, or export it as an HTML file that preserves all applied styles. This makes it easy to reuse the generated ASCII art in your own projects.

## ⚙️ Features

- Text → ASCII conversion
- Image → ASCII art conversion
- Adjustable color, font size, and filters
- Multiple character sets for custom styles
- Export options:
  - Copy to clipboard
  - Save as `.txt`
  - Save as `.html` (with preserved styles)

- Responsive UI with component libraries

## 🧠 Technologies Used

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** – for styling
- **Canvas API** – for image-to-ASCII conversion
- **Figlet** – for text ASCII rendering
- **shadcn/ui** and **Material UI** – for UI components
- **ESLint** and **Prettier** – for code formatting and linting

## 🚀 Installation and Setup

```bash
# clone the repository
git clone https://github.com/raul00100/ascii_converter.git
cd ascii_converter

# install dependencies
npm install

# run in development mode
npm run dev
```

For production build:

```bash
npm run build
```

## 🖼️ Example

ASCII text:

```
 _   _      _ _
| | | | ___| | | ___
| |_| |/ _ \ | |/ _ \
|  _  |  __/ | | (_) |
|_| |_|\___|_|_|\___/
```
