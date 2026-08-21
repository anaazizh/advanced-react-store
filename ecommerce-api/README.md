# Mechanic Shop API

A Flask REST API for managing customers, mechanics, and service tickets.

## Setup

1. Clone the repository.
2. Create and activate a virtual environment.
3. Install dependencies:

```bash
python -m pip install -r requirements.txt
```

4. Start the server:

```bash
python app.py
```

The API runs at:

```text
http://127.0.0.1:5000
```

## Endpoints

### Customers
- POST `/customers/`
- GET `/customers/`
- GET `/customers/<id>`
- PUT `/customers/<id>`
- DELETE `/customers/<id>`

### Mechanics
- POST `/mechanics/`
- GET `/mechanics/`
- PUT `/mechanics/<id>`
- DELETE `/mechanics/<id>`

### Service Tickets
- POST `/service-tickets/`
- GET `/service-tickets/`
- PUT `/service-tickets/<ticket_id>/assign-mechanic/<mechanic_id>`
- PUT `/service-tickets/<ticket_id>/remove-mechanic/<mechanic_id>`

## Postman Collection

The exported Postman collection is included as:

```text
mechanic-shop-api.postman_collection.json
```