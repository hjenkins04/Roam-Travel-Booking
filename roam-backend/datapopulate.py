import sqlite3
import uuid
import random

# Mapping of airport GUIDs to their names
airport_names = {
    "33ebf608-1949-4fc8-9ca0-b0a02ff83157": "Toronto Pearson International Airport",
    "67697700-f5bf-4b0a-9411-d55bfc1c3bc0": "Daniel K. Inouye International Airport",
    "1612716f-56b6-47c2-85eb-96ef991782cf": "Vancouver International Airport",
    "f0872fd1-6652-4c9c-a68f-7a373f510fbb": "São Paulo/Guarulhos–Governador André Franco Montoro International Airport",
    "2554d7bd-08d4-436d-b25c-49e4cd7fc02c": "Charles de Gaulle Airport",
    "101f5e2d-b2d1-4b88-8dc2-185450c0b42a": "Tokyo Haneda Airport",
    "56acb426-4934-4d08-956b-6579ed5f42ec": "Sydney Kingsford Smith Airport",
    "a9514c34-c5ef-432d-8c89-3c64deb504dc": "Berlin Tegel Airport",
    "fe9f88ca-97da-4827-b1c2-c3dcb7ceb375": "Indira Gandhi International Airport",
    "246ac671-2a41-4c8d-8626-4504376686a5": "Moscow Sheremetyevo International Airport",
    "fa0be0a8-99a2-4d7a-939e-9d803cd3c55e": "Beijing Capital International Airport",
    "4aead9c4-773b-4a24-86ce-9e773e30db2c": "Rome Fiumicino Airport",
    "e9e0dff5-adfd-4ad0-85ea-81fc12f165f2": "London Heathrow Airport",
    "3a0dc2af-2445-4009-9890-5c65ac538caa": "Mexico City International Airport",
    "231b8ec7-befe-4d31-a674-d3d77655668a": "Nairobi Jomo Kenyatta International Airport",
    "b6bd94a9-dff5-47b6-b7cc-f687058bf435": "Phoenix Sky Harbor International Airport",
    "10d665a0-e2c4-4cca-a8df-6d1eea7f586b": "San Francisco International Airport",
    "b2c4dfa2-5618-485d-bb3c-369174c372a0": "Ronald Reagan Washington National Airport"
}

# Connect to the SQLite database with a timeout of 5 seconds
conn = sqlite3.connect('mydatabase.db', timeout=5)
cursor = conn.cursor()

# Start an immediate transaction
cursor.execute('BEGIN IMMEDIATE;')

# Step 1: Delete all existing records in the trips table
cursor.execute("DELETE FROM trips;")

# Step 2: Retrieve all flights from the flights table
cursor.execute("SELECT guid, departure_airport_id, arrival_airport_id FROM flights;")
flights_data = cursor.fetchall()

# Step 3: Define a list to hold flight details
flights = []
for flight in flights_data:
    flight_id, departure_airport_id, arrival_airport_id = flight
    flights.append({
        "guid": flight_id,
        "departure_airport_id": departure_airport_id,
        "arrival_airport_id": arrival_airport_id
    })

# Step 4: Create trips
for flight in flights:
    departing_flight_id = flight["guid"]

    # Construct a trip name using airport names
    departure_airport_name = airport_names.get(flight["departure_airport_id"], "Unknown Departure Airport")
    arrival_airport_name = airport_names.get(flight["arrival_airport_id"], "Unknown Arrival Airport")
    
    trip_name = (
        f"Trip from {departure_airport_name} to {arrival_airport_name}"
    )

    # Generate a unique ID for the trip
    trip_guid = str(uuid.uuid4())

    # Step 5: Insert the trip into the trips table
    if flight["departure_airport_id"] != flight["arrival_airport_id"]:
        cursor.execute('''
        INSERT INTO trips (guid, name, is_round_trip, departing_flight_id, returning_flight_id)
        VALUES (?, ?, ?, ?, ?)
        ''', (trip_guid, trip_name, False, departing_flight_id, None))

    # Add a round trip for a limited selection of flights
    if random.random() < 0.5:  # 50% chance to create a round trip
        for f in flights:
            if (f["departure_airport_id"] == flight["arrival_airport_id"] and
                    f["arrival_airport_id"] == flight["departure_airport_id"]):
                returning_flight_id = f["guid"]

                # Create a round trip name
                round_trip_name = (
                    f"Round Trip from {departure_airport_name} to {arrival_airport_name}"
                )

                # Generate a unique ID for the round trip
                round_trip_guid = str(uuid.uuid4())

                # Insert the round trip into the trips table
                cursor.execute('''
                INSERT INTO trips (guid, name, is_round_trip, departing_flight_id, returning_flight_id)
                VALUES (?, ?, ?, ?, ?)
                ''', (round_trip_guid, round_trip_name, True, departing_flight_id, returning_flight_id))
                break  # Exit the inner loop after finding a round trip flight

# Commit changes and close the database connection
conn.commit()
conn.close()
print("Trips have been successfully added to the database.")
