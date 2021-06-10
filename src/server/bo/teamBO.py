from contextlib import nullcontext
from server.bo.NamedBusinessObject import NamedBusinessObject

class Team(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._trainer = None

    def setTrainer(self, trainer):
        self._trainer = trainer

    def getTrainer(self):
        return self._trainer
        

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a team object
        '''

        obj = Team()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setName(dictionary["name"])
        obj.setTrainer(dictionary["trainer"])
        return obj


    