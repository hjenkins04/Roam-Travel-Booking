from tests.test_login import TestLogin
from tests.test_dashboard import TestProfileDashboard
from tests.test_homepage_search import TestHomepageSearch
from tests.test_search_results import TestSearchResults
from tests.test_seat_booking import TestSeatBooking

def run_test_manually(test_class, debug=False):
    """Run a single test manually."""
    test_instance = test_class()
    try:
        test_instance.manual_driver_setup(debug)  # Manually set up  driver
        test_instance.test()  # Call test directly
    except Exception as e:
        print(f"[FAILURE] - Test {test_instance.__class__.__name__} failed.")
        print(f"[DEBUG] Error details: {e}")
    finally:
        test_instance.manual_driver_teardown() 

def run_all_tests(debug=False):
    """Run all tests manually."""
    test_classes = [
        TestLogin,
        TestSearchResults,
        TestHomepageSearch,
        TestSeatBooking,
        TestProfileDashboard
    ]

    for test_class in test_classes:
        print(f"Running test: {test_class.__name__}")
        run_test_manually(test_class, debug)

if __name__ == "__main__":
    run_all_tests(debug=True)
