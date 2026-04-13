import os
from time import sleep
import psycopg
from psycopg import Connection, Cursor

class Database:

    def __init__(self):
        self.conn: Connection = None
        self.connect(autocommit=True)

    def cursor(self) -> Cursor:
        return self.conn.cursor()

    def connect(self, autocommit: bool = True):
        n = 10
        for attempt in range(n + 1):
            if attempt == n:
                raise ConnectionError(fr'Could not connect to the database')

            try:
                self.conn = psycopg.connect(
                    user=os.environ["DB_USER"],
                    password=os.environ["DB_PASSWORD"],
                    host=os.environ["DB_HOST"],
                    port=os.environ["DB_PORT"],
                    dbname=os.environ["API_DB"],
                    autocommit=autocommit
                )
            except Exception:
                sleep(1)
            
            if self.conn is not None:
                break
    