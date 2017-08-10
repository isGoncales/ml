var express = require('express');
var router = express.Router();
var https = require('https');

/* GET users listing. */
router.get('/items', function(req, res, next) {
  var url = 'https://api.mercadolibre.com/sites/MLA/search?q=:' + req.query['search'] + '&limit=4';
  https.get(url, (response) => {
    var data = "";
    response.on('data', (d) => {
      data += d;
    });

    response.on('end', function() {
      res.render('results', {
        title: 'Teste prático Mercado Livre - Resultados',
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
      res.render('detail', {
        title: 'Teste prático Mercado Livre - Detalhe',
        data: JSON.parse(data)
      });
    });

  }).on('error', (e) => {
    console.error(e);
  });
});

module.exports = router;
