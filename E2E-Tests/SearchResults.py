from BaseTest import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from HomepageSearch import TestHomepageSearch
import time
class TestSearchResults(EndToEndTestBase):
    def __init__(self, debug=False):
        super().__init__("TestSearchResults", debug=debug)

    def test(self):
        try:
            self.driver.get("http://localhost:3000/")
            self.logger.debug("Opened the application homepage.")

            self.driver.set_window_size(968, 533)
            self.logger.debug("Set the browser window size.")

            self.ensure_logged_in()
            self.logger.debug("User is logged in.")

            self.homepage_navigation()

            departure_city = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city-button"]'))
            )
            departure_city.click()
            self.logger.debug("Clicked Departure City button.")

            depart_vancouver = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-CDG"]'))
            )
            depart_vancouver.click()
            self.logger.debug("Selected Paris Departure.")

            time.sleep(1)
            
            arrival_city = WebDriverWait(self.driver, 20).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="arrival-city-button"]'))
            )
            arrival_city.click()
            self.logger.debug("Clicked Arrival City button.")
            
            time.sleep(1)

            arrive_toronto = WebDriverWait(self.driver, 20).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-GRU"]'))
            )
            arrive_toronto.click()
            self.logger.debug("Selected Sao Paolo Arrival.")
            
            time.sleep(2)


            #===CONFIRM FLIGHT RENDERING===
            air_france_flights = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Air France')]")
            assert len(air_france_flights) == 1
            self.logger.debug("Air France Flights Render.")


            #===APPLY A FILTER ===
            airline_filter = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="filter-button-5"]'))
            )
            airline_filter.click()
            self.logger.debug("Clicked Airline Filter Button.")

            filter_selection = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="dropdown-selection-0"]'))
            )
            filter_selection.click()
            self.logger.debug("Airline Filter Selection Made: LATAM Airlines.")

            search_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-button"]'))
            )
            search_button.click()
            self.logger.debug("Clicked Search Button.")

            time.sleep(1)

            #===CONFIRM FILTERED RENDERING===

            air_france_flights = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Air France')]")
            assert len(air_france_flights) == 0
            self.logger.debug("No Air France Flights Render.")

            #===FILTER AGAIN===

            max_price_filter = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="filter-button-1"]'))
            )
            max_price_filter.click()
            self.logger.debug("Clicked Price Filter Button.")

            filter_selection = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="dropdown-selection-0"]'))
            )
            filter_selection.click()
            self.logger.debug("Max Price Filter Selection Made: $200.")

            search_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-button"]'))
            )
            search_button.click()
            self.logger.debug("Clicked Search Button.")

            time.sleep(1)
            
            #===CONFIRM FILTERED RENDERING===

            no_results = self.driver.find_element(By.XPATH, "//*[contains(text(), 'No results found for your search criteria.')]")
            assert no_results
            self.logger.debug("No Search Results Found.")

            #=== UNDO PRICE FILTER ===

            max_price_filter = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="filter-button-1"]'))
            )
            max_price_filter.click()
            self.logger.debug("Clicked Price Filter Button.")

            time.sleep(1)

            reset_filter = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="reset-button"]'))
            )
            reset_filter.click()
            self.logger.debug("Max Price Filter Selection Made: RESET.")

            search_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-button"]'))
            )
            search_button.click()
            self.logger.debug("Clicked Search Button.")

            time.sleep(1)

            #=== SELECT FLIGHT ===
            flight_selection = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-result-0"]'))
            )
            flight_selection.click()
            self.logger.debug("Clicked First Flight Result.")

            #=== BOOK FLIGHT ====

            buttons = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid="search-button"]')

            if len(buttons) > 1:
                book_ticket_button = buttons[1]
                book_ticket_button.click()
                self.logger.debug("Clicked Book My Ticket Now.")
            else:
                print("Less than two buttons found with the specified data-testid.")



        except Exception as e:
            self.logger.error(f"Test failed with error: {str(e)}")
            raise
