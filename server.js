{
    "chunks": [
        {
            "type": "txt",
            "chunk_number": 1,
            "lines": [
                {
                    "line_number": 1,
                    "text": "const express = require('express');"
                },
                {
                    "line_number": 2,
                    "text": "const axios = require('axios');"
                },
                {
                    "line_number": 3,
                    "text": "const bodyParser = require('body-parser');"
                },
                {
                    "line_number": 4,
                    "text": "require('dotenv').config();"
                },
                {
                    "line_number": 5,
                    "text": ""
                },
                {
                    "line_number": 6,
                    "text": "const app = express();"
                },
                {
                    "line_number": 7,
                    "text": "app.use(bodyParser.json());"
                },
                {
                    "line_number": 8,
                    "text": ""
                },
                {
                    "line_number": 9,
                    "text": "const OWNER = 'JorgePronto20';"
                },
                {
                    "line_number": 10,
                    "text": "const REPO = 'validador-campanhas';"
                },
                {
                    "line_number": 11,
                    "text": "const FILE_PATH = 'codigos_desconto.json';"
                },
                {
                    "line_number": 12,
                    "text": "const BRANCH = 'main';"
                },
                {
                    "line_number": 13,
                    "text": "const GITHUB_API = 'https://api.github.com';"
                },
                {
                    "line_number": 14,
                    "text": ""
                },
                {
                    "line_number": 15,
                    "text": "const headers = {"
                },
                {
                    "line_number": 16,
                    "text": "'Authorization': `token ${process.env.GITHUB_TOKEN}`,"
                },
                {
                    "line_number": 17,
                    "text": "'Accept': 'application/vnd.github.v3+json',"
                },
                {
                    "line_number": 18,
                    "text": "'User-Agent': 'ValidadorApp'"
                },
                {
                    "line_number": 19,
                    "text": "};"
                },
                {
                    "line_number": 20,
                    "text": ""
                },
                {
                    "line_number": 21,
                    "text": "app.get('/codigos-validos', async (req, res) => {"
                },
                {
                    "line_number": 22,
                    "text": "try {"
                },
                {
                    "line_number": 23,
                    "text": "const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;"
                },
                {
                    "line_number": 24,
                    "text": "const response = await axios.get(url, { headers });"
                },
                {
                    "line_number": 25,
                    "text": "const content = Buffer.from(response.data.content, 'base64').toString();"
                },
                {
                    "line_number": 26,
                    "text": "res.json(JSON.parse(content));"
                },
                {
                    "line_number": 27,
                    "text": "} catch (error) {"
                },
                {
                    "line_number": 28,
                    "text": "res.status(500).json({ error: 'Erro ao obter os c\u00f3digos.' });"
                },
                {
                    "line_number": 29,
                    "text": "}"
                },
                {
                    "line_number": 30,
                    "text": "});"
                },
                {
                    "line_number": 31,
                    "text": ""
                },
                {
                    "line_number": 32,
                    "text": "app.post('/validar-codigo', async (req, res) => {"
                },
                {
                    "line_number": 33,
                    "text": "const { codigo, dispositivo } = req.body;"
                },
                {
                    "line_number": 34,
                    "text": "if (!codigo || !dispositivo) {"
                },
                {
                    "line_number": 35,
                    "text": "return res.status(400).json({ error: 'C\u00f3digo e dispositivo s\u00e3o obrigat\u00f3rios.' });"
                },
                {
                    "line_number": 36,
                    "text": "}"
                },
                {
                    "line_number": 37,
                    "text": ""
                },
                {
                    "line_number": 38,
                    "text": "try {"
                },
                {
                    "line_number": 39,
                    "text": "const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;"
                },
                {
                    "line_number": 40,
                    "text": "const response = await axios.get(url, { headers });"
                },
                {
                    "line_number": 41,
                    "text": "const sha = response.data.sha;"
                },
                {
                    "line_number": 42,
                    "text": "const content = Buffer.from(response.data.content, 'base64').toString();"
                },
                {
                    "line_number": 43,
                    "text": "const json = JSON.parse(content);"
                },
                {
                    "line_number": 44,
                    "text": ""
                },
                {
                    "line_number": 45,
                    "text": "const jaUsado = json.find(entry => entry.codigo === codigo);"
                },
                {
                    "line_number": 46,
                    "text": "if (jaUsado) {"
                },
                {
                    "line_number": 47,
                    "text": "return res.status(409).json({ error: 'C\u00f3digo j\u00e1 foi usado.' });"
                },
                {
                    "line_number": 48,
                    "text": "}"
                },
                {
                    "line_number": 49,
                    "text": ""
                },
                {
                    "line_number": 50,
                    "text": "json.push({ codigo, dispositivo, data: new Date().toISOString() });"
                },
                {
                    "line_number": 51,
                    "text": ""
                },
                {
                    "line_number": 52,
                    "text": "const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');"
                },
                {
                    "line_number": 53,
                    "text": ""
                },
                {
                    "line_number": 54,
                    "text": "await axios.put(url, {"
                },
                {
                    "line_number": 55,
                    "text": "message: `C\u00f3digo ${codigo} validado por ${dispositivo}`,"
                },
                {
                    "line_number": 56,
                    "text": "content: updatedContent,"
                },
                {
                    "line_number": 57,
                    "text": "sha: sha,"
                },
                {
                    "line_number": 58,
                    "text": "branch: BRANCH"
                },
                {
                    "line_number": 59,
                    "text": "}, { headers });"
                },
                {
                    "line_number": 60,
                    "text": ""
                },
                {
                    "line_number": 61,
                    "text": "res.json({ success: true, codigo, dispositivo });"
                },
                {
                    "line_number": 62,
                    "text": "} catch (error) {"
                },
                {
                    "line_number": 63,
                    "text": "res.status(500).json({ error: 'Erro ao validar o c\u00f3digo.' });"
                },
                {
                    "line_number": 64,
                    "text": "}"
                },
                {
                    "line_number": 65,
                    "text": "});"
                },
                {
                    "line_number": 66,
                    "text": ""
                },
                {
                    "line_number": 67,
                    "text": "const PORT = process.env.PORT || 3000;"
                },
                {
                    "line_number": 68,
                    "text": "app.listen(PORT, () => {"
                },
                {
                    "line_number": 69,
                    "text": "console.log(`Servidor a correr na porta ${PORT}`);"
                },
                {
                    "line_number": 70,
                    "text": "});"
                }
            ],
            "token_count": 262
        }
    ]
}