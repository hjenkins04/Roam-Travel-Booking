from BaseTest import *
from selenium.webdriver.common.by import By
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestSeatBooking(EndToEndTestBase):
    def __init__(self, debug=False):
        super().__init__("TestSeatBooking", debug=debug)

    def test(self):
        self.search_page_navigation()
        
        # Assert we are on the seat booking page
        WebDriverWait(self.driver, 10).until(
            lambda driver: '/seat-booking' in driver.current_url,
            message="We arent on the '/seat-booking' page"
        )

        # Ensure the seat booking page loaded
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="seat-booking"]'))
        )
        self.logger.debug("Seat booking page loaded successfully")

        # Act: Select the first available seat
        first_seat = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="seat-40-available"]'))
        )
        first_seat.click()
        self.logger.debug("Selected the first available seat")

        # Assert: Ensure the booking form is displayed
        booking_form = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="booking-form-column"]'))
        )
        assert booking_form.is_displayed(), "Booking form was not displayed after selecting a seat"
        self.logger.debug("Booking form displayed after selecting a seat")

        # Fill out passenger details
        self.fill_passenger_details(
            first_name="John",
            last_name="Doe",
            email="john.doe@email.com",
            phone="1234567890"
        )
        self.logger.debug("Filled out passenger details for the first passenger")

        # Assert passenger details in the footer
        self.verify_footer_details(seat_number="40", passenger_name="John Doe")

        # Act: Click the Next Passenger button
        next_passenger_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="next-passenger-button"]'))
        )
        next_passenger_button.click()
        self.logger.debug("Clicked the 'Next Passenger' button")

        # Act: Select the second available seat
        second_seat = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="seat-41-available"]'))
        )
        second_seat.click()
        self.logger.debug("Selected the second available seat")

        # Fill out passenger details for the second passenger
        self.fill_passenger_details(
            first_name="Jane",
            last_name="Smith",
            email="jane.smith@email.com",
            phone="0987654321"
        )
        self.logger.debug("Filled out passenger details for the second passenger")

        # Assert passenger details in the footer
        self.verify_footer_details(seat_number="41", passenger_name="Jane Smith")

        # Click Book Return Flight button
        book_return_flight_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="book-return-flight-button"]'))
        )
        book_return_flight_button.click()
        self.logger.debug("Clicked the 'Book Return Flight' button")

        # Act: Select return flight seats and verify passenger details
        self.select_return_seat_and_verify(seat_number="54", passenger_name="John Doe")
        self.verify_passenger_details(
            first_name="John",
            last_name="Doe",
            email="john.doe@email.com",
            phone="1234567890"
        )
        
        # Act: Click the Next Passenger button
        next_passenger_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="next-passenger-button"]'))
        )
        next_passenger_button.click()
        self.logger.debug("Clicked the 'Next Passenger' button")
         
        self.select_return_seat_and_verify(seat_number="55", passenger_name="Jane Smith")
        self.verify_passenger_details(
            first_name="Jane",
            last_name="Smith",
            email="jane.smith@email.com",
            phone="0987654321"
        )
        
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
        self.logger.debug("Successfully redirected to the checkout page")

    # Helper function to fill passenger details
    def fill_passenger_details(self, first_name, last_name, email, phone):
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-first-name"]').send_keys(first_name)
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-last-name"]').send_keys(last_name)
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-email"]').send_keys(email)
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-phone"]').send_keys(phone)
        
    # Helper function to verify passenger details
    def verify_passenger_details(self, first_name, last_name, email, phone):
        assert self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-first-name"]').get_attribute("value") == first_name, "First name mismatch"
        assert self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-last-name"]').get_attribute("value") == last_name, "Last name mismatch"
        assert self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-email"]').get_attribute("value") == email, "Email mismatch"
        assert self.driver.find_element(By.CSS_SELECTOR, '[data-testid="form-field-phone"]').get_attribute("value") == phone, "Phone number mismatch"
        self.logger.debug("Verified that second passenger details remain correctly filled.")

    # Helper function to verify footer details
    def verify_footer_details(self, seat_number, passenger_name):
        footer_seat_number = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="footer-seat-number"]')
        footer_passenger_name = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="footer-passenger-name"]')
        assert footer_seat_number.text == seat_number, f"Unexpected seat number: {footer_seat_number.text}"
        assert passenger_name in footer_passenger_name.text, f"Unexpected passenger name: {footer_passenger_name.text}"
        self.logger.debug(f"Verified footer details for seat {seat_number} and passenger {passenger_name}")

    # Helper function to select a return seat and verify passenger details
    def select_return_seat_and_verify(self, seat_number, passenger_name):
        seat = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, f'[data-testid="seat-{seat_number}-available"]'))
        )
        seat.click()
        self.logger.debug(f"Selected return seat {seat_number}")
        self.verify_footer_details(seat_number=seat_number, passenger_name=passenger_name)