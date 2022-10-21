// var axios = require('axios');
import axios from 'axios';



const createDoc = async(req,res) => {
    try {
        console.log("object run ok")
        var config = {
            method: 'get',
            url: 'https://app-dev007.myshopify.com/admin/api/2022-07/products.json',
            headers: { 
              'X-Shopify-Access-Token': 'shpua_6d45c56e1b49dea731e471bc9a4ad035'
            }
          };
          
          axios(config)
          .then(function (response) {
            
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    } catch (error) {
        console.log("Error", error)
    }
}


export default createDoc