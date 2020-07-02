import sys
from passlib.hash import pbkdf2_sha256

from dao.triggers_dao import TriggersDAO
from dao.operations_dao import OperationsDAO
from dao.tasks_dao import TasksDAO
from dao.users_dao import UsersDAO

class Controller:
    def validate_user(self, user: dict) -> (bool, str):
        if "username" not in user or "password" not in user:
            return False, "Invalid input"
        found_user = self.users.find(user["username"])
        if not user:
            return False, "Username does not exist"
        if not pbkdf2_sha256.verify(user["password"], found_user["password"]):
            return False, "Password incorrect"
        return True, ""

    def add_user(self, user: dict) -> (bool, str):
        if "username" not in user or "password" not in user:
            return False, "Invalid input"
        user["password"] = pbkdf2_sha256.hash(user["password"])
        user["id"] = user["username"]
        success = self.users.add(user)
        if not success:
            return False, "Username already exists"
        return True, ""

    def get_triggers(self, cur_user: str) -> list:
        return self.triggers.get_all(cur_user)

    def add_trigger(self, trigger: dict) -> (bool, str):
        success = self.triggers.add(trigger)
        if not success:
            return False, "Trigger already exist"
        return True, ""

    def set_trigger(self, name: str, cur_user: str, trigger: dict) -> (bool, str):
        if "name" in trigger and name != trigger["name"]:
            return False, "Invalid input"
        success = self.triggers.update(name, cur_user, trigger)
        if not success:
            return False, "No matching trigger found"
        return True, ""

    def get_trigger_by_name(self, name: str, cur_user: str) -> (dict, str):
        trigger = self.triggers.find(name, cur_user)
        if not trigger:
            return None, "No matching trigger found"
        return trigger, ""

    def delete_trigger(self, name: str, cur_user: str) -> (bool, str):
        success = self.triggers.remove(name, cur_user)
        if not success:
            return False, "No matching trigger found"
        return True, ""

    def get_operations(self, cur_user) -> list:
        return self.operations.get_all(cur_user)

    def add_operation(self, operation: dict) -> (bool, str):
        success = self.operations.add(operation)
        if not success:
            return False, "Operation already exists"
        return True, ""

    def set_operation(self, name: str, cur_user: str, operation: dict) -> (bool, str):
        if "name" in operation and name != operation["name"]:
            return False, "Invalid input"
        success = self.operations.update(name, cur_user, operation)
        if not success:
            return False, "No matching operation found"
        return True, ""

    def get_operation_by_name(self, name: str, cur_user: str) -> (dict, str):
        operation = self.operations.find(name, cur_user)
        if not operation:
            return None, "No matching operation found"
        return operation, ""

    def delete_operation(self, name: str, cur_user: str) -> (bool, str):
        success = self.operations.remove(name, cur_user)
        if not success:
            return False, "No matching operation found"
        return True, ""

    def get_tasks(self, cur_user: str) -> list:
        return self.tasks.get_all(cur_user)

    def add_task(self, task: dict) -> (bool, str):
        success = self.tasks.add(task)
        if not success:
            return False, "Task already exists"
        return True, ""

    def set_task(self, name: str, cur_user: str, task: dict) -> (bool, str):
        if "name" in task and name != task["name"]:
            return False, "Invalid input"
        success = self.tasks.update(name, cur_user, task)
        if not success:
            return False, "No matching task found"
        return True, ""

    def get_task_by_name(self, name: str, cur_user: str) -> (dict, str):
        task = self.tasks.find(name, cur_user)
        if not task:
            return None, "No matching task found"
        return task, ""

    def delete_task(self, name: str, cur_user: str) -> (bool, str):
        success = self.tasks.remove(name, cur_user)
        if not success:
            return False, "No matching task found"
        return True, ""

    def __init__(self):
        self.triggers = TriggersDAO()
        self.operations = OperationsDAO()
        self.tasks = TasksDAO()
        self.users = UsersDAO()


if __name__=="__main__":
    test = Controller()
    test.add_user({"password": "password", "username": "admin2"})
    test.add_trigger({"name": "trg3", "type": "time", "details": "5pm", "username": "admin2"})
    test.add_trigger({"name": "trg4", "type": "button", "details": "9pm", "username": "admin2"})
    for trg in test.get_triggers("admin2"):
        print(trg)
    print(test.get_trigger_by_name("trg3", "admin2"))