var express = require('express');

var app = express();

var reload = require('reload');

app.set('port', process.env.PORT || 7000);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.use('/empresas', require('./routes/empresas/empresas'));
app.use('/desconto', require('./routes/descontos/desconto'));
app.use('/compras', require('./routes/compras/compras'));
app.use('/cardapio', require('./routes/cardapio/cardapio'));
app.use('/estabelecimentos', require('./routes/estabelecimentos/estabelecimentos'));
app.use('/clientes', require('./routes/cliente/cliente'));

var server = app.listen(7000, function() {
  console.log('Running server');
})

reload(server, app);