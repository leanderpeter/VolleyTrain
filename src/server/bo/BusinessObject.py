
from abc import ABC, abstractmethod
import datetime

class BusinessObject(ABC):
    '''Base class for all business objects
    every business object features an identification and a time stamp
    '''

    def __init__(self):
        self._id = 0
        self._creationDate = datetime.datetime()

    def getId(self):
        return self._id
    
    def setId(self, id):
        self._id = id
    
    def setCreationDate(self, date):
        self._creationDate = date
    
    def getCreationDate(self):
        return self._creationDate