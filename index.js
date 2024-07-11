const express = require('express');
const axios = require('axios');
const pool1 = require("./db");
const { Pool } = require("pg");
const querystring = require('querystring');
const cors = require('cors');
const { format } = require('date-fns');



const pool = new Pool({
  user: 'LucasCodeWorka',
  password: 'IO24VirZxBgc',
  host: 'ep-weathered-king-a59769hv.us-east-2.aws.neon.tech',
  port: '5432',
  database: 'liebe',
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
});


const app = express();
const port = 3001; // Escolha a porta que desejar

app.use(express.json());

app.use(cors());


app.get('/todos', async (req, res) => {
  try {
    const client = await pool1.connect();
    const result = await client.query('select * from public.vendas_rep ');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get("/rep", async (req, res) => {
  try {
      const allTodos = await pool1.query('select * from public.pedidos2_rep  ')
      res.json(allTodos.rows)
  } catch (err) {
      console.error(err.message)
  }
})

app.get("/prod", async (req, res) => {
  try {
      const allTodos = await pool1.query('select * from public.prod_rep  ')
      res.json(allTodos.rows)
  } catch (err) {
      console.error(err.message)
  }
})

app.get("/comis", async (req, res) => {
  try {
      const allTodos = await pool1.query('select * from comis2  ')
      res.json(allTodos.rows)
  } catch (err) {
      console.error(err.message)
  }
})


app.get("/inad", async (req, res) => {
  try {
      const allTodos = await pool1.query('select * from public.inad_rep  ')
      res.json(allTodos.rows)
  } catch (err) {
      console.error(err.message)
  }
})

app.get("/cli", async (req, res) => {
  try {
      const allTodos = await pool1.query('select * from public.cli_rep')
      res.json(allTodos.rows)
  } catch (err) {
      console.error(err.message)
  }
})

app.get("/todos/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const todo = await pool1.query("SELECT * FROM projeto WHERE id = $1  ", [id])
  
      res.json(todo.rows[0])
  } catch (err) {
      console.err(err.message);
  }
  })


  //API do rep

  app.get('/repri', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM public.vr_pes_reprcliente ');
      const data = result.rows;
      client.release();
      res.json(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  app.get("/repri/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM public.vr_pes_reprcliente WHERE cd_cliente = $1  ", [id])
    
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
    })
  
  


app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
