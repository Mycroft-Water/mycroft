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
        self.pipeline.execute()

    def add_operation(self, operation: operation.Operation):
        self.pipeline.add_worker(operation)

    def __init__(self, name, *children, **kwargs ):
        super().__init__(name, *children, **kwargs)
        self.triggers = kwargs.get("triggers", [])
        self.triggered_set = set()
        operations_dict = kwargs.get("operations", [])
        self.pipeline = operation.OperationPipeline()
