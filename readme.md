# 2D Platformer with Three.js

This project is a simple 2D platformer game created using Three.js. It features a controllable character that can move left, right, up, and jump between platforms.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (Python's `http.server`, Node.js `http-server`, or VS Code's Live Server extension)

## Setup

1. Clone or download this repository to your local machine.

2. Ensure you have the following files in your project directory:
   - `index.html`
   - `index.js`

3. If you don't already have Three.js in your project, add the following line to the `<head>` section of your `index.html`:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
   ```

## Running the Project

1. Open a terminal/command prompt and navigate to your project directory.

2. Start a local web server. You have several options:

   - Using Python 3:
     ```
     python -m http.server
     ```

   - Using Python 2:
     ```
     python -m SimpleHTTPServer
     ```

   - Using Node.js (requires `http-server` package):
     ```
     npx http-server
     ```

   - Using VS Code:
     Install the "Live Server" extension and click "Go Live" in the bottom right corner.

3. Open your web browser and go to:
   - `http://localhost:8000` (for Python servers)
   - `http://localhost:8080` (for Node.js http-server)
   - The URL provided by VS Code Live Server (usually `http://127.0.0.1:5500`)

## How to Play

- Use the Left and Right arrow keys to move horizontally.
- Use the Up arrow key to move upwards.
- Press the Spacebar to jump (only works when on a platform).

## Customizing the Game

- To add or modify platforms, use the `addPlatform(x, y, width)` function in `index.js`.
- Adjust the character's spawn position by modifying the `setCharacterPosition(x, y)` call.
- Change colors, sizes, or game physics by editing the respective variables in `index.js`.

## Troubleshooting

- If you see a blank screen, check the browser's console (F12) for any error messages.
- Ensure all file paths in `index.html` are correct.
- Try clearing your browser cache or using an incognito/private window.

## License

This project is open source and available under the [MIT License](LICENSE).