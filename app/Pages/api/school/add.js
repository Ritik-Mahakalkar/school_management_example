import mysql from 'mysql2';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = './public/sImages';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
}).single('image');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'school_project'
});

db.connect();

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Image upload failed' });
      }

      const { name, address, city, state, contact, email_id } = req.body;
      const imagePath = req.file ? `/sImages/${req.file.filename}` : null;

      const query = 'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [name, address, city, state, contact, email_id, imagePath], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database insertion failed' });
        }
        res.status(200).json({ message: 'School added successfully!' });
      });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
