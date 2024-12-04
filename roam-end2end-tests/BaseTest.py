import logging
import traceback
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from colorama import Fore, Style, init
from datetime import datetime
from webdriver_manager.chrome import ChromeDriverManager
import time
import pytest
import os

# Initialize colorama for colored terminal output
init(autoreset=True)

@pytest.mark.usefixtures("setup_driver")
class EndToEndTestBase:
    @pytest.fixture(autouse=True)
    def setup_driver(self, request):
        """Fixture to set up and tear down the WebDriver."""
        self.logger = self.setup_logger(debug=False, use_logger=False)  # Initialize logger
        try:
            service = Service(ChromeDriverManager().install())
            
            options = webdriver.ChromeOptions()
            options.add_experimental_option('excludeSwitches', ['enable-logging'])
            options.add_argument("--log-level=2")
            
            # Add headless mode
            options.add_argument("--headless=new")
            options.add_argument("--disable-gpu")
            options.add_argument("--window-size=1920,1080")

            # Setup WebDriver
            self.driver = webdriver.Chrome(service=service, options=options)
            self.logger.debug("WebDriver setup complete.")
        except Exception as e:
            self.logger.error(f"Failed to set up WebDriver: {str(e)}")
            raise e

        request.cls.driver = self.driver  # Attach the driver to the test
        yield
        self.driver.quit()
        self.logger.debug("WebDriver closed.")
    
    def setup_logger(self, debug, use_logger=True):
        """Set up a logger for output with adjustable log level"""
        logger = logging.getLogger(self.__class__.__name__)
        if use_logger:
            handler = logging.StreamHandler()
            handler.setFormatter(self.CustomFormatter())
            logger.addHandler(handler)
            logger.setLevel(logging.DEBUG if debug else logging.INFO)
        else:
            logger.setLevel(logging.CRITICAL + 1)
            
        return logger

    class CustomFormatter(logging.Formatter):
        """Custom formatter to handle different log levels with colors"""
        def format(self, record):
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            if record.levelname == "INFO":
                status = f"{Fore.GREEN}PASSED{Style.RESET_ALL} - {timestamp} - SUCCESS"
            elif record.levelname == "DEBUG":
                status = f"{Fore.GREEN}SUCCESS{Style.RESET_ALL} - {timestamp}"
            else:  # WARN or ERROR
                status = f"{Fore.RED}FAILURE{Style.RESET_ALL} - {timestamp}"
            return f"{status} - {record.getMessage()}"

    def manual_driver_setup(self, debug):
        """Set up the WebDriver manually."""
        self.logger = self.setup_logger(debug)
        try:
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
            self.logger.debug("WebDriver setup complete.")
        except Exception as e:
            self.logger.error(f"Failed to set up WebDriver: {str(e)}")
            raise e

    def manual_driver_teardown(self):
        """Tear down the WebDriver"""
        if self.driver:
            self.driver.quit()
            self.logger.debug("WebDriver closed")
            
    def run_test(self):
        """Run the test method, handle logging, and teardown"""
        try:
            self.logger.debug(f"Starting test: {self.test_name}")
            self.test()  # Actual test implementation in child classes
            self.logger.info(f"Test {self.test_name} completed successfully")
        except Exception as e:
            self.logger.error(f"Test {self.test_name} failed")
            if self.debug_mode:
                self.logger.debug("Stack trace of the error:")
                self.logger.debug(traceback.format_exc())
            else:
                self.logger.debug(f"Error details: {str(e)}")
        finally:
            self.teardown()

    def run_test_without_teardown(self):
        """Run the test method, handle logging, and teardown"""
        try:
            self.logger.debug(f"Starting test: {self.test_name}")
            self.test()  # Actual test implementation in child classes
            self.logger.info(f"Test {self.test_name} completed successfully")
        except Exception as e:
            self.logger.error(f"Test {self.test_name} failed")
            if self.debug_mode:
                self.logger.debug("Stack trace of the error:")
                self.logger.debug(traceback.format_exc())
            else:
                self.logger.debug(f"Error details: {str(e)}")
    
    @pytest.mark.skip(reason="Base test method should not be executed")
    def test(self):
        """Placeholder for child class implementation"""
        raise NotImplementedError("Test method must be implemented in the child class")
    
    
    
    ##### Helper Methods 
    def ensure_logged_in(self):
        """Ensure the user is logged in"""
        try:
            # Check if the user-avatar is visible, indicating user is logged in
            WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
            )
            self.logger.debug("User is already logged in")
        except Exception:
            # Perform login
            self.logger.debug("User is not logged in. Logging in now..")
            self.login()

    def ensure_logged_out(self):
        """Ensure the user is logged out"""
        try:
            # Check if the login button is visible indicating user is logged out
            WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-button"]'))
            )
            self.logger.debug("User is already logged out")
        except Exception:
            # Perform logout
            self.logger.debug("User is logged in. Logging out now..")
            self.logout()

    def login(self):
        """Perform login actions"""
        self.driver.get("http://localhost:3000/")
        self.logger.debug("Navigated to the login page")

        login_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="login-button"]'))
        )
        login_button.click()
        self.logger.debug("Clicked the login button")

        submit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="submit-button"]'))
        )
        submit_button.click()
        self.logger.debug("Submitted the login form")

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
        )
        self.logger.debug("Login successful")

    def logout(self):
        """Perform logout actions"""
        user_avatar = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
        )
        user_avatar.click()
        self.logger.debug("Clicked the user avatar")

        logout_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="logout-button"]'))
        )
        logout_button.click()
        self.logger.debug("Clicked the logout button")

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-button"]'))
        )
        self.logger.debug("Logout successful")

    def homepage_navigation(self):

        #===ARRIVAL & DEPARTURE====

        departure_city = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city"]'))
            )
        departure_city.click()
        self.logger.debug("Clicked Departure City button")

        depart_vancouver = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-YVR"]'))
            )
        depart_vancouver.click()
        self.logger.debug("Selected Vancouver Departure")

        departure_city_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city"]'))
            )
        departure_city_close.click()
        self.logger.debug("Closed Departure City button")

        time.sleep(1)

        arrival_city = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="arrival-city"]'))
            )
        arrival_city.click()
        self.logger.debug("Clicked Arrival City button")

        arrive_toronto = WebDriverWait(self.driver, 20).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-YYZ"]'))
            )
        arrive_toronto.click()
        self.logger.debug("Selected Toronto Arrival")


        #===DATES====

        departure_date_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date"]'))
            )
        departure_date_button.click()
        self.logger.debug("Clicked Departure Date Button")

        departure_date = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[text()="21"]'))
                )
        departure_date.click()
        self.logger.debug("Selected Arrival Date: 2024-12-21")

        departure_date_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date"]'))
            )
        departure_date_close.click()
        self.logger.debug("Closed Departure Date Button")

        time.sleep(1)

        arrival_date_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="return-date"]'))
            )
        arrival_date_button.click()
        self.logger.debug("Clicked Arrival Date Button")

        arrival_date = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[text()="25"]'))
                )
        arrival_date.click()
        self.logger.debug("Selected Arrival Date: 2024-12-25")

        search_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-button"]'))
            )
        search_button.click()
        self.logger.debug("Clicked Search Button")
    
    def homepage_navigation_for_seat_booking(self):
        self.driver.get("http://localhost:3000/")
        self.logger.debug("Navigated to the application homepage")
        
        self.ensure_logged_in()
        self.logger.debug("User is logged in")

        # Ensure the page loaded correctly
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="home-page"]'))
        )
        self.logger.debug("Home page loaded successfully")
        
        # DEPARTURE
        departure_right_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city-right-icon"]'))
        )
        # Click the right-icon
        departure_right_icon.click()
        self.logger.debug("Clicked the right-icon to display the dropdown")

        # Wait for the dropdown and locate the element with the text "Toronto Pearson"
        departure_dropdown_item = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//div[contains(text(), "Toronto Pearson")]'))
        )
        departure_dropdown_item.click()
        self.logger.debug('Clicked the dropdown item containing "Toronto Pearson".')
        
        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        time.sleep(1)
        
        # ARRIVAl
        arrival_right_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="arrival-city-right-icon"]'))
        )
        # Click the right-icon
        arrival_right_icon.click()
        self.logger.debug("Clicked the right-icon to display the dropdown")

        # Wait for the dropdown and locate the element with the text "Daniel K. Inouye"
        arrival_dropdown_item = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//div[contains(text(), "Daniel K. Inouye")]'))
        )
        arrival_dropdown_item.click()
        self.logger.debug('Clicked the dropdown item containing "Daniel K. Inouye".')
        
        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        time.sleep(1)
        
        # DEPARTURE DATE
        # Locate and click the departure date right-icon
        departure_date_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date-right-icon"]'))
        )
        departure_date_icon.click()
        self.logger.debug("Clicked the departure date right-icon to display the calendar dropdown")

        # Wait for and select the specific date in the calendar (e.g., 4)
        departure_date_item = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//button[@name="day" and text()="4"]'))
        )
        departure_date_item.click()
        self.logger.debug('Selected the departure date "4" from the calendar.')

        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        time.sleep(1)

        # ARRIVAL DATE
        # Locate and click the arrival date right-icon
        arrival_date_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="return-date-right-icon"]'))
        )
        arrival_date_icon.click()
        self.logger.debug("Clicked the arrival date right-icon to display the calendar dropdown")

        # Wait for and select the specific date in the calendar (e.g., 10)
        arrival_date_item = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//button[@name="day" and text()="10"]'))
        )
        arrival_date_item.click()
        self.logger.debug('Selected the arrival date "10" from the calendar.')

        # Close the calendar dropdown by clicking outside or another element
        self.driver.find_element(By.TAG_NAME, 'body').click()
        
        time.sleep(1)
        
        # TRAVELER CLASS
        # Locate and click the departure date right-icon
        traveler_class_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="traveler-&-class-right-icon"]'))
        )
        traveler_class_icon.click()
        self.logger.debug("Clicked the traveler class right-icon to display the dropdown")

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
            message="Redirection to '/search-results' did not occur within the timeout period"
        )

        self.logger.debug("Successfully search for flights and reached the search results page")
    
    def homepage_navigation2(self):

        #===ARRIVAL & DEPARTURE====

        departure_city = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city"]'))
            )
        departure_city.click()
        self.logger.debug("Clicked Departure City button")

        depart_vancouver = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-YYZ"]'))
            )
        depart_vancouver.click()
        self.logger.debug("Selected Vancouver Departure")

        departure_city_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-city"]'))
            )
        departure_city_close.click()
        self.logger.debug("Closed Departure City button")

        time.sleep(1)

        arrival_city = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="arrival-city"]'))
            )
        arrival_city.click()
        self.logger.debug("Clicked Arrival City button")

        arrive_toronto = WebDriverWait(self.driver, 20).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="airport-item-HNL"]'))
            )
        arrive_toronto.click()
        self.logger.debug("Selected Toronto Arrival")
        
        arrive_city_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="arrival-city"]'))
            )
        arrive_city_close.click()
        self.logger.debug("Closed Arrival City button")


        #===DATES====

        departure_date_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date"]'))
            )
        departure_date_button.click()
        self.logger.debug("Clicked Departure Date Button")

        departure_date = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[text()="21"]'))
                )
        departure_date.click()
        self.logger.debug("Selected Arrival Date: 2024-12-21")

        departure_date_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="departure-date"]'))
            )
        departure_date_close.click()
        self.logger.debug("Closed Departure Date Button")

        time.sleep(1)

        arrival_date_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="return-date"]'))
            )
        arrival_date_button.click()
        self.logger.debug("Clicked Arrival Date Button")

        arrival_date = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[text()="25"]'))
                )
        arrival_date.click()
        self.logger.debug("Selected Arrival Date: 2024-12-25")
        
        arrival_date_close = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="return-date"]'))
            )
        arrival_date_close.click()
        self.logger.debug("Closed Arrival Date Button")
        
        time.sleep(1)
        
        # TRAVELER CLASS
        # Locate and click the departure date right-icon
        traveler_class_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="traveller-number"]'))
        )
        traveler_class_button.click()
        self.logger.debug("Clicked the traveler class right-icon to display the dropdown")

        # Wait for and select the specific date in the calendar (e.g., 4)
        traveler_class_add = WebDriverWait(self.driver, 10).until(
           EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="add-passenger"]'))
        )
        traveler_class_add.click()
        self.logger.debug('Clicked the add passenger button from the dropdown.')

        # Close the calendar dropdown by clicking outside or another element
        traveler_class_close = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="traveller-number"]'))
        )
        traveler_class_close.click()
        
        time.sleep(1)

        search_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-button"]'))
            )
        search_button.click()
        self.logger.debug("Clicked Search Button")
    
    def search_page_navigation(self):
        #self.homepage_navigation_for_seat_booking()
        self.homepage_navigation2()
        
        search_results_item = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="search-result-0"]'))
        )
        search_results_item.click()
        self.logger.debug("Clicked the first search result")

        # Click Book My Ticket Now button
        checkout_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//span[text()="Book My Ticket Now"]'))
        )
        self.logger.debug('Located the button with text "Book My Ticket Now".')
        checkout_button.click()

        # Assert redirection to the seat booking page
        WebDriverWait(self.driver, 10).until(
            lambda driver: '/seat-booking' in driver.current_url,
            message="Redirection to '/seat-booking' did not occur within the timeout period"
        )
        self.logger.debug("Successfully redirected to the seat booking page")
    
    def seat_booking_page_navigation(self):
        self.search_page_navigation()
        self.logger.debug("Successfully started seat booking process for selected flight and reached the seatbooking page")

        # Ensure the page loaded correctly
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="seat-booking"]'))
        )
        self.logger.debug("Seat booking page loaded successfully")

        first_seat = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="seat-40-available"]'))
        )
        self.logger.debug("Located the seat element with data-testid='seat-40-available'")

        first_seat.click()
        self.logger.debug("Selected an available seat")

        # Assert: Ensure the booking form is displayed
        booking_form = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="booking-form-column"]'))
        )
        assert booking_form.is_displayed(), "Booking form was not displayed after selecting a seat"
        self.logger.debug("Booking form displayed after selecting a seat")

        # Act: Fill out passenger details
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-first-name"]').send_keys("John")
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-last-name"]').send_keys("Doe")
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-email"]').send_keys("john.doe@email.com")
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-phone"]').send_keys("1234567890")
        self.logger.debug("Filled out passenger details")
        
        # Click the Next Passenger button
        next_passenger_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="next-passenger-button"]'))
        )
        next_passenger_button.click()
        self.logger.debug("Clicked the 'Next Passenger' button")

        # Act: Select the second seat
        second_seat = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="seat-41-available"]'))
        )
        second_seat.click()
        self.logger.debug("Selected a second available seat")

        # Fill out passenger details for the second passenger
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-first-name"]').send_keys("Jane")
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-last-name"]').send_keys("Smith")
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-email"]').send_keys("jane.smith@email.com")
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-phone"]').send_keys("0987654321")
        self.logger.debug("Filled out second passenger details")

        # Click the Book Return Flight button
        book_return_flight_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="book-return-flight-button"]'))
        )
        book_return_flight_button.click()
        self.logger.debug("Clicked the 'Book Return Flight' button")

        first_seat_return = WebDriverWait(self.driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="seat-54-available"]'))
        )
        self.logger.debug("Located the seat element with data-testid='seat-54-available'")

        first_seat_return.click()
        self.logger.debug("Selected an available return seat")
        
        # Click the Next Passenger button
        next_passenger_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="next-passenger-button"]'))
        )
        next_passenger_button.click()
        self.logger.debug("Clicked the 'Next Passenger' button")
        
        second_seat_return = WebDriverWait(self.driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="seat-55-available"]'))
        )
        self.logger.debug("Located the seat element with data-testid='seat-55-available'")

        second_seat_return.click()
        self.logger.debug("Selected a second available return seat")

        # Act: Submit the seat booking form
        checkout_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="checkout-button"]'))
        )
        checkout_button.click()
        self.logger.debug("Clicked the 'Checkout' button")

        # Assert: Ensure redirection to the checkout page
        WebDriverWait(self.driver, 10).until(
            lambda driver: '/checkout' in driver.current_url,
            message="Redirection to '/checkout' did not occur"
        )
        self.logger.debug("Redirected to the checkout page successfully")