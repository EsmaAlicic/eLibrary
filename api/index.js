import commentsRouter from "./routes/comments.js";
import booksRouter from "./routes/books.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import express from "express";
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix)
      }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
  })

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use('/api/users',usersRouter);
app.use('/api/books',booksRouter);
app.use('/api/comments',commentsRouter);

app.listen(8800,()=>{
    console.log("Connected!")
})