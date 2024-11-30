from BaseTest import *
from Login import TestLogin
from TestSetTripData import TestSetTripData

def run_all_tests(debug=False):
    test_classes = [TestLogin, TestSetTripData]  # All Tests HERE
    for test_class in test_classes:
        test_instance = test_class(debug=debug)
        try:
            test_instance.setup()
            test_instance.run_test()
        except Exception as e:
            print(f"{Fore.RED}FAILURE{Style.RESET_ALL} - Test {test_instance.test_name} failed.")
            if debug:
                print(f"[DEBUG] Error details: {str(e)}")

if __name__ == "__main__":
    run_all_tests(debug=True)

