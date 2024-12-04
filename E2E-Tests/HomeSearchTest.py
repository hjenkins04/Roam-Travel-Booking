from BaseTest import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import requests


class HomeSearchTest(EndToEndTestBase):
    def __init__(self, debug=False):
        super().__init__("TestSeatBooking", debug=debug)

    def test(self):
        # // Arrange
        # Navigate to the seat booking page
        
        self.driver.get("http://localhost:3000/")
        self.logger.debug("Navigated to the application homepage.")
        
        self.ensure_logged_in()
        self.logger.debug("User is logged in.")

        # Ensure the page loaded correctly
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="home-page"]'))
        )
        self.logger.debug("Home page loaded successfully.")
        
        # DEPARTURE
        departure_right_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city-right-icon"]'))
        )
        # Click the right-icon
        departure_right_icon.click()
        self.logger.debug("Clicked the right-icon to display the dropdown.")

        # Wait for the dropdown and locate the element with the text "Toronto Pearson"
        departure_dropdown_item = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//div[contains(text(), "Toronto Pearson")]'))
        )
        departure_dropdown_item.click()
        self.logger.debug('Clicked the dropdown item containing "Toronto Pearson".')
        
        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        
        # ARRIVAl
        arrival_right_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="arrival-city-right-icon"]'))
        )
        # Click the right-icon
        arrival_right_icon.click()
        self.logger.debug("Clicked the right-icon to display the dropdown.")

        # Wait for the dropdown and locate the element with the text "Daniel K. Inouye"
        arrival_dropdown_item = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//div[contains(text(), "Daniel K. Inouye")]'))
        )
        arrival_dropdown_item.click()
        self.logger.debug('Clicked the dropdown item containing "Daniel K. Inouye".')
        
        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        
        # DEPARTURE DATE
        # Locate and click the departure date right-icon
        departure_date_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date-right-icon"]'))
        )
        departure_date_icon.click()
        self.logger.debug("Clicked the departure date right-icon to display the calendar dropdown.")

        # Wait for and select the specific date in the calendar (e.g., 4)
        departure_date_item = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//button[@name="day" and text()="4"]'))
        )
        departure_date_item.click()
        self.logger.debug('Selected the departure date "4" from the calendar.')

        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()

        # ARRIVAL DATE
        # Locate and click the arrival date right-icon
        arrival_date_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="return-date-right-icon"]'))
        )
        arrival_date_icon.click()
        self.logger.debug("Clicked the arrival date right-icon to display the calendar dropdown.")

        # Wait for and select the specific date in the calendar (e.g., 10)
        arrival_date_item = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//button[@name="day" and text()="10"]'))
        )
        arrival_date_item.click()
        self.logger.debug('Selected the arrival date "10" from the calendar.')

        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        
        # TRAVELER CLASS
        # Locate and click the departure date right-icon
        traveler_class_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="traveler-&-class-right-icon"]'))
        )
        traveler_class_icon.click()
        self.logger.debug("Clicked the traveler class right-icon to display the dropdown.")

        # Wait for and select the specific date in the calendar (e.g., 4)
        traveler_class_add = WebDriverWait(self.driver, 10).until(
           EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="add-passenger"]'))
        )
        traveler_class_add.click()
        self.logger.debug('Clicked the add passenger button from the dropdown.')

        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        
        #SEARCH
        search_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-button"]'))
        )
        search_button.click()
        
        WebDriverWait(self.driver, 10).until(
            lambda driver: '/search-results' in driver.current_url,
            message="Redirection to '/search-results' did not occur within the timeout period."
        )

        self.logger.debug("Successfully search for flights and reached the search results page.")