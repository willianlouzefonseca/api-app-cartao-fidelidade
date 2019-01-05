var router = require('express').Router();
var knex = require('../../config/db');

router.get('/cardapio/:estabelecimentoId', async (req, res) =>{
    let estabelecimentoId = req.body.estabelecimentoId;
    empresa = await knex('estabelecimentos').where('id', estabelecimentoId);
    empresa = empresa[0].id
    let desconto = await knex('descontos').where({'idusuario' : usuario, 'idempresa' : empresa});
    res.json(desconto)
});

router.get('/cardapio/:estabelecimentoId/:inicialChunk/:finalChunk', 
        async(req, res)=>{
            let estabelecimentoId = req.body.estabelecimentoId;
            let inicialChunk = req.body.inicialChunk;
            let finalChunk = req.body.finalChunk;

            estabelecimento = await knex('estabelecimentos').where({'id_estabelecimentos' : estabelecimentoId});
            if(!estabelecimento){
                res.status(404).end();
            }
            if(finalChunk - inicialChunk > 10){
                res.status(400).end();
            }
            let lista = await knex('cardapio')
                .whereBetween('id_item_cardapio',[inicialChunk, finalChunk]);

            res.send(lista);
});

router.get('/cardapio/:itemId',async(req,res)=>{
    let itemId = req.body.itemId;
    item = await knex('cardapio').where({'id_item_cardapio' : itemId});
    item = {
        'nome' : item[0].nome_item_cardapio,
        'preco' : item[0].valor_item_cardapio,
        'descricao' : item[0].descricao_item_cardapio,
        'id' : item[0].id_item_cardapio  
    }

    promocao = await knex('promocao').where({id_item_promocao : item.id});
    if(promocao){
        item.preco_promocional = item.preco * promocao[0].desconto_promocao;
        item.promocaoAplicada = promocao[0].nome;
    }

    res.json(item);
})

module.exports = router