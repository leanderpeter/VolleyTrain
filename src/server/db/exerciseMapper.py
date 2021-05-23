from server.db.mapper import Mapper
from server.bo.exceriseBO import Exercise


class ExerciseMapper(Mapper):
    """mapper class to insert/replace/change person object in the realtional database"""

    def __init__(self):
        super.__init__()

    def find_all(self):
        """find all exercise obj

        :return all exercise objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT PK_Exercise, name, tag, duration FROM users"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, tag, duration) in tuples:
            exercise = Exercise()
            exercise.setId(id)
            exercise.setName(name)
            exercise.setTag(tag)
            exercise.setDuration(duration)

            result.append(exercise)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_id(self, id):
        """Suchen einer exercise nach der übergebenen ID.

        :param id Primärschlüsselattribut einer user aus der Datenbank
        :return exercise-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT PK_exercise, name, tag, duration FROM exercise WHERE PK_exercise='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            (id, name, tag, duration) = tuples[0]
            exercise = Exercise()
            exercise.setId(id)
            exercise.setName(name)
            exercise.setEmail(tag)
            exercise.setGoogleUserId(duration)
            result = exercise

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, exercise):
        """Einfügen eines user Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft

        :param exercise das zu speichernde user Objekt
        :return das bereits übergebene user Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(PK_exercise) AS maxid FROM exercise ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem exercise-Objekt zu."""
                exercise.setId(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                exercise.setId(1)

        command = "INSERT INTO users (PK_exercise, name, tag, duration) VALUES (%s,%s,%s,%s,%s)"
        data = (exercise.getId(),  exercise.getName(), exercise.getTag(), exercise.getDuration())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return exercise

   def update_by_id(self, exercise):
        """Überschreiben / Aktualisieren eines exercise-Objekts in der DB

        :param exercise -> exercise-Objekt
        :return aktualisiertes exercise-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE exercise " + "name=%s, tag=%s WHERE id=%s"
        data = (exercise.getName(), exercise.getTag, exercise.getDuration, exercise.getId())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, exercise):
        """Löschen der Daten einer exercise aus der Datenbank

        :param exercise -> exercise-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM exercise WHERE PK_exercise={}".format(exercise.getId())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
        return exercise

'''Only for testing purpose'''

if (__name__ == "__main__"):
    with ExerciseMapper() as mapper:
        result = mapper.find_all()
        for exercise in result:
            print(exercise)