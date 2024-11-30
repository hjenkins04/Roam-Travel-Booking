from BaseTest import *

class TestLogin(EndToEndTestBase):
    def __init__(self, debug=False):
        super().__init__("TestLogin", debug=debug)

    def test(self):
        self.driver.get("http://localhost:3000/")
        self.logger.debug("Opened the application homepage.")

        self.driver.set_window_size(968, 533)
        self.logger.debug("Set the browser window size.")

        login_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="login-button"]'))
        )
        login_button.click()
        self.logger.debug("Clicked the login button.")

        email_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "email"))
        )
        email_input.send_keys("user@email.com")
        self.logger.debug("Entered the email address.")

        password_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "password"))
        )
        password_input.send_keys("password")
        self.logger.debug("Entered the password.")

        submit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="submit-button"]'))
        )
        submit_button.click()
        self.logger.debug("Submitted the login form.")
        
        user_avatar = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
        )
        user_avatar.click()

        dashboard_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="dashboard-button"]'))
        )
        dashboard_button.click()
        
        WebDriverWait(self.driver, 10).until(
            lambda driver: '/dashboard' in driver.current_url,
            message="Redirection to '/dashboard' did not occur within the timeout period."
        )

        self.logger.debug("Successfully logged in and reached the dashboard.")
