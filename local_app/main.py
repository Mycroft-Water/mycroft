import requests
import json

from trigger import ScheduleTrigger, KeyboardTrigger
from operation import StartZoomLink, OpenLink, PrintSomething
from task import Task


class Main:
    def authenticate(self, username: str, password: str) -> bool:
        req_data = {"username": username, "password": password}
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        req_url = "%s/api/login" % (self.url)
        response = requests.post(url=req_url, data=json.dumps(req_data), headers=headers)
        if response.status_code != 200:
            print("Incorrect username or password.")
            return False
        parsed = json.loads(response.text)
        self.access_token = parsed["access_token"]
        return True

    def get_triggers(self) -> bool:
        req_url = "%s/api/triggers" % (self.url)
        headers = {'Authorization': 'Bearer ' + self.access_token, 'Accept': 'text/plain'}
        response = requests.get(url=req_url, headers=headers)
        if response.status_code != 200:
            print("Could not get triggers")
            return False
        parsed = json.loads(response.text)
        triggers_dict = parsed["triggers"]
        for t in triggers_dict:
            if "type" not in t or "name" not in t:
                continue
            if t["type"] == "schedule":
                self.triggers[t['name']] = ScheduleTrigger(**t)
            elif t['type'] == 'keyboard':
                self.triggers[t['name']] = KeyboardTrigger(**t)
        return True

    def get_operations(self) -> bool:
        req_url = "%s/api/operations" % (self.url)
        headers = {'Authorization': 'Bearer ' + self.access_token, 'Accept': 'text/plain'}
        response = requests.get(url=req_url, headers=headers)
        if response.status_code != 200:
            print("Could not get operations")
            return False
        parsed = json.loads(response.text)
        operations_dict = parsed["operations"]
        for op in operations_dict:
            if "type" not in op or "name" not in op:
                continue
            if op["type"] == "zoom":
                self.operations[op['name']] = StartZoomLink(**op)
            elif op["type"] == "link":
                self.operations[op['name']] = OpenLink(**op)
            elif op["type"] == "print":
                self.operations[op['name']] = PrintSomething(**op)
        return True

    def get_tasks(self) -> bool:
        req_url = "%s/api/tasks" % (self.url)
        headers = {'Authorization': 'Bearer ' + self.access_token, 'Accept': 'text/plain'}
        response = requests.get(url=req_url, headers=headers)
        if response.status_code != 200:
            print("Could not get tasks")
            return False
        parsed = json.loads(response.text)
        tasks_dict = parsed["tasks"]
        for task in tasks_dict:
            if "triggers" not in task or "operations" not in task:
                continue
            new_task = Task(task, self.triggers, self.operations)
            self.tasks.append(new_task)
        return True

    def __init__(self):
        self.url = "https://mycroft-water.herokuapp.com"
        success = False
        while not success:
            username = input("Username: ")
            password = input("Password: ")
            success = self.authenticate(username, password)
        self.triggers = {}
        self.get_triggers()
        self.operations = {}
        self.get_operations()
        self.tasks = []
        self.get_tasks()
        if not self.tasks or not self.operations or not self.tasks:
            return
        for t in self.triggers.values():
            t.listen()
        print("Triggers started listening")


if __name__ == "__main__":
    Main()
