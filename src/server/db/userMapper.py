from server.db.Mapper import Mapper
from server.bo.Person import User


class UserMapper(Mapper):
    """mapper class to insert/replace/change person object in the realtional database
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """find all person obj

        :return all person objs
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, name, email, googleUserId FROM users"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, googleUserId, rolle) in tuples:
            user = User()
            user.setId(id)
            user.setName(name)
            user.setEmail(email)
            user.setGoogleUserId(google_user_id)

            result.append(user)

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
        command = "SELECT id, name, email, google_user_id, rolle FROM users WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, rolle) = tuples[0]
            user = User()
            user.setId(id)
            user.setName(name)
            user.setEmail(email)
            user.setGoogleUserId(google_user_id)
            if rolle == "Dozent":
                user.set_rolle(user.ROLLE_DOZENT)
            elif rolle == "Admin":
                user.set_rolle(user.ROLLE_ADMIN) 
            result = user

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
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, rolle FROM users WHERE google_user_id='{}'".format(
                google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, rolle) = tuples[0]
            user = User()
            user.setId(id)
            user.setName(name)
            user.setEmail(email)
            user.setGoogleUserId(google_user_id)
            if rolle == "Dozent":
                user.set_rolle(user.ROLLE_DOZENT)
            elif rolle == "Admin":
                user.set_rolle(user.ROLLE_ADMIN) 
            result = user
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None
        return result

    def insert(self, user):
        """Einfügen eines user Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 

        :param user das zu speichernde user Objekt
        :return das bereits übergebene user Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM users ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                user.setId(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                user.setId(1)

        command = "INSERT INTO users (id, name, email, google_user_id, rolle) VALUES (%s,%s,%s,%s,%s)"
        data = (user.get_id(), user.get_name(), user.get_email(), user.get_google_user_id(), str(user.get_rolle()))
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return user

    def update(self, user):
        """Überschreiben / Aktualisieren eines user-Objekts in der DB

        :param user -> user-Objekt
        :return aktualisiertes user-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE users " + "SET name=%s, email=%s, rolle=%s WHERE google_user_id=%s"
        data = (user.get_name(), user.get_email(), str(user.get_rolle()), user.get_google_user_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update_by_id(self, user):
        """Überschreiben / Aktualisieren eines user-Objekts in der DB

        :param user -> user-Objekt
        :return aktualisiertes user-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE users " + "SET name=%s, email=%s, rolle=%s WHERE id=%s"
        data = (user.get_name(), user.get_email(), str(user.get_rolle()), user.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, user):
        """Löschen der Daten einer user aus der Datenbank

        :param user -> user-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM users WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def find_by_rolle(self, rolle):
        '''Finde alle useren mit gegebener Rolle
        :param rolle -> Rolle-String
        '''
        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, rolle FROM users WHERE rolle={}".format(str(rolle))
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


'''Only for testing purpose'''

if (__name__ == "__main__"):
    with UserMapper() as mapper:
        result = mapper.find_all()
        for user in result:
            print(user)
