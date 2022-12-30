import requests


class Parser:

    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Accept": "*/*"
        }

    def load_page(self, url):
        res = self.session.get(url)
        res.raise_for_status()
        return res.json()

    def get_catalog(self):
        url = 'https://www.wildberries.ru/webapi/menu/main-menu-ru-ru.json'
        return self.load_page(url)

    def parse_catalog(self):
        data = self.get_catalog()
        data_list = []

        for d in data:
            try:
                for child in d['childs']:
                    try:
                        category_name = child['name']
                        category_url = child['url']
                        shard = child['shard']
                        query = child['query']
                        data_list.append({
                            'category_name': category_name,
                            'category_url': category_url,
                            'shard': shard,
                            'query': query
                        })
                    except:
                        continue
                    try:
                        for sub_child in child['childs']:
                            category_name = sub_child['name']
                            category_url = sub_child['url']
                            shard = sub_child['shard']
                            query = sub_child['query']
                            data_list.append({
                                'category_name': category_name,
                                'category_url': category_url,
                                'shard': shard,
                                'query': query
                            })
                    except:
                        continue
            except:
                continue
        return data_list

    def search_category_in_catalog(self, url, catalog_list):
        for catalog in catalog_list:
            if catalog['category_url'] == url:
                name_category = catalog['category_name']
                shard = catalog['shard']
                query = catalog['query']
                return name_category, shard, query
        raise BaseException("Ошибка! Нет совпадений со ссылкой")

    def get_data_from_json(self, json_file):
        data_list = []
        for data in json_file['data']['products']:
            data_list.append({
                'id': data['id'],
                'kindId': data['kindId'],
                'subjectId': data['subjectId'],
                'name': data['name'],
                'price': int(data["salePriceU"] / 100),
                'brand': data['brand'],
                'rating': data['rating'],
                'feedbacks': data['feedbacks']
            })
        return data_list

    def parse_products(self, shard, query, pagesCount=10):
        data_list = []
        for page in range(1, pagesCount + 1):
            url = f'https://catalog.wb.ru/catalog/{shard}/catalog?appType=1&curr=rub&dest=-1075831,-77677,-398551,12358499&locale=ru&page={page}&regions=64,83,4,38,80,33,70,82,86,30,69,1,48,22,66,31,40&sort=popular&spp=0&{query}'
            data = self.get_data_from_json(self.load_page(url))
            if len(data) > 0:
                data_list.extend(data)
            else:
                break
        return data_list

    def parse(self, url):
        try:
            catalog = self.parse_catalog()
            name_category, shard, query = self.search_category_in_catalog(
                url, catalog)
            data_list = self.parse_products(shard, query)
            return data_list
        except TypeError:
            raise BaseException('Ошибка! Некорректная ссылка')