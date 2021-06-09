from contextlib import nullcontext
from server.bo.BusinessObject import BusinessObject
from datetime import datetime

class Trainingday(BusinessObject):

    def __init__(self):
        super().__init__()
        self._weekday = None
        self._starttime = datetime.time
        self._endtime = datetime.time

    def setWeekday(self, day):
        self._weekday = day

    def getWeekday(self):
        return self._weekday

    def setStarttime(self, time):
        self._starttime = time

    def getStarttime(self):
        return self._starttime

    def setEndtime(self, time):
        self._endtime = time

    def getEndtime(self):
        return self._endtime

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a team object
        '''

        obj = Trainingday()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setWeekday(dictionary["weekday"])
        obj.setStarttime(dictionary["starttime"])
        obj.setEndtime(dictionary["endtime"])
        return obj


    