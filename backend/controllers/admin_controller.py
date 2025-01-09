from models.models import Admin

def create_admin(db, name):
    admin = Admin(name=name)
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin

def get_admin_by_id(db, admin_id):
    return db.query(Admin).filter(Admin.admin_id == admin_id).first()
