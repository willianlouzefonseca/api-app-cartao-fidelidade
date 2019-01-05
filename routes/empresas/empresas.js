var router = require('express').Router();
var knex = require('../../config/db');


router.get('/', (req,res)=>{
    res.json('we are working')
})

router.get('/todas',async (req, res)=>{
    let empresas = await knex('empresas');
    res.json(empresas);

})

router.get('/empresa/:empresa', async (req, res) =>{
    let empresa = req.params.empresa;
    empresa = await knex('empresas').where('id', empresa);
    res.json(empresa)
})


router.post('/empresa/autocomplete', async (req, res) =>{
    let empresa = req.body.empresa;
    if (empresa){
        empresa = await knex('empresas').where('nome', 'like', empresa+'%')
        if(empresa){
            res.json(empresa)
        }
    }
    else{
        res.json('Não existe')
    }
})

router.get('/teste', async (req, res)=>{
    let empresas;
    empresas  = await knex.select('nome').table('empresas');
    res.json(empresas)
})

module.exports = router;