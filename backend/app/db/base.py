# Import all models to ensure they are registered with SQLAlchemy's declarative base
from app.db.session import Base # noqa
from app.models.user import User # noqa
from app.models.audit import AuditLog # noqa
