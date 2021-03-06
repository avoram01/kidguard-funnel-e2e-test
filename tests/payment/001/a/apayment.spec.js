"use strict";
var myModule = require('../../payment.library.js');
var helper = require('../../formhelper.js');
var input = require('../../data.json');

const form = { 
                "name": "input[name='name_on_card']", 
                "cardnum": "input[name='card_number']", 
                "cvc": "input[name='cvv']", 
                "zipcode": "input[name='zipcode']", 
                "exp": "0", 
                "expmonth": "input[name='expiration_month']", 
                "expyear": "input[name='expiration_year']" 
            }
const version = "011/a?";          

const Nightmare = require( "nightmare" ),
      expect = require( "chai" ).expect,
      BASE_URL = helper.urlgenerator(version),
      onError = ( err ) => {
        console.error( "Test-runner failed:", err );
      },
      browser = new Nightmare({
          height: 768,
          width: 1024,
          show: true,
          typeInterval: 20,
          pollInterval: 5000,
          waitTimeout: 30000,
      });

      jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

    describe("A spec to ensure functionality when all info is filled", function() {
        // start up with the blank list
        beforeEach( function(done)  {
            
            browser
                .goto( BASE_URL )
                .evaluate(() => {
                    return localStorage.clear();
                })
                .then(() => {
                    done();
                })
                .catch((error) => done(error));
        });
 
        // disconnect and close Electron process
        afterEach( function(done) {
            browser.end().then(() => {
                done()
            });

        });

        it ("should submit with all forms filled for 'try now' button", async function() {
            var selectors = helper.selectorgenerator(form, version);
            await myModule.formABCD_input(browser, selectors, input);     
        });
    });