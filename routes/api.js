var express = require('express');
var router = express.Router();
var https = require('https');

/* GET users listing. */
//router.get('/items', function(req, res, next) {
//res.send('Carrega tela de resultados para a busca: ' + req.query.search);
//res.render('results', { title: 'Carrega tela de resultados para a busca: ' + req.query.search});
//});
router.get('/items', function(req, res, next) {
  var search = 'https://api.mercadolibre.com/sites/MLA/search?q=:' + req.query['search'] + '&limit=4';
  console.log(search);
  https.get(search, (response) => {
    var data = "";
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    response.on('data', (d) => {
      data += d;
    });

    response.on('end', function() {
      res.render('results', {title: 'Main page', data: JSON.parse(data) });
      //console.log(data);
    });



  }).on('error', (e) => {
    console.error(e);
  });
  //  https.get(search, function(err, response, body) {
  //    console.log(body);
  //    res.render('index', {
  //      title: 'Main page',
  //      data: JSON.parse(body)
  //    });
  //  });
});

router.get('/items/:id', function(req, res, next) {
  //res.send('Carrega tela de detalhe do produto: ' + req.params['id']);
  res.render('detail', {
    title: 'Carrega tela de detalhe do produto ID: ' + req.params['id']
  });
});



module.exports = router;
