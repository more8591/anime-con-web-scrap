/* Modules */
const { Builder, By } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const readline = require('readline'); // Answer terminal prompts for headless search
const csv = require('csv'); // Creates a CSV file out of Obj scraped from webpage
const fs = require('fs'); // Used to save CSV file
const path = require('path') // Used to handle directory path for CSV saves

/* Readline Interface */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* Import Helper Functions from /helper.js */
const { appendStateYear, injectJQuery } = require('./helper');

/* URL */
const baseURL = 'https://animecons.com/events/schedule.php';

/* Terminal Input Questions */
rl.question('What State? ', function (st) {
  rl.question('What Year? ', function (yr) {

    let srchQry = appendStateYear(baseURL, st, yr); // Building search query w/ params
    console.log(`Extracting Data From: ${srchQry}`);  // Check if the URL is correctly built

    /* Init Data Scraping */
    (async function init() {
      let options = new firefox.Options();
      options.addArguments('-headless'); // Headless FireFox enabled

      let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();

      try {
        await driver.get(srchQry); // Go to search query URL

        /* Injecting jQuery ver 3.5.1 */
        await injectJQuery(driver);

        
        let conObj = await driver.executeScript(`
            var rows = $('#ConListTable tbody > tr'),
                rowArry = [];

            rows.each(function(i,e) {
                var conName = $(e).find('a[href*="/events/info"]').text(),
                    conDate = $(e).find('td').first().next().text(),
                    conLoc = $(e).find('td').last().text(),
                    conLink = $(e).find('a[href*="/events/info"]').attr('href') || '';

                if (!conName && !conDate && !conLoc && !conLink) {
                    return '';
                }

                rowArry.push({
                'name': conName,
                'date': conDate,
                'location': conLoc,
                'link': conLink
                });
            });

            return rowArry;
        `);

        if (!conObj) {
            return;
        }

        /* Define sub directory */
        const dir = path.join(__dirname, 'exported_csv');

        /* Check if sub directory exists, otherwise create it */
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        /* Converting Object into CSV file and saving localally */
        csv.stringify(conObj, {
            header: true,
            columns: ['name', 'date', 'location', 'link']
        }, function(err, output) {
            /* Log conversion errors */
            if (err) {
                console.error('Error while converting to CSV: ', err);
                return;
            }

            /* Start Conversion to CSV */
            fs.writeFile(path.join(dir, `${st}_${yr}_Conventions.csv`), output, function(err) {
                if (err) {
                    console.error('Error while writing to file: ', err);
                } else {
                    console.log(`${st}_${yr}_Conventions.csv was successfully exported!`);
                }

                rl.close(); // Close readline interface
            });
        });

      } finally {
        await driver.quit();
      }
    })();
  });
});
