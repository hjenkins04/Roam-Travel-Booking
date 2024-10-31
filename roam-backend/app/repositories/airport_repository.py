from typing import List, Optional
from app import db
from app.models.entities.airport_entity import AirportEntity
from app.models.entities.country_entity import CountryEntity
from app.models.dto.airport_dto import AirportDTO

class AirportRepository:
    @staticmethod
    def add(airport_dto: "AirportDTO") -> None:
        print(f"Adding airport: {airport_dto}")  # Debug DTO being added
        airport_entity = AirportEntity.from_dto(airport_dto)
        print(f"Airport entity created: {airport_entity}")  # Debug entity content
        try:
            db.session.add(airport_entity)
            db.session.commit()
            print("Airport added successfully.")
        except Exception as e:
            db.session.rollback()
            print(f"Failed to add airport: {e}")  # Debug error on add

    @staticmethod
    

    @staticmethod
    def get_by_guid(guid: str) -> Optional[AirportEntity]:
        print(f"Fetching airport by GUID: {guid}")  # Debug GUID
        airport = AirportEntity.query.filter_by(guid=guid).first()
        print(f"Fetched airport: {airport}")  # Debug fetched airport
        return airport