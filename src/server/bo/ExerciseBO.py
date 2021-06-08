from server.bo.NamedBusinessObject import NamedBusinessObject


class Exercise(NamedBusinessObject):
    """Exercise Business Object
    has following properties
    tag
    duration
    """
    def __init__(self):
        super.__init__()
        self._tag = None
        self._duration = None
        self._training = None

    def setTag(self, tag):
        self._tag = tag

    def getTag(self):
        return self._tag

    def setDuration(self, duration):
        self._duration = duration

    def getDuration(self):  
        return self._duration
  
    def setTraining(self, training):
        self._training = training

    def getTraining(self):
        return self._training

    def __str__(self):
        return "Exercise: {} {} {} {}".format(self._getID(), self._name, self._tag, self._duration)

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Exercise()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setName(dictionary["name"])
        obj.setTag(dictionary["tag"])
        obj.setDuration(dictionary["duration"])
        obj.setTraining(dictionary["training"])
        
        return obj
