from flask import Flask
from app.extensions import db, ma


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mechanic_shop.db"
    
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    ma.init_app(app)

    from app.customer import customer_bp
    from app.mechanic import mechanic_bp
    from app.service_ticket import service_ticket_bp

    app.register_blueprint(customer_bp, url_prefix="/customers")
    app.register_blueprint(mechanic_bp, url_prefix="/mechanics")
    app.register_blueprint(service_ticket_bp, url_prefix="/service-tickets")

    from app import models
    
    with app.app_context():
        db.create_all()

    return app