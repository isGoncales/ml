var express = require('express');
var router = express.Router();
var https = require('https');

/* GET users listing. */
//router.get('/items', function(req, res, next) {
//res.send('Carrega tela de resultados para a busca: ' + req.query.search);
//res.render('results', { title: 'Carrega tela de resultados para a busca: ' + req.query.search});
//});
router.get('/items', function(req, res, next) {
  var url = 'https://api.mercadolibre.com/sites/MLA/search?q=:' + req.query['search'] + '&limit=4';
  //console.log(url);
  https.get(url, (response) => {
    var data = "";
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    response.on('data', (d) => {
      data += d;
    });

    response.on('end', function() {
      //console.log(data);
      res.render('results', {
        title: 'Carrega tela de resultados para a busca: ' + req.query['search'],
        data: JSON.parse(data)
      });
    });

  }).on('error', (e) => {
    console.error(e);
  });
});

router.get('/items/:id', function(req, res, next) {
  var url = 'https://api.mercadolibre.com/items/' + req.params.id;
  console.log(url);
  https.get(url, (response) => {
    var data = "";
    response.on('data', (d) => {
      data += d;
    });

    response.on('end', function() {
      //console.log(data);
      res.render('detail', {
        title: 'Carrega tela de detalhe do produto ID: ' + req.params.id,
        data: JSON.parse(data)
      //loadDescription(data, req.params.id, res);
      });
    });

  }).on('error', (e) => {
    console.error(e);
  });

  //res.render('detail', {
  //  title: 'Carrega tela de detalhe do produto ID: ' + req.params['id']
  //});
});

//var url = 'https://api.mercadolibre.com/items/' + id + '/description';

module.exports = router;
