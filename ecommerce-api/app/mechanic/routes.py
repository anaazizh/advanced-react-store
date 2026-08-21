from flask import request, jsonify
from app.extensions import db
from app.mechanic import mechanic_bp
from app.mechanic.schemas import MechanicSchema
from app.models import Mechanic

mechanic_schema = MechanicSchema()
mechanics_schema = MechanicSchema(many=True)


@mechanic_bp.route("/", methods=["POST"])
def create_mechanic():
    mechanic_data = request.get_json()

    new_mechanic = mechanic_schema.load(mechanic_data)

    db.session.add(new_mechanic)
    db.session.commit()

    return mechanic_schema.jsonify(new_mechanic), 201


@mechanic_bp.route("/", methods=["GET"])
def get_mechanics():
    mechanics = db.session.query(Mechanic).all()

    return mechanics_schema.jsonify(mechanics), 200


@mechanic_bp.route("/<int:id>", methods=["PUT"])
def update_mechanic(id):
    mechanic = db.session.get(Mechanic, id)

    if mechanic is None:
        return jsonify({"message": "Mechanic not found"}), 404

    mechanic_data = request.get_json()

    updated_mechanic = mechanic_schema.load(
        mechanic_data,
        instance=mechanic,
        partial=True
    )

    db.session.commit()

    return mechanic_schema.jsonify(updated_mechanic), 200


@mechanic_bp.route("/<int:id>", methods=["DELETE"])
def delete_mechanic(id):
    mechanic = db.session.get(Mechanic, id)

    if mechanic is None:
        return jsonify({"message": "Mechanic not found"}), 404

    db.session.delete(mechanic)
    db.session.commit()

    return jsonify({"message": "Mechanic deleted successfully"}), 200