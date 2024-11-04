import pytest
from app import create_app, db


@pytest.fixture(scope='session')
def client():
    app = create_app('testing') 
    with app.app_context():
        db.create_all() # db schema 
        with app.test_client() as client:
            yield client
        db.drop_all()