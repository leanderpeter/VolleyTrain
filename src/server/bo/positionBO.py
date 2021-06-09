
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
    
    def setXPosition(self, x):
        self._x = x

    def setYPosition(self, y):
        self._y = y

    def getXPosition(self):
        return _x

    def getYPosition(self):
        return _y

    def __str__(self):
        return "Position: {}, {}, {}".format(self.getId(),self._x, self._y)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a position object
        '''

        obj = Position()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setXPosition(dictionary["x"])
        obj.setYPosition(dictionary["y"])
        return obj