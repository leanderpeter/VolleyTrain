from server.db.mapper import Mapper
from server.bo.playerBO import Player


class PlayerMapper(Mapper):
    """mapper class to insert/replace/change person object in the realtional database
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all player entry
        :return all player objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT PK_Player, surname, name, Team_PK_Team FROM player"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, surname, name, team_id) in tuples:
            user = Player()
            user.set_id(id)
            user.set_name(name)
            user.set_surname(surname)
            user.setTeamId(team_id)

            result.append(user)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_id(self, id):
        pass

    def find_by_google_user_id(self, google_user_id):
        pass

    def insert(self, user):
        pass

    def update(self, user):
        pass

    def update_by_id(self, user):
        pass

    def delete(self, user):
        pass


'''Only for testing purpose'''

if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_all()
        for user in result:
            print(user)
