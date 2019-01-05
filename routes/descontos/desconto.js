var router = require('express').Router();
var knex = require('../../config/db');


router.post('/desconto', async (req, res) =>{
    let empresa = req.body.empresaId;
    let usuario = req.body.usuarioId;
    empresa = await knex('empresas').where('id', empresa);
    empresa = empresa[0].id
    usuario = await knex('usuarios').where('id', usuario);
    usuario = usuario[0].id
    let desconto = await knex('descontos').where({'idusuario' : usuario, 'idempresa' : empresa});
    res.json(desconto)
})

router.post('/todos/:usuarioId', async(req, res)=>{
    let usuario = req.params.usuarioId;
    usuario = await knex('usuarios').where('id', usuario);
    let descontos = await knex('descontos').where('idusuario', usuario[0].id);
    res.json(descontos);
})

router.post('/adicionar', async(req, res)=>{
    let usuario = req.body.usuarioId;
    let empresa = req.body.empresaId;
    let valor = req.body.valor;
    let nome = req.body.nome
    
    usuario = await knex('usuarios').where('id', usuario);
    empresa = await knex('empresas').where('id', empresa);

    descontoId = await knex('descontos').returning('id').insert({
        'idusuario' : usuario[0].id,
        'idempresa' : empresa[0].id,
        'valor' : valor,
        'nome' : nome
    })

    let desconto = await knex('descontos').where('id', descontoId);
    res.json(desconto)
})


module.exports  = router