import uuid

def is_valid_uuid4(uuid_str):
    try:
        val = uuid.UUID(uuid_str, version=4)
    except ValueError:
        return False
    return True