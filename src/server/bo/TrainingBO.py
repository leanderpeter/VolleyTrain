from server.bo.NamedBusinessObject import NamedBusinessObject


class Training (NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._datetime = None
        self._goal = None
        self._team_id = None
        self._user_id = None
        self._visibility = None

    def get_datetime(self):
        return self._datetime

    def set_datetime(self, datetime):
        self._datetime = datetime

    def get_goal(self):
        return self._goal

    def set_goal(self, goal):
        self._goal = goal

    def get_team_id(self):
        return self._team_id

    def set_team_id(self, team_id):
        self._team_id = team_id

    def get_user_id(self):
        return self._user_id

    def set_user_id(self, user_id):
        self._user_id = user_id

    def get_visibility(self):
        return self._visibility

    def set_visibility(self, visibility):
        self._visibility = visibility

    def __str__(self):
        return "Training: {}, {}, {}, {}, {}, {}, {}".format(
            self.get_id(),
            self.get_creation_date(),
            self.get_name(),
            self.get_datetime(),
            self.get_goal(),
            self.get_team_id(),
            self.get_user_id(),
            self.get_visibility())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Training()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_datetime(dictionary["datetime"])
        obj.set_goal(dictionary["goal"])
        obj.set_team_id(dictionary["team_id"])
        obj.set_user_id(dictionary["user_id"])
        obj.set_visibility(dictionary["visibility"])
        return obj
