
from abc import ABC, abstractmethod
from datetime import datetime


class BusinessObject(ABC):
    '''Base class for all business objects
    every business object features an identification and a time stamp
    '''

    def __init__(self):
        self._id = 0
        self._creation_date = datetime.now()

    def get_id(self):
        return self._id

    def set_id(self, id):
        self._id = id

    def set_creation_date(self, date):
        self._creation_date = date

    def get_creation_date(self):
        return self._creation_date
