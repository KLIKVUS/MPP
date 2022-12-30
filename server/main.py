from flask import Flask, request
from helpers.db import Db
from helpers.parse import Parser

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///parser.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

with app.app_context():
    db = Db(app)
parser = Parser()


@app.route('/catalog', methods=['GET'])
def index():
    try:
        data_list = parser.get_catalog()
        return {
            "status": "OK",
            "msg": "Каталог был получен",
            "data": data_list
        }
    except BaseException as err:
        return {"status": "NOK", "msg": str(err)}, 400
    except Exception:
        return {"status": "NOK", "msg": "Ошибка на сервере"}, 500


@app.route('/products', methods=['GET'])
def getProducts():
    kind = request.args.get('kind')
    subject = request.args.get('subject')

    if kind and subject:
        try:
            data_list = db.get_products({"kindId": kind, "subjectId": subject})
            return {
                "status": "OK",
                "msg": "Товары были найдены",
                "data": data_list
            }
        except BaseException as err:
            raise err
            return {"status": "NOK", "msg": str(err)}, 400
        except:
            return {"status": "NOK", "msg": "Ошибка на сервере"}, 500
    return {
        "status": "NOK",
        "msg": "Ошибка! Укажите shard, kind и subject в запросе"
    }, 400


@app.route('/parse', methods=['GET'])
def setStatus():
    url = request.args.get('url')

    if url:
        try:
            data_list = parser.parse(url)
            for data in data_list:
                db.insert_product(data)
                db.db.session.commit()
            return {"status": "OK", "msg": "Парсинг прошел успешно"}
        except BaseException as err:
            return {"status": "NOK", "msg": str(err)}, 400
        except:
            return {"status": "NOK", "msg": "Ошибка на сервере"}, 500
    return {"status": "NOK", "msg": "Ошибка! Укажите url в запросе"}, 400


app.run(host='0.0.0.0', port=81)
