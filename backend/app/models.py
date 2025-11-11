from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP, ForeignKey, DECIMAL, DATE, DATETIME, BIGINT, TEXT
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum('ADMIN', 'FARMER'), default='FARMER')
    created_at = Column(TIMESTAMP, server_default=func.now())

    farms = relationship("Farm", back_populates="user", cascade="all, delete-orphan")

class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    location = Column(String(255))
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="farms")
    regions = relationship("Region", back_populates="farm", cascade="all, delete-orphan")

class Region(Base):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(TEXT)
    created_at = Column(TIMESTAMP, server_default=func.now())

    farm = relationship("Farm", back_populates="regions")
    stakes = relationship("Stake", back_populates="region", cascade="all, delete-orphan")

class Stake(Base):
    __tablename__ = "stakes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    region_id = Column(Integer, ForeignKey("regions.id", ondelete="CASCADE"), nullable=False)
    stake_identifier = Column(String(50), nullable=False)
    coordinate_x = Column(DECIMAL(10, 6), nullable=False)
    coordinate_y = Column(DECIMAL(10, 6), nullable=False)
    installed_at = Column(DATE)

    region = relationship("Region", back_populates="stakes")
    measurements = relationship("Measurement", back_populates="stake", cascade="all, delete-orphan")

class Measurement(Base):
    __tablename__ = "measurements"
    id = Column(BIGINT, primary_key=True, index=True, autoincrement=True)
    stake_id = Column(Integer, ForeignKey("stakes.id", ondelete="CASCADE"), nullable=False)
    recorded_at = Column(DATETIME, server_default=func.now())
    soil_temperature = Column(DECIMAL(5, 2))
    soil_humidity = Column(DECIMAL(5, 2))
    nitrogen = Column(DECIMAL(5, 2))
    phosphorus = Column(DECIMAL(5, 2))
    potassium = Column(DECIMAL(5, 2))
    ph = Column(DECIMAL(3, 2))

    stake = relationship("Stake", back_populates="measurements")