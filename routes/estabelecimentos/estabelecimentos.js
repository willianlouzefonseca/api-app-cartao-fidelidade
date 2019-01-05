var router = require('express').Router();
var knex = require('../../config/db');

router.get('/', async (req, res)=>{
    let estabelecimentos = await knex.select('nome_estabelecimentos', 'id_estabelecimentos')
        .from ('estabelecimentos');
    estabelecimentos.forEach(estabelecimento => {
        estabelecimento.estabelecimento_url = "localhost:7000/estabelecimento/:"+estabelecimento.id_estabelecimentos;
    });

    res.json(estabelecimentos)
})

router.get('/:id', async (req, res)=>{
    let estabelecimento = await knex('estabelecimentos')
        .where('id_estabelecimentos',req.params.id)
        .select('id_estabelecimentos', 'nome_estabelecimentos');

    if(estabelecimento.length == 0){
        res.status(404).end();
    }
    res.json(estabelecimento[0]);
});

router.get('/find/:estabelecimento_nome', async(req, res)=>{
    let estabelecimento_nome = await knex.select('nome_estabelecimentos' , 'id_estabelecimentos')
        .from('estabelecimentos')
        .where('nome_estabelecimentos', 'like', req.params.estabelecimento_nome+"%");
    
    res.json(estabelecimento_nome);
})

router.post('/cadastrar', async (req , res)=>{


    if(req.body.nome == null || req.body.endereco == null || req.body.contato == null ){
        res.json({
            "resposta" : "deve preencher os campos nome, endereco e contato"
        });
    }
    let id = await knex('estabelecimentos').insert({
        'nome_estabelecimentos' : req.body.nome,
        'id_endereco_estabelecimentos' : req.body.endereco,
        'id_contato_estabelecimentos' : req.body.contato
    }).returning('id_estabelecimentos');
    
    resposta = {
        url :  "localhost:7000/estabelecimento/:"+id 
    } 
    res.json(resposta);
});

router.delete('/deletar/:id', async (req, res)=>{
    let id = await knex.where({
        id_estabelecimentos : req.params.id
    }).del()
      .into('estabelecimentos').returning('id_estabelecimentos');

    res.header(204);
    res.json(id);
});

router.post('/update/:id', async (req, res)=>{
    let estabelecimento = await knex.select('nome_estabelecimentos', 
    'id_contato_estabelecimentos', 
    'id_endereco_estabelecimentos').where('id_estabelecimentos', req.params.id)
    .from('estabelecimentos');

    if(estabelecimento.id_contato_estabelecimentos !== req.body.contato) estabelecimento.contato = req.body.contato;
    if(estabelecimento.id_endereco_estabelecimentos !== req.body.endereco) estabelecimento.endereco = req.body.endereco;
    if(estabelecimento.nome_estabelecimentos !== req.body.nome) estabelecimento.nome = req.body.nome;


    await knex('estabelecimentos').update({
        'nome_estabelecimentos' : estabelecimento.nome,
        'id_contato_estabelecimentos' : estabelecimento.contato,
        'id_endereco_estabelecimentos' :  estabelecimento.contato
    }).where('id_estabelecimentos', req.params.id);

    estabelecimento = await knex.
        select(
            'nome_estabelecimentos',
            'id_contato_estabelecimentos', 
            'id_endereco_estabelecimentos').
        from('estabelecimentos').where({'id_estabelecimentos': req.params.id});

    res.json(estabelecimento)
    
})

module.exports = router;