from server.db.mapper import Mapper
from server.bo.teamBO import Team


class TeamMapper(Mapper):
    """mapper class to insert/replace/change Team object in the realtional database
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all team obj

        :return all team objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT * FROM team"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, trainer) in tuples:
            team = Team()
            team.setId(id)
            team.setName(name)
            team.setTrainer(trainer)

            result.append(team)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen einer team nach der übergebenen ID. 

        :param id Primärschlüsselattribut einer team aus der Datenbank
        :return team-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM team WHERE name='{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            (id, name, trainer) = tuples[0]
            team = Team()
            team.setId(id)
            team.setName(name)
            team.setTrainer(trainer)

            result = team

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result


    def find_by_id(self, id):
        """Suchen einer team nach der übergebenen ID. 

        :param id Primärschlüsselattribut einer team aus der Datenbank
        :return team-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM team WHERE PK_Team='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        for (id, name, trainer) in tuples:
            team = Team()
            team.setId(id)
            team.setName(name)
            team.setTrainer(trainer)

            result.append(team)

        self._connection.commit()
        cursor.close()

        return result


    def insert(self, team):
        """Einfügen eines team Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 

        :param team das zu speichernde team Objekt
        :return das bereits übergebene team Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(PK_Team) AS maxid FROM team ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem team-Objekt zu."""
                team.setId(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                team.setId(1)

        command = "INSERT INTO team (PK_Team, name, trainer) VALUES (%s,%s,%s)"
        data = (team.getId(), team.getName(), team.getTrainer())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return team


    def update(self, team):
        """Überschreiben / Aktualisieren eines team-Objekts in der DB

        :param team -> team-Objekt
        :return aktualisiertes team-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE team " + "SET name=%s, trainer=%s WHERE PK_Team=%s"
        data = (team.getName(), team.getTrainer(), team.getId())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()


    def delete(self, team):
        """Löschen der Daten einer team aus der Datenbank

        :param team -> team-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM team WHERE PK_Team={}".format(team.getId())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
        return team



'''Only for testing purpose'''

if (__name__ == "__main__"):
    with TeamMapper() as mapper:
        result = mapper.find_all()
        for team in result:
            print(team)
