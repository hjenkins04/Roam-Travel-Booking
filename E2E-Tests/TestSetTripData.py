from BaseTest import *
import json

class TestSetTripData(EndToEndTestBase):
    def __init__(self, debug=False):
        super().__init__("TestSetTripData", debug=debug)

    def test(self):
        # Navigate to the domain
        self.driver.get("http://localhost:3000/")
        self.logger.debug("Navigated to the application homepage.")

        # JSON data for tripData-storage
        trip_data_storage = {
            "state": {
                "tripData": {
                    "trip": {
                        "guid": "null",
                        "name": "Round Trip - Mississauga to Honolulu November 2024",
                        "is_round_trip": True,
                        "departing_flight": {
                            "airline": {
                                "guid": "ad316ccc-7633-4d07-8ee9-5507a56f5e58",
                                "icao_code": "ACA",
                                "logo_path": "/images/airline-logos/ACA.png",
                                "name": "Air Canada"
                            },
                            "arrival_airport": {
                                "country": {
                                    "code": "HI",
                                    "continent": {
                                        "code": "NA",
                                        "guid": "4e55960e-88b6-4be0-9651-5d83941d62be",
                                        "name": "North America"
                                    },
                                    "guid": "ecb09c9b-17b8-4adf-a696-6d382ddace79",
                                    "name": "Hawaii"
                                },
                                "full_name": "Daniel K. Inouye International Airport",
                                "guid": "67697700-f5bf-4b0a-9411-d55bfc1c3bc0",
                                "iata_code": "HNL",
                                "location": {
                                    "guid": "40cc00ae-2744-472e-ba9f-eea32babb18f",
                                    "latitude": 21.31932,
                                    "longitude": -157.9254
                                },
                                "municipality_name": "Honolulu",
                                "short_name": "Daniel K. Inouye"
                            },
                            "departure_airport": {
                                "country": {
                                    "code": "CA",
                                    "continent": {
                                        "code": "NA",
                                        "guid": "4e55960e-88b6-4be0-9651-5d83941d62be",
                                        "name": "North America"
                                    },
                                    "guid": "81367191-321a-4bd6-a23e-ff5f401f0bd5",
                                    "name": "Canada"
                                },
                                "full_name": "Toronto Pearson International Airport",
                                "guid": "33ebf608-1949-4fc8-9ca0-b0a02ff83157",
                                "iata_code": "YYZ",
                                "location": {
                                    "guid": "166f1ad8-438f-406d-96db-e18f6dde8b38",
                                    "latitude": 41.67761,
                                    "longitude": -79.63341
                                },
                                "municipality_name": "Mississauga",
                                "short_name": "Toronto Pearson"
                            },
                            "departure_time": "10:30AM",
                            "arrival_time": "7:30PM",
                            "flight_time_minutes": 840,
                            "price_business": 700,
                            "price_economy": 400
                        },
                        "passengers": [
                            {
                                "guid": "passenger-0",
                                "name": "John Doe",
                                "departing_seat_id": 1
                            }
                        ],
                        "departure_date": "2024-11-28T05:00:00.000Z",
                        "return_date": "2024-11-20T05:00:00.000Z",
                        "trip_booking_active": True,
                        "trip_purchased": False
                    }
                }
            },
            "version": 0
        }

        # Set the tripData-storage in localStorage
        self.driver.execute_script(
            "window.localStorage.setItem('tripData-storage', arguments[0]);",
            json.dumps(trip_data_storage)  # Convert Python dict to JSON string
        )
        self.logger.debug("Set tripData-storage in local storage.")

        # Refresh the page to ensure the application loads the new localStorage
        self.driver.refresh()
        self.logger.debug("Refreshed the page to load updated local storage data.")

        # Verify the data was set correctly (Optional)
        stored_data = self.driver.execute_script(
            "return window.localStorage.getItem('tripData-storage');"
        )
        assert stored_data is not None, "tripData-storage was not set correctly."
        self.logger.debug(f"Verified tripData-storage: {stored_data}")
