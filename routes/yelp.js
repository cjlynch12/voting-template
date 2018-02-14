const express = require('express');
const yelp = require('yelp-fusion');
require('dotenv').config();
const yelpKey = process.env.YELP_KEY;
const client = yelp.client(yelpKey);

const router = new express.Router();

function makeYelpCall() {

client.search({
  location: '02134',
  radius: '1609',
  categories: 'Food',
  limit: 15
  
}).then(response => {
  
  console.log(response.jsonBody.businessess[0].name);
}).catch(error => {
  console.log(error);
});

}

router.get('/test', (req,res) => {
  client.search({
  term: 'wings',
  location: '02134',
  radius: '1609',
  sort_by: 'rating',
  //categories: 'food',
  limit: 15
}).then(response => {
  let a = [];
  response.jsonBody.businesses.map((item)=>{a.push(item.name)});
  console.log(response.jsonBody.total);
  res.json({'first': a})
}).catch(error => {
  console.log(error);
});

});

router.get('/autocomplete',(req,res) => {
  client.autocomplete({
    text: 'wings'
  }).then(response => {
    res.json({'autocomplete':response.jsonBody});
    console.log(response.jsonBody)
  }).catch(error => {
    console.log(error);
  });
});


module.exports=router;