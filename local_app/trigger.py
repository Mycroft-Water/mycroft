from dateutil import parser
import sys
import schedule
import time
import threading
import keyboard
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

sys.path.append('../')
import mycroft.base as mc


class Trigger(mc.BaseDataObject):
    is_trigger = True

    def listen(self):
        pass

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify_subscribers(self):
        logger.info("{} triggered".format(self.name))
        for s in self.subscribers:
            s.update(self.name)

    def __init__(self, name, *children, **kwargs):
        super().__init__(name, *children, **kwargs)
        self.subscribers = []


class ScheduleTrigger(Trigger):
    is_schedule = True

    def listen(self):
        repeat = self.get_param('repeat')
        time_string = self.get_param('time')
        dt = parser.parse(time_string)
        if repeat == 'week':
            days = self.get_param('days')
        elif repeat == 'day':
            schedule.every().day.at(dt.strftime('%H:%M')).do(self.notify_subscribers)
        else:
            schedule.at(dt.strftime('%H:%M')).do(self.notify_subscribers)

        def work_thread():
            while True:
                schedule.run_pending()
                time.sleep(1)

        if not self.job_thread:
            self.job_thread = threading.Thread(target=work_thread)
            self.job_thread.start()

    def __init__(self, name, *children, **kwargs):
        super().__init__(name, *children, **kwargs)
        self.job_thread = None


class KeyboardTrigger(Trigger):
    def __init__(self, name, *children, **kwargs):
        super().__init__(name, *children, **kwargs)
        self.job_thread = None

    def listen(self):
        def work_thread(key):
            keyboard.add_hotkey(key, self.notify_subscribers)
            keyboard.wait()

        if not self.job_thread:
            self.job_thread = threading.Thread(target=work_thread, args=(self.get_param('key')))
            self.job_thread.start()
