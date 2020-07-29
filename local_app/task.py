from dateutil import parser
import sys

import trigger
import operation
sys.path.append('../')
import mycroft.base as mc

    
class Task(mc.BaseDataObject):

    is_trigger = True

    def update(self, trigger_name: str):
        self.triggered_set.add(trigger_name)
        if len(self.triggered_set) >= len(self.triggers):
            self.triggered_set = set()
            self.run_pipeline()

    def run_pipeline(self):
        print("%s started pipeline" % (self.name))
        self.run_operations()

    def add_operation(self, operation: operation.Operation):
        self.pipeline.add_worker(operation)

    def build_operations(self, operation_doc, operation_dict):
        print(operation_doc)
        operations = {'operation': (operation_dict[operation_doc['operation']]) if operation_doc['operation'] else None, 'sub_operations': []}
        for sub_operation_doc in operation_doc['sub_operations']:
            operations['sub_operations'].append(self.build_operations(sub_operation_doc, operation_dict))
        return operations

    def run_operations(self):
        self.run_operation_node(self.operations)

    def run_operation_node(self, node):
        node['operation'].execute()
        for sub_operation_node in node['sub_operations']:
            self.run_operation_node(sub_operation_node)

    def __init__(self, task_doc, trigger_dict, operation_dict):
        self.name = task_doc['name']
        self.triggers = task_doc['triggers']
        for trigger_str in task_doc['triggers']:
            trigger = trigger_dict[trigger_str]
            trigger.subscribe(self)
        print(self.name)
        print(self.triggers)
        print(operation_dict)
        self.operations = self.build_operations(task_doc['operations'], operation_dict)
        self.triggered_set = set()

        # self.triggers = kwargs.get("triggers", [])
        # operations_dict = kwargs.get("operations", [])
        # self.pipeline = operation.OperationPipeline()
