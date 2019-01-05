var router = require('express').Router();
var knex = require('../../config/db');

router.get('/cliente/:id', async (req, res)=>{
    cliente = await knex.
        select('primeiro_nome_cliente',
                'segundo_nome_cliente',
                'id_contato_cliente',
                'id_endereco_cliente',
                'data_nascimento_cliente',
                'cpf_cliente').where({'id' : req.params.id }).from('clientes');

    res.json(cliente)
})

router.post('/cliente', async (req, res)=>{
    id = await knex.insert({
        'primeiro_nome_cliente' : req.body.primeiro_nome,
        'segundo_nome_cliente' : req.body.segundo_nome,
        'id_contato_cliente' : req.body.contato_cliente,
        'id_endereco_cliente' : req.body.endereco_cliente,
        'data_nascimento_cliente' : req.body.data_nascimento,
        'cpf_cliente' : req.body.cpf
    })
    .into('clientes')
    .returning('id');

    res.json({
        'inserted_id' : id
    });
});

router.post('/update/:id', async (req, res)=>{

    let cliente = await knex.select('primeiro_nome_cliente',
    'segundo_nome_cliente',
    'id_contato_cliente',
    'id_endereco_cliente',
    'data_nascimento_cliente',
    'cpf_cliente').where({'id' : req.params.id}).from('clientes');

    if(cliente.segundo_nome_cliente !== req.body.segundo_nome) cliente.segundo_nome_cliente = req.body.segundo_nome;
    if(cliente.primeiro_nome_cliente !== req.body.primeiro_nome) cliente.primeiro_nome_cliente = req.body.primeiro_nome;
    if(cliente.id_contato_cliente !== req.body.contato_cliente) cliente.id_contato_cliente = req.body.contato_cliente;
    if(cliente.id_endereco_cliente !== req.body.endereco_cliente) cliente.id_endereco_cliente = req.body.endereco_cliente;
    if(cliente.data_nascimento_cliente !== req.body.data_nascimento) cliente.data_nascimento_cliente = req.body.data_nascimento;
    if(cliente.cpf_cliente !== req.body.cpf) cliente.cpf_cliente = req.body.cpf;

    id = await knex.update({
        'primeiro_nome_cliente' : cliente.primeiro_nome_cliente,
        'segundo_nome_cliente' : cliente.segundo_nome_cliente,
        'id_contato_cliente' : cliente.id_contato_cliente,
        'id_endereco_cliente': cliente.id_endereco_cliente,
        'data_nascimento_cliente' : cliente.data_nascimento_cliente,
        'cpf_cliente' : cliente.cpf
    }).where({'id' : req.params.id}).into('clientes').returning('id');

    res.json(id);
});


module.exports = router