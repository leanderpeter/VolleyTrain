from contextlib import nullcontext
from server.bo.NamedBusinessObject import NamedBusinessObject

class Team(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._trainingsday = None
        self._addDayOne = None
        self._addDayTwo = None
        self._addDayThree = None

    def setTrainingsday(self, day):
        self._trainingsday = day

    def getTrainingsday(self):
        return self._trainingsday

    def setAddDayOne(self, day):
        self._addDayOne = day

    def getAddDayOne(self):
        return self._addDayOne

    def setAddDayTwo(self, day):
        self._addDayTwo = day

    def getAddDayTwo(self):
        return self._addDayTwo

    def setAddDayThree(self, day):
        self._addDayThree = day

    def getAddDayThree(self):
        return self._addDayThree

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a team object
        '''

        obj = Team()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setName(dictionary["name"])
        obj.setTrainingsday(dictionary["trainingsday"])
        obj.setAddDayOne(dictionary["addDayOne"])
        obj.setAddDayTwo(dictionary["addDayTwo"])
        obj.setAddDayThree(dictionary["addDayThree"])
        return obj


    