var express = require('express');
var router = express.Router();
//var https = require('https');
//const data = JSON.parse(body);

/* GET users listing. */
  //router.post('/items', function(req, res, next) {
  //res.send('Carrega tela de resultados para a busca: ' + req.body.search);
  //res.render('results', { title: 'Carrega tela de resultados para a busca: ' + req.body.search});
  router.post('/items', function(req, res, next) {
    https.get('https://api.mercadolibre.com/sites/MLA/search?q=:' +​ req.body['search'], function (err, response, body) {
        res.render('result', { title : 'Main page', data : JSON.parse(body) });
    });
  });
//});

router.get('/items/:id', function(req, res, next) {
  //res.send('Carrega tela de detalhe do produto: ' + req.params['id']);
  res.render('detail', { title: 'Carrega tela de detalhe do produto ID: ' + req.params['id']});
});



module.exports = router;
