from server.db.mapper import Mapper
from server.bo.PlayerBO import Player

class PlayerMapper(Mapper):
    """mapper class to insert/replace/change player object in the realtional database
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all player obj

        :return all player objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT PK_Player, name, role FROM players"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, role) in tuples:
            player = Player()
            player.setId(id)
            player.setName(name)
            player.setRole(role)

            result.append(player)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_role(self):
        pass

    def find_by_id(self, id):
        """Suchen eines player nach der übergebenen ID.

        :param id Primärschlüsselattribut eines player aus der Datenbank
        :return player-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT PK_Player, name, role FROM players WHERE PK_Player='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            (id, name, role) = tuples[0]
            player = Player()
            player.setId(id)
            player.setName(name)
            player.role(role)
            result = player

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

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

        command = "INSERT INTO players (PK_Player, name, role) VALUES (%s,%s,%s)"
        data = (player.getId(), player.getName(), player.getRole())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return player

    def update(self, player):
        """Überschreiben / Aktualisieren eines player-Objekts in der DB

        :param player -> player-Objekt
        :return aktualisiertes player-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE players " + "SET name=%s, role=%s"
        data = (player.getName(), player.getRole())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return player

    def delete(self, player):
        """Löschen der Daten einer player aus der Datenbank

        :param player -> player-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM players WHERE PK_Players={}".format(player.getId())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

        return player

'''Only for testing purpose'''

if (__name__ == "__main__"):
    with PlayerMapper() as mapper:
        result = mapper.find_all()
        for player in result:
            print(player)