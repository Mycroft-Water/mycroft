import sys

from dao.triggers_dao import TriggersDAO
from dao.operations_dao import OperationsDAO
from dao.tasks_dao import TasksDAO

class Controller:
    def get_triggers(self) -> list:
        return self.triggers.get_all()

    def add_trigger(self, trigger: dict) -> (bool, str):
        success = self.triggers.add(trigger)
        if not success:
            return False, "Trigger already exist"
        return True, ""

    def set_trigger(self, name: str, trigger: dict) -> (bool, str):
        if name != trigger["name"]:
            return False, "Invalid input"
        success = self.triggers.update(name, trigger)
        if not success:
            return False, "No matching trigger found"
        return True, ""

    def get_trigger_by_name(self, name: str) -> (dict, str):
        trigger = self.triggers.find(name)
        if not trigger:
            return None, "No matching trigger found"
        return trigger, ""

    def delete_trigger(self, name: str) -> (bool, str):
        success = self.triggers.remove(name)
        if not success:
            return False, "No matching trigger found"
        return True, ""

    def get_operations(self) -> list:
        return self.operations.get_all()

    def add_operation(self, operation: dict) -> (bool, str):
        success = self.operations.add(operation)
        if not success:
            return False, "Operation already exists"
        return True, ""

    def set_operation(self, name: str, operation: dict) -> (bool, str):
        if name != operation["name"]:
            return False, "Invalid input"
        success = self.operations.update(name, operation)
        if not success:
            return False, "No matching operation found"
        return True, ""

    def get_operation_by_name(self, name: str) -> (dict, str):
        operation = self.operations.find(name)
        if not operation:
            return None, "No matching operation found"
        return operation, ""

    def delete_operation(self, name: str) -> (bool, str):
        success = self.operations.remove(name)
        if not success:
            return False, "No matching operation found"
        return True, ""

    def get_tasks(self) -> list:
        return self.tasks.get_all()

    def add_task(self, task: dict) -> (bool, str):
        success = self.tasks.add(task)
        if not success:
            return False, "Task already exists"
        return True, ""

    def set_task(self, name: str, task: dict) -> (bool, str):
        if name != task["name"]:
            return False, "Invalid input"
        success = self.tasks.update(name, task)
        if not success:
            return False, "No matching task found"
        return True, ""

    def get_task_by_name(self, name: str) -> (dict, str):
        task = self.tasks.find(name)
        if not task:
            return None, "No matching task found"
        return task, ""

    def delete_task(self, name: str) -> (bool, str):
        success = self.tasks.remove(name)
        if not success:
            return False, "No matching task found"
        return True, ""

    def __init__(self):
        self.triggers = TriggersDAO()
        self.operations = OperationsDAO()
        self.tasks = TasksDAO()


if __name__=="__main__":
    test = Controller()
    test.add_trigger({"name": "trg1", "type": "time", "details": "5pm"})
    test.add_trigger({"name": "trg2", "type": "button", "details": "9pm"})
    for trg in test.get_triggers():
        print(trg)
    print(test.get_trigger_by_name("trg1"))
    