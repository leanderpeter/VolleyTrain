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
        self._t_number = 0

    def setRole(self, role):
        self._role = role

    def getRole(self):
        return self._role

    def setT_number(self, t_number):
        self._t_number = t_number

    def getT_number(self):
        return self._t_number

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Player()
        obj.setId(dictionary["id"])
        obj.setName(dictionary["name"])
        obj.setRole(dictionary["role"])
        obj.setT_number(dictionary["t_number"])
        return obj