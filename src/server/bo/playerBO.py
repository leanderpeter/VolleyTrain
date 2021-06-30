from server.bo.NamedBusinessObject import NamedBusinessObject


class Player(NamedBusinessObject):
    '''person Business Object 
    person has following properties:
    email
    google user id
    ----
    '''

    def __init__(self):
        super().__init__()
        self._surname = None
        self._teamId = None
        self._role = None
        self._t_number = 0

    def setTeamId(self, new_teamId):
        self._teamId = new_teamId

    def getTeamId(self):
        return self._teamId

    def set_surname(self, sname):
        self._surname = sname

    def get_surname(self):
        return self._surname

    def setRole(self, new_role):
        self._role = new_role

    def getRole(self):
        return self._role

    def setT_number(self, new_t_number):
        self._t_number = new_t_number

    def getT_number(self):
        return self._t_number

    def __str__(self):
        return "Player: {}, {}, {}, {}, {}, {}".format(self.get_id(), self._surname, self._name, self._teamId,
                                                       self._role, self._t_number)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        player = Player()
        # part of the Business object mother class
        player.set_id(dictionary["id"])
        player.set_surname(dictionary["surname"])
        player.set_name(dictionary["name"])
        player.setTeamId(dictionary["teamId"])
        player.setRole(dictionary["role"])
        player.setT_number(dictionary["t_number"])
        return player
