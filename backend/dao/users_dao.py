import pymongo
from dao.abstract_dao import DAO

class UsersDAO(DAO):
    def get_all(self) -> list:
        return None

    def find(self, username: str) -> dict:
        query = {"username": username}
        if self.collection.count_documents(query) == 0:
            return None
        return self.collection.find_one(query, {"_id":0})

    def update(self, username: str, new_vals: dict) -> bool:
        query = {"username": username}
        if self.collection.count_documents(query) == 0:
            return False
        new_vals = {"$set": new_vals}
        self.collection.update_one(query, new_vals)
        return True

    def add(self, new_vals: dict) -> bool:
        query = {"username": new_vals["username"]}
        if self.collection.count_documents(query) > 0:
            return False
        self.collection.insert_one(new_vals)
        return True

    def remove(self, username: str) -> bool:
        query = {"username": username}
        if self.collection.count_documents(query) == 0:
            return False
        self.collection.delete_one(query)
        return True

    def __init__(self):
        super().__init__()
        self.collection = self.database["users"]