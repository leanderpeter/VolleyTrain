from server.db.mapper import Mapper
from server.bo.trainingdayBO import Trainingday


class TrainingdayMapper(Mapper):
    """mapper class to insert/replace/change Team object in the realtional database
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all trainingday obj

        :return all trainingday objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT * FROM trainingday"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, weekday, starttime, endtime, team) in tuples:
            trainingday = Trainingday()
            trainingday.setId(id)
            trainingday.setWeekday(weekday)
            trainingday.setStarttime(starttime)
            trainingday.setEndtime(endtime)
            trainingday.setTeam(team)

            result.append(trainingday)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_team_id(self, id):
        """find all trainingday obj

        :return all trainingday objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT * FROM trainingday WHERE team='{}'".format(id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, weekday, starttime, endtime, team) in tuples:
            trainingday = Trainingday()
            trainingday.setId(id)
            trainingday.setWeekday(weekday)
            trainingday.setStarttime(starttime)
            trainingday.setEndtime(endtime)
            trainingday.setTeam(team)

            result.append(trainingday)

        self._connection.commit()
        cursor.close()

        return result



    def find_by_id(self, id):
        """Suchen einer trainingday nach der übergebenen ID. 

        :param id Primärschlüsselattribut einer trainingday aus der Datenbank
        :return trainingday-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT * FROM trainingday WHERE PK_Trainingday='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            (id, weekday, starttime, endtime) = tuples[0]
            trainingday = Trainingday()
            trainingday.setId(id)
            trainingday.setWeekday(weekday)
            trainingday.setStarttime(starttime)
            trainingday.setEndtime(endtime)
            result = trainingday

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result


    def insert(self, trainingday):
        """Einfügen eines trainingday Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 

        :param trainingday das zu speichernde trainingday Objekt
        :return das bereits übergebene trainingday Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(PK_Trainingday) AS maxid FROM trainingday")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem trainingday-Objekt zu."""
                trainingday.setId(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                trainingday.setId(1)

        command = "INSERT INTO trainingday (PK_Trainingday, weekday, starttime, endtime, team) VALUES (%s,%s,%s,%s,%s)"
        data = (trainingday.getId(), trainingday.getWeekday(), trainingday.getStarttime(), trainingday.getEndtime(), trainingday.getTeam())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return trainingday


    def update(self):
        pass


    def delete(self):
        pass



'''Only for testing purpose'''

if (__name__ == "__main__"):
    with TrainingdayMapper() as mapper:
        result = mapper.find_all()
        for trainingday in result:
            print(trainingday)
