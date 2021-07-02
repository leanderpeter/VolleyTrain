from contextlib import nullcontext
from server.bo.BusinessObject import BusinessObject
from datetime import datetime


class Trainingday(BusinessObject):

    def __init__(self):
        super().__init__()
        self._weekday = None
        self._starttime = datetime.time
        self._endtime = datetime.time
        self._team = None

    def set_weekday(self, day):
        self._weekday = day

    def get_weekday(self):
        return self._weekday

    def set_starttime(self, time):
        self._starttime = time

    def get_starttime(self):
        return self._starttime

    def set_endtime(self, time):
        self._endtime = time

    def get_endtime(self):
        return self._endtime

    def set_team(self, team):
        self._team = team

    def get_team(self):
        return self._team

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a trainingday object
        '''

        obj = Trainingday()
        # part of the Business object mother class
        obj.set_id(dictionary["id"])
        obj.set_weekday(dictionary["weekday"])
        obj.set_starttime(dictionary["starttime"])
        obj.set_endtime(dictionary["endtime"])
        obj.set_team(dictionary["team"])
        return obj
