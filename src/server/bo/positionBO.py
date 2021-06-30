
from abc import ABC, abstractmethod


class Position(ABC):
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
        return self._x

    def getYPosition(self):
        return self._y
