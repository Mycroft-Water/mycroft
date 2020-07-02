import sys
import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

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

    def __init__(self, name, **kwargs ):
        super().__init__(name, **kwargs)

class StartZoomLink(Operation):

    def execute(self):
        driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get(self.get_param('zoom_link'))
        time.sleep(30)
        driver.quit()

    def __init__(self, name, **kwargs):
        super().__init__(name, **kwargs)
        if not 'zoom_link' in kwargs:
            self.set_params(zoom_link='https://zoom.us')

if __name__ == "__main__":
    zoom_op = StartZoomLink("op1", zoom_link="https://cmu.zoom.us/j/99411274169?pwd=R3AraFlQNkhxWjQrL0R0RUVvYmx2Zz09")
    zoom_op.execute()
        