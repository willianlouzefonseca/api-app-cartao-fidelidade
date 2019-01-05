var router = require('express').Router();
var knex = require('../../config/db');

router.get('/pedido/:id', async (req, res)=>{
    let id = req.params.id;

    let pedido = await knex.select(
        'data_pedido', 
        'numero_pedido', 
        'valor_pedido', 
        'numero_cliente_pedido').from('pedidos').where({'pedido_id' : id});

    let cliente = await knex.select(
        'primeiro_nome_cliente',
        'segundo_nome_cliente',
        'id_contato_cliente',
        'id_endereco_cliente',
        'cpf_cliente'
    ).from('clientes').where({id : pedido.numero_cliente_pedido});

    
})