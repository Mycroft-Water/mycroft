import pymongo
from dao.abstract_dao import DAO

class TasksDAO(DAO):
    def __init__(self):
        super().__init__()
        self.collection = self.database["tasks"]