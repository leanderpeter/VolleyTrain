from server.bo.NamedBusinessObject import NamedBusinessObject


class Training (NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._goal = None
        self._team_id = None
        self._user_id = None

    def getGoal(self):
        return self._goal

    def setGoal(self, goal):
        self._goal = goal

    def getTeamId(self):
        return self._team_id

    def setTeamId(self, team_id):
        self._team_id = team_id

    def getUserId(self):
        return self._user_id

    def setUserId(self, user_id):
        self._user_id = user_id

    def __str__(self):
        return "Training: {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_creation_date, self.get_name(), self.getGoal(), self.getTeamId(), self.getUserId())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Training()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.setGoal(dictionary["goal"])
        obj.setTeamId(dictionary["team_id"])
        obj.setUserId(dictionary["user_id"])
        return obj
