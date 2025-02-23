import env from "dotenv";
import "express-async-errors";
import express from "express";
import authRouter from "./routes/auth.js";
import exsRouter from "./routes/exs.js";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import RateLimiter from "express-rate-limit";
import path from 'path';
import { fileURLToPath } from 'url';


// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authUser from "./middleware/authentication.js";

const app = express();
env.config();


app.set("trust proxy", 1);
app.use(RateLimiter({ windowMs: 5 * 60 * 1000, max: 1000 }));
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, '../react-app/build')));

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





app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!!!!' });
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));


app.use("/api/v1/auth", authRouter);   
app.use("/api/v1/exercise", authUser, exsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 8081;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();