import pymongo
import os


class DAO:
    def get_all(self, username: str) -> list:
        return list(self.collection.find({"username": username}, {"_id":0, "username":0}))

    def find(self, name: str, username: str) -> dict:
        query = {"name": name, "username": username}
        if self.collection.count_documents(query) == 0:
            return None
        return self.collection.find_one(query, {"_id":0, "username":0})

    def update(self, name: str, username: str, new_vals: dict) -> bool:
        query = {"name": name, "username": username}
        if self.collection.count_documents(query) == 0:
            return False
        new_vals = {"$set": new_vals}
        self.collection.update_one(query, new_vals)
        return True

    def add(self, new_vals: dict) -> bool:
        query = {"name": new_vals["name"], "username": new_vals["username"]}
        if self.collection.count_documents(query) > 0:
            return False
        self.collection.insert_one(new_vals)
        return True

    def remove(self, name: str, username: str) -> bool:
        query = {"name": name, "username": username}
        if self.collection.count_documents(query) == 0:
            return False
        self.collection.delete_one(query)
        return True

    def __init__(self):
        # self.client = pymongo.MongoClient("mongodb://localhost:27017/")
        self.client = pymongo.MongoClient("mongodb+srv://%s:%s@cluster0-wkcgm.mongodb.net/mycroft?retryWrites=true&w=majority"
            % (os.environ['MONGO_USERNAME'], os.environ['MONGO_PASSWORD']))
        self.database = self.client["mycroft"]