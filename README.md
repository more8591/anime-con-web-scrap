# Anime Convention List to CSV

This project is a web scraping tool built using Node.js and Selenium to collect convention leads for my wife’s business. It scrapes data from the [AnimeCons](https://animecons.com/events/schedule.php) website and exports the information (name, date, location, and link) as a CSV file. Pretty handy if you want a list of anime conventions form the past or for this year.

A little history here:
This project was inspired by an older one called [autoJobSearch_Project](https://github.com/more8591/autoJobSearch_Project/blob/main/ajs_main.py), which used Selenium with Python, and an earlier project called [Maid-Cafe-Con-Scrap](https://github.com/more8591/Maid-Cafe-Con-Scrap/blob/master/test.py), which also used Python and leveraged BeautifulSoup! :)

## Features

- Scrapes convention data from the AnimeCons website.
- Supports terminal input for state and year parameters.
- Uses Selenium to automate the browser and scrape data.
- Automatically injects jQuery for easier element selection.
- Outputs the data into a CSV file stored in the `/exported_csv/` directory.

## Dependencies

This project relies on the following Node.js modules:

- **Selenium WebDriver**: For automating browser interaction.
- **Firefox WebDriver**: Used for headless Firefox browser automation.
- **Readline**: For handling terminal input prompts.
- **CSV**: For converting scraped data into CSV format.
- **fs (File System)**: For writing the output CSV file to a subdirectory.
- **Path**: For handling file paths.

### Full List of Dependencies

1. **selenium-webdriver**: Used for browser automation.
2. **csv**: For creating CSV files.
3. **firefox**: Required by Selenium to automate Firefox.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v14 or later)
2. **npm** (comes with Node.js)
3. **Firefox Browser**
4. **GeckoDriver** (for running Selenium with Firefox)

### GeckoDriver Installation (if needed)
Download GeckoDriver for your operating system from [here](https://github.com/mozilla/geckodriver/releases) and make sure it's added to your system PATH.

## Installation

Follow the steps below to set up and run the project:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/convention-lead-scraper.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd convention-lead-scraper
   ```

3. **Install the dependencies**:

   Run the following command to install all the required dependencies from `package.json`:

   ```bash
   npm install
   ```

## Usage

1. **Run the script**:

   After the installation, run the project by executing:

   ```bash
   node main.js
   ```

2. **Input Parameters**:

   The script will prompt you to enter the following information:
   
   - **State**: The state code (e.g., `CA` for California).
   - **Year**: The year for which you want to scrape conventions (e.g., `2024`).

   Example:

   ```
   What State? CA
   What Year? 2024
   ```

3. **CSV Output**:

   The scraped data will be saved as a CSV file in the `/exported_csv/` directory with a name following the pattern: `STATE_YEAR_Conventions.csv` (e.g., `CA_2024_Conventions.csv`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README.md` covers all aspects of your project: what it does, how to install and run it, and what each of the dependencies is for. You can adjust the repository URL and license section if needed.