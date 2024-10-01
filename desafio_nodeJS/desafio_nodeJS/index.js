const express = require('express');
const app = express();
const port = 3000;

// Função que calcula o valor de x_i = i + (1 / i)
function calculateXi(i) {
    return i + (1 / i);
}

// Função iterativa para calcular o produtório
function iterativeProduct(m, n) {
    let product = 1;
    for (let i = m; i <= n; i++) {
        product *= calculateXi(i);
    }
    return product;
}

// Função recursiva para calcular o produtório
function recursiveProduct(m, n) {
    if (m > n) {
        return 1;
    }
    return calculateXi(m) * recursiveProduct(m + 1, n);
}

// Rota que recebe os parâmetros e retorna o produtório
app.get('/product', (req, res) => {
    const m = parseInt(req.query.m);
    const n = parseInt(req.query.n);
    const method = req.query.method;

    if (isNaN(m) || isNaN(n) || m <= 0 || n <= 0 || m > n) {
        return res.status(400).json({ error: 'Os parâmetros m e n devem ser números maiores que 0 e m deve ser menor ou igual a n.' });
    }

    let result;

    if (method === 'iterative') {
        result = iterativeProduct(m, n);
    } else if (method === 'recursive') {
        result = recursiveProduct(m, n);
    } else {
        return res.status(400).json({ error: 'Método inválido. Escolha entre "iterative" ou "recursive".' });
    }

    res.json({ product: result });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
