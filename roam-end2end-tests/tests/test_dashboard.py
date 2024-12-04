from BaseTest import *

class TestProfileDashboard(EndToEndTestBase):
    def test(self):
        # Navigate to Profile Page
        self.driver.get("http://localhost:3000")
        self.logger.debug("Opened the application home page.")
        
        self.driver.set_window_size(1920,1080)
        self.logger.debug("Set the browser window size.")

        # Ensure user is logged in
        self.ensure_logged_in()
        self.logger.debug("User is logged in.")

        # Navigate to Dashboard
        user_avatar = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="user-avatar"]'))
        )
        user_avatar.click()
        self.logger.debug("Clicked the user avatar.")

        dashboard_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="dashboard-button"]'))
        )
        dashboard_button.click()
        self.logger.debug("Clicked the dashboard button.")

        # Check for Profile Header
        profile_header = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="profile-header"]'))
        )
        assert profile_header.is_displayed(), "Profile Header not visible"
        self.logger.debug("Profile Header is visible.")

        # Check for Sidebar
        sidebar = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="profile-sidebar"]'))
        )
        assert sidebar.is_displayed(), "Sidebar not visible"
        self.logger.debug("Sidebar is visible.")

        # Navigate to Edit Profile
        edit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="edit-profile-button"]'))
        )
        edit_button.click()
        self.logger.debug("Clicked Edit Profile button.")

        # Fill Edit Form
        first_name_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="First Name*"]'))
        )
        first_name_input.clear()
        first_name_input.send_keys("NewFirstName")
        self.logger.debug("Entered new first name.")

        last_name_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Last Name*"]'))
        )
        last_name_input.clear()
        last_name_input.send_keys("NewLastName")
        self.logger.debug("Entered new last name.")

        dob_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Date of Birth*"]'))
        )
        dob_input.clear()
        dob_input.send_keys("01/01/2000")
        self.logger.debug("Entered new date of birth.")

        email_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Email Address*"]'))
        )
        email_input.clear()
        email_input.send_keys("update@email.com")
        self.logger.debug("Entered new address.")

        phone_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Phone Number*"]'))
        )
        phone_input.clear()
        phone_input.send_keys("1234567890")
        self.logger.debug("Entered new phone number.")

        address_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Street Address*"]'))
        )
        address_input.clear()
        address_input.send_keys("NewAddress")
        self.logger.debug("Entered new address.")

        province_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Province*"]'))
        )
        province_input.clear()
        province_input.send_keys("NewProvince")
        self.logger.debug("Entered new province.")

        postal_code_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Postal Code*"]'))
        )
        postal_code_input.clear()
        postal_code_input.send_keys("A1A1A1")
        self.logger.debug("Entered new postal code.")

        submit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="submit-button"]'))
        )
        submit_button.click()
        self.logger.debug("Submitted profile form.")

        # Verify Success Modal
        success_modal = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h2[text()='Account Updated']"))
        )
        assert success_modal.is_displayed(), "Success modal not displayed."
        self.logger.debug("Profile updated successfully.")

        # Close Success Modal
        back_button = WebDriverWait(self.driver, 100).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="close-button"]'))
        )
        back_button.click()
        self.logger.debug("Closed success modal.")

        # Navigate to purchases section
        purchases_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="purchases-button"]'))
        )
        purchases_button.click()
        self.logger.debug("Clicked Purchases button.")

        # Handle Refunds (if any purchases exist)
        refund_button = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid="cancel-icon"]')
        if refund_button:
            refund_button[0].click()
            self.logger.debug("Initiated refund.")

            # Confirm Refund Dialog
            confirm_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="refund-confirm-button"]'))
            )
            confirm_button.click()
            self.logger.debug("Confirmed refund.")
