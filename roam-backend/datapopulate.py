import sqlite3

# Connect to your SQLite database (replace 'your_database.db' with your database file)
connection = sqlite3.connect('mydatabase.db')
cursor = connection.cursor()

# Execute the query
delete_query = """
DELETE FROM flights
WHERE airline_id IS NULL OR airline_id NOT IN (SELECT guid FROM airlines);
"""
cursor.execute(delete_query)

# Commit the changes
connection.commit()

# Print the number of rows deleted
print(f"Deleted {cursor.rowcount} rows from flights.")

# Clean up
cursor.close()
connection.close()