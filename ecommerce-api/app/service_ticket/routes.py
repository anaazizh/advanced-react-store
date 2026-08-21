from flask import request, jsonify
from app.extensions import db
from app.models import ServiceTicket, Mechanic
from app.service_ticket import service_ticket_bp
from app.service_ticket.schemas import ServiceTicketSchema

service_ticket_schema = ServiceTicketSchema()
service_tickets_schema = ServiceTicketSchema(many=True)


@service_ticket_bp.route("/", methods=["POST"])
def create_service_ticket():
    ticket_data = request.get_json()

    new_ticket = service_ticket_schema.load(ticket_data)

    db.session.add(new_ticket)
    db.session.commit()

    return service_ticket_schema.jsonify(new_ticket), 201


@service_ticket_bp.route("/", methods=["GET"])
def get_service_tickets():
    tickets = db.session.query(ServiceTicket).all()

    return service_tickets_schema.jsonify(tickets), 200


@service_ticket_bp.route(
    "/<int:ticket_id>/assign-mechanic/<int:mechanic_id>",
    methods=["PUT"]
)
def assign_mechanic(ticket_id, mechanic_id):
    ticket = db.session.get(ServiceTicket, ticket_id)
    mechanic = db.session.get(Mechanic, mechanic_id)

    if ticket is None:
        return jsonify({"message": "Service ticket not found"}), 404

    if mechanic is None:
        return jsonify({"message": "Mechanic not found"}), 404

    if mechanic in ticket.mechanics:
        return jsonify({"message": "Mechanic already assigned"}), 400

    ticket.mechanics.append(mechanic)
    db.session.commit()

    return jsonify({"message": "Mechanic assigned successfully"}), 200


@service_ticket_bp.route(
    "/<int:ticket_id>/remove-mechanic/<int:mechanic_id>",
    methods=["PUT"]
)
def remove_mechanic(ticket_id, mechanic_id):
    ticket = db.session.get(ServiceTicket, ticket_id)
    mechanic = db.session.get(Mechanic, mechanic_id)

    if ticket is None:
        return jsonify({"message": "Service ticket not found"}), 404

    if mechanic is None:
        return jsonify({"message": "Mechanic not found"}), 404

    if mechanic not in ticket.mechanics:
        return jsonify({"message": "Mechanic is not assigned to this ticket"}), 400

    ticket.mechanics.remove(mechanic)
    db.session.commit()

    return jsonify({"message": "Mechanic removed successfully"}), 200