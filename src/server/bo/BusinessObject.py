
from abc import ABC, abstractmethod
from datetime import datetime

class BusinessObject(ABC):
    '''Base class for all business objects
    every business object features an identification and a time stamp
    '''

    def __init__(self):
        self._id = 0
        self._creation_date = datetime.now()

    def getId(self):
        return self._id
    
    def setId(self, new_id):
        self._id = new_id
    
    def setCreationDate(self, date):
        self._creation_date = date
    
    def getCreationDate(self):
        return self._creation_date