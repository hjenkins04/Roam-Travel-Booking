import sqlite3

def delete_extra_rows(database_path, table_name):
    # Connect to the SQLite database
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    try:
        # Get the total number of rows in the trips table
        cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
        total_rows = cursor.fetchone()[0]

        # Check if there are more than 2 rows
        if total_rows > 2:
            # Delete all but the first two rows
            cursor.execute(f"""
                DELETE FROM {table_name}
                WHERE rowid NOT IN (
                    SELECT rowid FROM {table_name} ORDER BY rowid LIMIT 2
                )
            """)
            conn.commit()
            print(f"Deleted {total_rows - 2} rows from the {table_name} table.")
        else:
            print("No rows deleted. The table has 2 or fewer rows.")
    
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    
    finally:
        # Close the database connection
        conn.close()

if __name__ == "__main__":
    database_path = 'mydatabase.db'  # Path to your database
    table_name = 'trips'  # Name of your table
    delete_extra_rows(database_path, table_name)