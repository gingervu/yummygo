from models.models import Customer

def create_customer(db, name):
    customer = Customer(name=name)
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

def get_customer_by_id(db, customer_id):
    return db.query(Customer).filter(Customer.customer_id == customer_id).first()
