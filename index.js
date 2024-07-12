const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Pool } = require('pg');
const pool1 = require("./db");
const querystring = require('querystring');
const { format } = require('date-fns');

// Configuração do pool de conexão com o PostgreSQL
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
app.use(cors()); // Habilita CORS para todas as rotas

// Rota para obter todos os dados da tabela 'vendas_rep'
app.get('/todos', async (req, res) => {
  try {
    const client = await pool1.connect();
    const result = await client.query('SELECT * FROM public.vendas_rep');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter todos os dados da tabela 'pedidos2_rep'
app.get('/rep', async (req, res) => {
  try {
    const allTodos = await pool1.query('SELECT * FROM public.pedidos2_rep');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Rota para obter todos os dados da tabela 'prod_rep'
app.get('/prod', async (req, res) => {
  try {
    const allTodos = await pool1.query('SELECT * FROM public.prod_rep');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Rota para obter todos os dados da tabela 'comis2'
app.get('/comis', async (req, res) => {
  try {
    const allTodos = await pool1.query('SELECT * FROM comis2');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Rota para obter todos os dados da tabela 'inad_rep'
app.get('/inad', async (req, res) => {
  try {
    const allTodos = await pool1.query('SELECT * FROM public.inad_rep');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Rota para obter dados da tabela 'cli_rep' com parâmetro de consulta opcional
app.get('/cli', async (req, res) => {
  try {
    const { cd_representant } = req.query;
    let query = 'SELECT * FROM public.cli_rep';
    const params = [];

    if (cd_representant) {
      query += ' WHERE cd_representant = $1';
      params.push(cd_representant);
    }

    const allTodos = await pool1.query(query, params);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter um registro específico da tabela 'projeto' por ID
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool1.query('SELECT * FROM projeto WHERE id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Rota para obter todos os dados da tabela 'vr_pes_reprcliente'
app.get('/repri', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public.vr_pes_reprcliente');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter um registro específico da tabela 'vr_pes_reprcliente' por ID
app.get('/repri/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM public.vr_pes_reprcliente WHERE cd_cliente = $1', [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
