
from server.bo.BusinessObject import BusinessObject

class Position(BusinessObject):
    '''Position Business Object 
    Position has following properties:
    x
    y
    ----
    '''

    def __init__(self):
        super().__init__()
        self._x = None
        self._y = None
    
    def setPosition(self, x, y):
        self._x = x
        self._y = y

    def getPosition(self):
        return (_x, _y)


    def __str__(self):
        return "Position: {}, {}, {}".format(self.getId(),self._x, self._y)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Position()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setPosition(dictionary["position"])
        return obj