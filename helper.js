

function appendStateYear(baseURL, state, year) {
    return !!baseURL & !!state & !!year ? `${baseURL}?loc=us${state}&year=${year}` : '';
};

async function injectJQuery(driver) {
    // Check if jQuery is already available on the page
    const isJQueryLoaded = await driver.executeScript("return typeof jQuery != 'undefined';");
  
    if (!isJQueryLoaded) {
      // Inject jQuery Library
      await driver.executeScript(`
        let script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
        document.head.appendChild(script);
      `);

      console.log('jQuery Loaded!')
  
      // Wait to load jQuery
      await driver.wait(async function() {
        return await driver.executeScript('return typeof jQuery != "undefined";');
      }, 10000, 'jQuery did not load in time');
    }
  };
  

module.exports = {
    appendStateYear,
    injectJQuery
};