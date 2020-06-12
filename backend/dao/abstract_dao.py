import pymongo


class DAO:
    def get_all(self) -> list:
        return self.collection.find()

    def find(self, name: str) -> dict:
        query = {"name": name}
        if self.collection.count_documents(query) == 0:
            return None
        return self.collection.find_one(query)

    def update(self, name: str, new_vals: dict) -> bool:
        query = {"name": name}
        if self.collection.count_documents(query) == 0:
            return False
        new_vals = {"$set": new_vals}
        self.collection.update_one(query, new_vals)
        return True

    def add(self, new_vals: dict) -> bool:
        query = {"name": new_vals["name"]}
        if self.collection.count_documents(query) > 0:
            return False
        self.collection.insert_one(new_vals)
        return True

    def remove(self, name: str) -> bool:
        query = {"name": name}
        if self.collection.count_documents(query) == 0:
            return False
        self.collection.delete_one(query)
        return True

    def __init__(self):
        self.client = pymongo.MongoClient("mongodb://localhost:27017/")
        self.database = self.client["mycroft"]