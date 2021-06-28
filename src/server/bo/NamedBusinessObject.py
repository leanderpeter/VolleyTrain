from server.bo.BusinessObject import BusinessObject


class NamedBusinessObject(BusinessObject):
    '''Base class for all business objects with a name
    every business object can features a name
    '''

    def __init__(self):
        super().__init__()
        self._name = None 

    def getName(self):
        return self._name

    def setName(self, name):
        self._name = name
