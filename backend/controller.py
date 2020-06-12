import sys

from dao.triggers_dao import TriggersDAO

class Controller:
    def get_triggers(self) -> list:
        return self.triggers.get_all()

    def add_trigger(self, trigger: dict) -> bool:
        return self.triggers.add(trigger)

    def set_trigger(self, trigger: dict) -> bool:
        name = trigger["name"]
        return self.triggers.update(name, trigger)

    def get_trigger_by_name(self, name: str) -> dict:
        return self.triggers.find(name)

    def delete_trigger(self, name: str) -> bool:
        return self.triggers.remove(name)

    def __init__(self):
        self.triggers = TriggersDAO()


if __name__=="__main__":
    test = Controller()
    test.add_trigger({"name": "trg1", "type": "time", "details": "5pm"})
    test.add_trigger({"name": "trg2", "type": "button", "details": "9pm"})
    for trg in test.get_triggers():
        print(trg)
    print(test.get_trigger_by_name("trg1"))
    