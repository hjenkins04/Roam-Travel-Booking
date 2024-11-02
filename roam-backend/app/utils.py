from typing import Optional
import uuid
from datetime import datetime, date

def is_valid_uuid4(uuid_str):
    try:
        val = uuid.UUID(uuid_str, version=4)
    except ValueError:
        return False
    return True

def parse_date(date_str: str) -> Optional[date]:
    if not date_str:
        return None
    try:
        # Remove trailing 'Z' for compatibility with `fromisoformat`
        clean_date_str = date_str.rstrip("Z")
        # Parse with datetime.fromisoformat, handling fractional seconds if present
        return datetime.fromisoformat(clean_date_str).date()
    except ValueError:
        # Handle cases where date might not be in a recognized format
        return None