var router = require('express').Router();
var knex = require('../../config/db');


router.get('/soma', async (req, res)=>{
    /*let usuario = new Usuario(1)
    valor = usuario.getValorCompras()*/
    let sum = await knex('compras').where('idusuario', 1).sum({soma : 'valor'});
    res.json(sum[0])
})

router.get('/compra/:id', async (req, res)=>{
    let compra = await knex('compras').where('id', 1);
    res.json(compra)
})

module.exports = router