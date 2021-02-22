const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();

const passengers = [
    {
        name: 'Enzo',
        flightNumber: 7859,
        time: '18h00',
    },
    {
        name: 'Alessandra',
        flightNumber: 7859,
        time: '18h00',
    },
    {
        name: 'Fred',
        flightNumber: 7859,
        time: '18h00',
    },
    {
        name: 'Rambo',
        flightNumber: 7859,
        time: '18h00',
    },
];

app.get('/pdf', async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: '20px',
            bottom: '40px',
            left: '20px',
            right: '20px',
        },
    });

    await browser.close();

    response.contentType('application/pdf');

    return response.send(pdf);
});

app.get('/', (request, response) => {
    const filePath = path.join(__dirname, 'print.ejs');
    ejs.renderFile(filePath, { passengers }, (error, html) => {
        if (error) {
            return response.send('Erro na leitura do arquivo');
        }

        // eviar para o navegador
        return response.send(html);
    });
});

app.listen(3000);
