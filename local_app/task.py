import sys

from multiprocessing import Pool
import operation

sys.path.append('../')
import mycroft.base as mc
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class Task(mc.BaseDataObject):
    is_trigger = True

    def update(self, trigger_name: str):
        self.triggered_set.add(trigger_name)
        if len(self.triggered_set) >= len(self.triggers):
            self.triggered_set = set()
            self.run_pipeline()

    def run_pipeline(self):
        logger.info("{} started pipeline".format(self.name))
        self.run_operations()

    def add_operation(self, operation: operation.Operation):
        self.pipeline.add_worker(operation)

    def build_operations(self, operation_doc, operation_dict):
        operations = {'operation': (operation_dict[operation_doc['operation']]) if operation_doc['operation'] else None,
                      'sub_operations': []}
        for sub_operation_doc in operation_doc['sub_operations']:
            operations['sub_operations'].append(self.build_operations(sub_operation_doc, operation_dict))
        return operations

    def run_operations(self):
        self.run_operation_node(self.operations)

    def run_operation_node(self, node):
        logger.info('run operation {} in task {}'.format(node['operation'], self.name))
        if node['operation']:
            node['operation'].execute()
        sub_operations = node['sub_operations']
        if sub_operations:
            if len(sub_operations) == 1:
                self.run_operation_node(sub_operations[0])
            else:
                sub_operation_pool = Pool(len(sub_operations))
                for sub_operation in sub_operations:
                    sub_operation_pool.apply_async(self.run_operation_node, args=(sub_operation,))
                sub_operation_pool.close()
                sub_operation_pool.join()
                logger.info('waiting for {} sub operations of task {}......'.format(len(sub_operations), self.name))
        # for sub_operation_node in node['sub_operations']:
        #     self.run_operation_node(sub_operation_node)

    def __init__(self, task_doc, trigger_dict, operation_dict):
        self.name = task_doc['name']
        self.triggers = task_doc['triggers']
        for trigger_str in task_doc['triggers']:
            trigger = trigger_dict[trigger_str]
            trigger.subscribe(self)
        self.operations = self.build_operations(task_doc['operations'], operation_dict)
        self.triggered_set = set()

        # self.triggers = kwargs.get("triggers", [])
        # operations_dict = kwargs.get("operations", [])
        # self.pipeline = operation.OperationPipeline()
