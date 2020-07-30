import sys
import webbrowser

sys.path.append('../')
import mycroft.base as mc


class OperationPipeline(mc.Pipeline):

    def add_worker(self, worker: mc.BaseWorker):
        self.workers.append(worker)

    def execute(self):
        for w in self.workers:
            w.execute()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class Operation(mc.BaseWorker):
    is_operation = True

    def __init__(self, name, **kwargs):
        super().__init__(name, **kwargs)


class StartZoomLink(Operation):

    def execute(self):
        webbrowser.open(self.get_param('link'))

    def __init__(self, name, **kwargs):
        super().__init__(name, **kwargs)
        if not 'link' in kwargs:
            self.set_params(link='https://zoom.us')


class OpenLink(Operation):
    def execute(self):
        webbrowser.open(self.get_param('link'))

    def __init__(self, name, **kwargs):
        super().__init__(name, **kwargs)


class PrintSomething(Operation):
    def execute(self):
        print(self.get_param('content'))

    def __init__(self, name, **kwargs):
        super().__init__(name, **kwargs)


if __name__ == "__main__":
    zoom_op = StartZoomLink("op1", link="https://cmu.zoom.us/j/99411274169?pwd=R3AraFlQNkhxWjQrL0R0RUVvYmx2Zz09")
    zoom_op.execute()
