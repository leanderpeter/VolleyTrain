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

        command = "SELECT PK_Player, surname, name, Team_PK_Team, role, t_number FROM player"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, surname, name, teamId, role, t_number) in tuples:
            player = Player()
            player.set_id(id)
            player.set_name(name)
            player.set_surname(surname)
            player.setTeamId(teamId)
            player.setRole(role)
            player.setT_number(t_number)

            result.append(player)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_id(self, id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM player WHERE PK_Player like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, surname, name, teamId, role, t_number) in tuples:
                player = Player()
                player.setId(id)
                player.setName(name)
                player.setSurname(surname)
                player.setTeamId(teamId)
                player.setRole(role)
                player.setT_number(t_number)

                result.append(player)

        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_teamid(self, teamId):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT * FROM player WHERE teamId like '{}'".format(teamId)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, surname, name, teamId, role, t_number) in tuples:
            player = Player()
            player.setId(id)
            player.setName(name)
            player.setSurname(surname)
            player.setTeamId(teamId)
            player.setRole(role)
            player.setT_number(t_number)

            result.append(player)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, player):
        """Einfügen eines Player Objekts in die DB
                Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft
                :param player das zu speichernde player Objekt
                :return das bereits übergebene player Objekt mit aktualisierten Daten (id)
                """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(PK_Player) AS maxid FROM player")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                player.setId(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                player.setId(1)

        command = "INSERT INTO player (PK_Player, surname, name, Team_PK_Team, role, t_number) " \
                  "VALUES (%s,%s,%s,%s,%s,%s)"
        data = (player.getId(), player.getSurname(), player.getName(), player.getTeamId(),
                player.getRole(), player.getT_number())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return player

    def update(self, player):
        """Überschreiben / Aktualisieren eines Player-Objekts in der DB

        :return aktualisiertes team-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE player SET surname=%s, SET name=%s, SET Team_PK_Team=%s, " \
            "role=%s, t_number=%s WHERE PK_Player=%s" \
            .format(player.getId(), player.getSurname(), player.getName(), player.getTeamId(), player.getRole(),
                    player.getT_number())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update_by_id(self, player):
        pass

    def delete(self, player):
        """Löschen der Daten eines Player aus der Datenbank

        """
        cursor = self._connection.cursor()

        command = "DELETE FROM player WHERE PK_Player={}".format(
            player.getId())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
        return player


'''Only for testing purpose'''

"""
if (__name__ == "__main__"):
    with PlayerMapper() as mapper:
        result = mapper.find_all()
        for user in result:
            print(user)
"""
"""
if (__name__ == "__main__"):
    with PlayerMapper() as mapper:
        user = mapper.find_by_id(1)
        for i in user:
            print(i.getName())
"""
"""
if (__name__ == "__main__"):
    with PlayerMapper() as mapper:
        user = mapper.find_by_id(8)
        for i in user:
            mapper.delete(i)
"""
