from server.db.mapper import Mapper
from server.bo.positionBO import Position


class PositionMapper(Mapper):
    """mapper class to insert/replace/change positions object in the realtional database
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all positions obj

        :return all positions objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT PK_Position, x, y FROM position"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, x, y) in tuples:
            pos = Position()
            pos.setId(id)
            pos.setXPosition(x)
            pos.setYPosition(y)
            result.append(pos)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_id(self, id):
        """Suchen einer user nach der übergebenen ID. 

        :param id Primärschlüsselattribut einer user aus der Datenbank
        :return user-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM position WHERE Matchfield_PK_Matchfield='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            pass
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_google_user_id(self, google_user_id):
        """Suchen einer user nach der übergebenen Google User ID. 

        :param google_user_id Google User ID einer user aus der Datenbank
        :return user-Objekt, welche mit der Google User ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        pass

    def insert(self, user):
        """Einfügen eines user Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 

        :param user das zu speichernde user Objekt
        :return das bereits übergebene user Objekt mit aktualisierten Daten (id)
        """
        pass

    def update(self, user):
        """Überschreiben / Aktualisieren eines user-Objekts in der DB

        :param user -> user-Objekt
        :return aktualisiertes user-Objekt
        """
        pass

    def update_by_id(self, user):
        """Überschreiben / Aktualisieren eines user-Objekts in der DB

        :param user -> user-Objekt
        :return aktualisiertes user-Objekt
        """
        pass

    def delete(self, user):
        """Löschen der Daten einer user aus der Datenbank

        :param user -> user-Objekt
        """
        pass



'''Only for testing purpose'''

if (__name__ == "__main__"):
    with PositionMapper() as mapper:
        result = mapper.find_all()
        for user in result:
            print(user)
