import pymongo
from .abstract_dao import DAO

class TriggersDAO(DAO):
    def __init__(self):
        super().__init__()
        self.collection = self.database["triggers"]