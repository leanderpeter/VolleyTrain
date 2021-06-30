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
        self._surname = ""
        self._teamid = 0
        self._role = ""
        self._t_number = 0

    def set_teamid(self, new_teamid):
        self._teamid = new_teamid

    def get_teamid(self):
        return self._teamid

    def set_surname(self, surname):
        self._surname = surname

    def get_surname(self):
        return self._surname

    def set_role(self, new_role):
        self._role = new_role

    def get_role(self):
        return self._role

    def set_t_number(self, new_t_number):
        self._t_number = new_t_number

    def get_t_number(self):
        return self._t_number

    def __str__(self):
        return "Player: {}, {}, {}, {}, {}, {}".format(self.get_id(), self._surname, self._name, self._teamid,
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
        player.set_teamid(dictionary["teamid"])
        player.set_role(dictionary["role"])
        player.set_t_number(dictionary["t_number"])
        return player
