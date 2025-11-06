# 🎨 ASCII Converter

A modern web application that converts **text, images and video into ASCII art**.
Users can apply various filters such as **color adjustments**, **font size**, and **custom character sets** to achieve unique visual effects.

Once the conversion is complete, the result can be **saved, copied, or exported** as a `.txt` or `.html` file (with preserved styles), making it easy to reuse the generated ASCII art in other projects.

---

## ⚙️ Features

- 📝 **Text → ASCII** conversion
- 🖼️ **Image → ASCII art** conversion
- 🎥 **Video → ASCII art** conversion
- 🎨 Adjustable **color**, **font size**, and **character sets**
- 💾 Export options:
  - Copy to clipboard
  - Save as `.txt`
  - Save as `.html` (with preserved styles)

- 📱 **Responsive UI** with component libraries

---

## 🧠 Technologies Used

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** — for styling
- **Canvas API** — for image-to-ASCII rendering
- **Figlet** — for text-to-ASCII rendering
- **shadcn/ui** and **Material UI** — for UI components
- **Framer Motion** — smooth content transitions between pages
- **React Bits** — text typing animation
- **ESLint** and **Prettier** — for consistent code formatting and linting

---

## 🧑🏻‍💻 Deployment

**Vercel:** [https://ascii-converter-mv2w.vercel.app/](https://ascii-converter-mv2w.vercel.app/)

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/raul00100/ascii_converter.git
cd ascii_converter

# Install dependencies
npm install

# Run in development mode
npm run dev
```

For production build:

```bash
npm run build
```

---

## 🖼️ Example

**ASCII Text:**

```
 _   _      _ _
| | | | ___| | | ___
| |_| |/ _ \ | |/ _ \
|  _  |  __/ | | (_) |
|_| |_|\___|_|_|\___/
```

**ASCII Image:**

```
               . .#@@@@-..               ..*%....
               .*@@+ .-@@@..         . .%@@@%@@@..
             .=@@%     ..@@@..      .#@@@... ..@@@:.
            .*@@.        .-@@@@@@@@@@@@..      ..@@*
          ..*@@            .--.-- .-:             #@@
          ..**.             --.--..-:             .*:
  . .  ..@@@@@@@@@@@@@@@@#  -- --.. =@@@@@@@@@@@@@@@#*.   ..
 .*@@*:.:@- ......    ..@@: ......  @@.        .   .@@  .:@@.
    .@@@.@-.           ..@%.   .  . @@.            .@@=@@@@.
..::@@%..@-.           ..@@@@@@@@@@@@@.            .@@  ..
.:@=:....@-  :@@.      ..@%         +@.       @@%..+@@:@@@@@@.
       ..@%.......::::::@@%         =@@:::::.......%@# .......
        .@@@=--==%@-----:+@@@@@@@@@@%:----:%@@@@@@@@@..
     ....====:::==       ..@%.@@..@@..             @@#.
  ...=-:::::=-::==@@##*.. .@@%@@@@@%..       ...@@@@...
 ...=:::::-:-=::::=...%@- ..... ..          @@@@@@@.
  ...=::=:-==-::::=:                           ..@@:
 .  ...=====:-====#.           ..            .@@@@..
     ...:=::::=-.@%.        :-:- ..          -@@..
          .......@% .  ..  .:-.::    ...  ..  @@
               ..@@.*@@@@@@@@@@@@@@@@@@@@@@@*@@@.
                ..@@@@...               ..:@@@-..
```
