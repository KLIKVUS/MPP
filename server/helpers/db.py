from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


class Db:

    def __init__(self, app):
        db = SQLAlchemy(app)

        class Products(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            kindId = db.Column(db.Integer, nullable=True)
            subjectId = db.Column(db.Integer, nullable=True)
            parsing_date = db.Column(db.DateTime, default=datetime.utcnow)
            name = db.Column(db.String(50), nullable=True)
            price = db.Column(db.Integer, nullable=True)
            brand = db.Column(db.String(50), nullable=True)
            rating = db.Column(db.Integer, nullable=True)
            feedbacks = db.Column(db.Integer, nullable=True)
                
        db.create_all()

        self.db = db
        self.products_table = Products

    def insert_product(self, data):
        try:
            product = self.products_table(
                id = data["id"],
                kindId = data["kindId"],
                subjectId = data["subjectId"],
                name = data["name"],
                price = data["price"],
                brand = data["brand"],
                rating = data["rating"],
                feedbacks = data["feedbacks"],
            )
            self.db.session.merge(product)
        except Exception as err:
            self.db.session.rollback()
            raise err
            
    def get_products(self, data):
        try:
            data_list = []
            data = self.products_table.query.filter(
                self.products_table.kindId.like(int(data["kindId"])),
                self.products_table.subjectId.in_(data["subjectId"].split(";"))
            ).all()

            for elem in data:
                data_list.append({
                    "name": elem.name,
                    "price": elem.price,
                    "brand": elem.brand,
                    "rating": elem.rating,
                    "feedbacks": elem.feedbacks
                })
            
            return data_list
        except Exception as err: raise err