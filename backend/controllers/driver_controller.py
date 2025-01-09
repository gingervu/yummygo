from models.models import Driver

def create_driver(db, name):
    driver = Driver(name=name)
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver

def get_driver_by_id(db, driver_id):
    return db.query(Driver).filter(Driver.driver_id == driver_id).first()