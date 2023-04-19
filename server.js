const express = require('express');
const db = require('./config/connection');
const startPrompt = require('./db/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res) => {
    res.status(404).quit();
});

db.connect(err => {
    if (err) throw err;
    console.log(`
    ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
    ───█▒▒░░░░░░░░░▒▒█───
    ────█░░█░░░░░█░░█────
    ─▄▄──█░░░▀█▀░░░█──▄▄─
    █░░█─▀▄░░░░░░░▄▀─█░░█
    █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
    █░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█
    █░░║║║╠─║─║─║║║║║╠─░░█
    █░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█
    █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
    `);
    app.listen(PORT, () => {
      console.log(`Server now listening at ${PORT}`);
      startPrompt();
    });
  });