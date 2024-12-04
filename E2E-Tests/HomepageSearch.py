from BaseTest import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time

class TestHomepageSearch(EndToEndTestBase):
    def __init__(self, debug=False):
        super().__init__("HomepageSearch", debug=debug)

    def test(self):
        try:
            self.driver.get("http://localhost:3000/")
            self.logger.debug("Opened the application homepage.")

            self.driver.set_window_size(968, 533)
            self.logger.debug("Set the browser window size.")

            self.ensure_logged_in()
            self.logger.debug("User is logged in.")


            #===SELECT ARRIVAL & DEPARTURE CITIES====

            departure_city = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city"]'))
            )
            departure_city.click()
            self.logger.debug("Clicked Departure City button.")

            depart_vancouver = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-YVR"]'))
            )
            depart_vancouver.click()
            self.logger.debug("Selected Vancouver Departure.")

            departure_city_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city"]'))
            )
            departure_city_close.click()
            self.logger.debug("Closed Departure City button.")

            time.sleep(1)

            arrival_city = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="arrival-city"]'))
            )
            arrival_city.click()
            self.logger.debug("Clicked Arrival City button.")

            arrive_toronto = WebDriverWait(self.driver, 20).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-YYZ"]'))
            )
            arrive_toronto.click()
            self.logger.debug("Selected Toronto Arrival.")


            #===SELECT DEPARTURE AND ARRIVAL DATES====

            departure_date_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date"]'))
            )
            departure_date_button.click()
            self.logger.debug("Clicked Departure Date Button.")

            departure_date = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[text()="21"]'))
                )
            departure_date.click()
            self.logger.debug("Selected Arrival Date: 2024-12-21.")

            departure_date_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date"]'))
            )
            departure_date_close.click()
            self.logger.debug("Closed Departure Date Button.")

            time.sleep(1)

            arrival_date_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="return-date"]'))
            )
            arrival_date_button.click()
            self.logger.debug("Clicked Arrival Date Button.")

            arrival_date = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[text()="25"]'))
                )
            arrival_date.click()
            self.logger.debug("Selected Arrival Date: 2024-12-25.")

            #==== CONFIRM RENDERING ===

            #==== SEARCH ====

            search_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-button"]'))
            )
            search_button.click()
            self.logger.debug("Clicked Search Button.")
            
            WebDriverWait(self.driver, 10).until(
                lambda driver: '/search-results' in driver.current_url,
                message="Redirection to '/search-results' did not occur within the timeout period."
            )

            self.logger.debug("Successfully search for flights and reached the search results page.")
            
        except Exception as e:
            self.logger.error(f"Test failed with error: {str(e)}")
            raise