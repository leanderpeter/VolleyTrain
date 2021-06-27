#!/usr/bin/python
# -*- coding: utf-8 -*-
import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper(AbstractContextManager, ABC):
    """Abstract base class for all mapper classes"""

    def __init__(self):
        self._connection = None

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._connection = connector.connect(user='root', password='root',
                                                 unix_socket='/cloudsql/wahlfachapp:europe-west3:wahlfachdb',
                                                 database='volleytrain')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._connection = connector.connect(user='root', password='root',
                                                 host='127.0.0.1',
                                                 database='volleytrain')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):

        """In order to close the connection we use the following statement. For example we quit working with the mapper class for now"""
        self._connection.close()

    """The following functions should be inherited by all Mapper-Subclasses"""

    @abstractmethod
    def find_all(self):
        """Reads all tuple and returns them as an object"""
        pass

    @abstractmethod
    def find_by_id(self, id):
        """Reads a tuple with a given ID"""
        pass

    @abstractmethod
    def insert(self, object):
        """Add the given object to the database"""
        pass

    @abstractmethod
    def update(self, object):
        """Update an already given object in the DB"""
        pass

    @abstractmethod
    def delete(self, object):
        """Delete an object from the DB"""
        pass
