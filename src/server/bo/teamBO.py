from contextlib import nullcontext
from server.bo.NamedBusinessObject import NamedBusinessObject


class Team(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._trainer = None

    def set_trainer(self, trainer):
        self._trainer = trainer

    def get_trainer(self):
        return self._trainer

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a team object
        '''

        obj = Team()
        # part of the Business object mother class
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_trainer(dictionary["trainer"])
        return obj
