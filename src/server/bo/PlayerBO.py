from server.bo.NamedBusinessObject import NamedBusinessObject

class Player(NamedBusinessObject):
    '''Player Business Object
    Player has following properties:
    role
    ----
    '''

    def __init__(self):
        super().__init__()
        self._role = None

    def setRole(self, role):
        self._role = role

    def getRole(self):
        return self._role

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Player()
        obj.setRole(dictionary["role"])
        return obj