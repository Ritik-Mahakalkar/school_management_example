import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'school_project'
});

db.connect();

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.query('SELECT * FROM schools', (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch schools' });
      }
      res.status(200).json(result);
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
