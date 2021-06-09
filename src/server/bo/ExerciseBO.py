from server.bo.NamedBusinessObject import NamedBusinessObject


class Exercise(NamedBusinessObject):
    """Exercise Business Object
    has following properties
    tag
    duration
    """
    def __init__(self):
        super().__init__()
        self._duration = None
        self._training = None
        self._description= None
        self._notes = None
        self._goal = None

    def setDuration(self, duration):
        self._duration = duration

    def getDuration(self):  
        return self._duration
  
    def setTraining(self, training):
        self._training = training

    def getTraining(self):
        return self._training

    def setDescription(self, description):
        self._description = description

    def getDescription(self):
        return self._description

    def setNotes(self, notes):
        self._notes = notes

    def getNotes(self):
        return self._notes
    
    def setGoal(self, goal):
        self._goal = goal

    def getGoal(self):
        return self._goal

    def __str__(self):
        return "Exercise: {} {} {} {} {} {}".format(self.getId(), self.getName(), self.getDescription(), self.getNotes(), self.getDuration(), self.getTraining(), self.getGoal())

    @staticmethod
    def from_dict(dictionary=dict()):
        ''' turn a python dict into a user object
        '''

        obj = Exercise()
        obj.setId(dictionary["id"])  # part of the Business object mother class
        obj.setName(dictionary["name"])
        obj.setDescription(dictionary["description"])
        obj.setDuration(dictionary["duration"])
        obj.setTraining(dictionary["training"])
        obj.setNotes(dictionary["notes"])
        obj.setGoal(dictionary["goal"])
        
        return obj
