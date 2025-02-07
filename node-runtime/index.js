import helmet from 'helmet';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
// app.use(express.static(path.join(__dirname, '../react-app/build')));

app.use(express.static(path.join(__dirname, '../react-app/build'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        // Prevent caching for index.html
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      } else {
        // Allow caching for other static files
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
      }
    }
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
