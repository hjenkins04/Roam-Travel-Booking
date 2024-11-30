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

# Initialize colorama for colored terminal output
init(autoreset=True)

class EndToEndTestBase:
    def __init__(self, test_name, debug=False):
        self.test_name = test_name
        self.driver = None
        self.debug_mode = debug
        self.logger = self.setup_logger(debug)

    def setup_logger(self, debug):
        """Set up a logger for output with adjustable log level."""
        logger = logging.getLogger(self.test_name)
        handler = logging.StreamHandler()
        handler.setFormatter(self.CustomFormatter())
        logger.addHandler(handler)
        logger.setLevel(logging.DEBUG if debug else logging.INFO)
        return logger

    class CustomFormatter(logging.Formatter):
        """Custom formatter to handle different log levels with colors."""
        def format(self, record):
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            if record.levelname == "INFO":
                status = f"{Fore.GREEN}PASSED{Style.RESET_ALL} - {timestamp} - SUCCESS"
            elif record.levelname == "DEBUG":
                status = f"{Fore.GREEN}SUCCESS{Style.RESET_ALL} - {timestamp}"
            else:  # WARN or ERROR
                status = f"{Fore.RED}FAILURE{Style.RESET_ALL} - {timestamp}"
            return f"{status} - {record.getMessage()}"

    def setup(self):
        """Set up the WebDriver."""
        try:
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
            self.logger.debug("WebDriver setup complete.")
        except Exception as e:
            self.logger.error(f"Failed to set up WebDriver: {str(e)}")
            if self.debug_mode:
                self.logger.debug(traceback.format_exc())
            raise e

    def teardown(self):
        """Tear down the WebDriver."""
        if self.driver:
            self.driver.quit()
            self.logger.debug("WebDriver closed.")

    def run_test(self):
        """Run the test method, handle logging, and teardown."""
        try:
            self.logger.debug(f"Starting test: {self.test_name}")
            self.test()  # Actual test implementation in child classes
            self.logger.info(f"Test {self.test_name} completed successfully.")
        except Exception as e:
            self.logger.error(f"Test {self.test_name} failed.")
            if self.debug_mode:
                self.logger.debug("Stack trace of the error:")
                self.logger.debug(traceback.format_exc())
            else:
                self.logger.debug(f"Error details: {str(e)}")
        finally:
            self.teardown()

    def test(self):
        """Placeholder for child class implementation."""
        raise NotImplementedError("Test method must be implemented in the child class.")
    
    
    
    ##### Helper Methods
    
    def ensure_logged_in(self):
        """Ensure the user is logged in."""
        try:
            # Check if the user-avatar is visible, indicating user is logged in
            WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
            )
            self.logger.debug("User is already logged in.")
        except Exception:
            # Perform login
            self.logger.debug("User is not logged in. Logging in now...")
            self.login()

    def ensure_logged_out(self):
        """Ensure the user is logged out."""
        try:
            # Check if the login button is visible indicating user is logged out
            WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-button"]'))
            )
            self.logger.debug("User is already logged out.")
        except Exception:
            # Perform logout
            self.logger.debug("User is logged in. Logging out now...")
            self.logout()

    def login(self):
        """Perform login actions."""
        self.driver.get("http://localhost:3000/")
        self.logger.debug("Navigated to the login page.")

        login_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="login-button"]'))
        )
        login_button.click()
        self.logger.debug("Clicked the login button.")

        submit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="submit-button"]'))
        )
        submit_button.click()
        self.logger.debug("Submitted the login form.")

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
        )
        self.logger.debug("Login successful.")

    def logout(self):
        """Perform logout actions."""
        user_avatar = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
        )
        user_avatar.click()
        self.logger.debug("Clicked the user avatar.")

        logout_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="logout-button"]'))
        )
        logout_button.click()
        self.logger.debug("Clicked the logout button.")

        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-button"]'))
        )
        self.logger.debug("Logout successful.")
