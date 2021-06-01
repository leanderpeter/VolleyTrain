from contextlib import nullcontext
from server.bo.NamedBusinessObject import NamedBusinessObject

class Team(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._trainingsday = 0
        self._add_day_one = None
        self._add_day_two = None
        self._add_day_three = None

    def setTrainingsday(self, day):
        self._trainingsday = day

    def getTrainingsday(self):
        return self._trainingsday

    def setAddDayOne(self, day):
        self._add_day_one = day

    def getAddDayOne(self):
        return self._add_day_one

    def setAddDayTwo(self, day):
        self._add_day_two = day

    def getAddDayTwo(self):
        return self._add_day_two

    def setAddDayThree(self, day):
        self._add_day_three = day

    def getAddDayThree(self):
        return self._add_day_three

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a team object
        '''

        obj = Team()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setName(dictionary["name"])
        obj.setTrainingsday(dictionary["trainingsday"])
        obj.setAddDayOne(dictionary["add_day_one"])
        obj.setAddDayTwo(dictionary["add_day_two"])
        obj.setAddDayThree(dictionary["add_day_three"])
        return obj


    