const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const OWNER = 'JorgePronto20';
const REPO = 'validador-campanhas';
const FILE_PATH = 'codigos_desconto.json';
const BRANCH = 'main';
const GITHUB_API = 'https://api.github.com';

const headers = {
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'ValidadorApp'
};

// Obter todos os códigos válidos
app.get('/codigos-validos', async (req, res) => {
  try {
    const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
    const response = await axios.get(url, { headers });
    const content = Buffer.from(response.data.content, 'base64').toString();
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os códigos.' });
  }
});

// Validar um código e atualizar o JSON no GitHub
app.post('/validar-codigo', async (req, res) => {
  const { codigo, dispositivo } = req.body;
  if (!codigo || !dispositivo) {
    return res.status(400).json({ error: 'Código e dispositivo são obrigatórios.' });
  }

  try {
    const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
    const response = await axios.get(url, { headers });
    const sha = response.data.sha;
    const content = Buffer.from(response.data.content, 'base64').toString();
    const json = JSON.parse(content);

    const index = json.findIndex(entry => entry.codigo === codigo);
    if (index === -1) {
      return res.status(404).json({ error: 'Código não encontrado.' });
    }

    if (json[index].estado === 'usado') {
      return res.status(409).json({ error: 'Código já foi usado.' });
    }

    // Atualizar o código
    json[index].estado = 'usado';
    json[index].data_utilizacao = new Date().toISOString();
    json[index].dispositivo = dispositivo;

    const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');

    await axios.put(url, {
      message: `Código ${codigo} validado por ${dispositivo}`,
      content: updatedContent,
      sha: sha,
      branch: BRANCH
    }, { headers });

    res.json({ success: true, codigo, dispositivo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao validar o código.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
