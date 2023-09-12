const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: 'postgres://Ravin-1694163970119:postgres@localhost:5432/employee_projects',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', '/media/ravin/New Volume/VsCodeR/KPProject/views');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// SERVER ROUTES

app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.post('/search', async (req, res) => {
    const { employeeName } = req.body;
    const query = {
      text: 'SELECT * FROM projects WHERE employee_name = $1',
      values: [employeeName],
    };
  
    try {
      const result = await pool.query(query);
      res.render('projectDetails', { projects: result.rows });
    } catch (error) {
      console.error('Error searching for projects:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  