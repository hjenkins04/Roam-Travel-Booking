import pytest

def run_all_tests():
    test_directory = "roam-end2end-tests/"

    exit_code = pytest.main([
        test_directory, 
        "-n", "auto",
        "--maxfail=3",
        "--disable-warnings",
        "-v",
    ])
    
    if exit_code == 0:
        print("All tests passed!")
    else:
        print(f"Some tests failed. Exit code: {exit_code}")


if __name__ == "__main__":
    run_all_tests()
