from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime)

    datasets = relationship("Dataset", back_populates="user")
    models = relationship("Model", back_populates="user")
    exports = relationship("Export", back_populates="user")

class Dataset(Base):
    __tablename__ = "datasets"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String)
    uploaded_at = Column(DateTime)
    file_path = Column(String)

    user = relationship("User", back_populates="datasets")
    variables = relationship("Variable", back_populates="dataset")

class Variable(Base):
    __tablename__ = "variables"
    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, ForeignKey('datasets.id'))
    name = Column(String)
    is_predictor = Column(Boolean)
    is_target = Column(Boolean)

    dataset = relationship("Dataset", back_populates="variables")
    variable_importance = relationship("VariableImportance", back_populates="variable")

class Model(Base):
    __tablename__ = "models"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    dataset_id = Column(Integer, ForeignKey('datasets.id'))
    model_type = Column(String)
    created_at = Column(DateTime)

    user = relationship("User", back_populates="models")
    model_metrics = relationship("ModelMetric", back_populates="model")
    exports = relationship("Export", back_populates="model")

class ModelMetric(Base):
    __tablename__ = "modelmetrics"
    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(Integer, ForeignKey('models.id'))
    metric_name = Column(String)
    metric_value = Column(Float)

    model = relationship("Model", back_populates="model_metrics")

class Export(Base):
    __tablename__ = "exports"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    model_id = Column(Integer, ForeignKey('models.id'))
    exported_at = Column(DateTime)
    file_path = Column(String)

    user = relationship("User", back_populates="exports")
    model = relationship("Model", back_populates="exports")

class VariableImportance(Base):
    __tablename__ = "variableimportance"
    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(Integer, ForeignKey('models.id'))
    variable_id = Column(Integer, ForeignKey('variables.id'))
    importance_score = Column(Float)

    model = relationship("Model")
    variable = relationship("Variable", back_populates="variable_importance")
