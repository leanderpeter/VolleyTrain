from server.bo.BusinessObject import BusinessObject


class NamedBusinessObject(BusinessObject):
    '''Base class for all business objects with a name
    every business object can features a name
    '''

    def __init__(self):
        super().__init__()
        self._name = None

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = name
