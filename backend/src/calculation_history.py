from pydantic import BaseModel
from datetime import datetime

from db import Database

class CalculationHistory(BaseModel):
    user_ip: str
    vip_customer: bool
    price: float
    cashback: float
    calc_date: datetime | None = None


def insert_calculation(db: Database, calc_hist: CalculationHistory) -> CalculationHistory | None:
    with db.cursor() as cur:
        ch = calc_hist
        cur.execute('''
            INSERT INTO calculation_history (user_ip, vip_customer, price, cashback)
            VALUES (%s, %s, %s, %s)
            RETURNING calc_date
            ''',
            (ch.user_ip, ch.vip_customer, ch.price, ch.cashback)
        )
        res: tuple | None = cur.fetchone()

    if res is None:
        return None
    
    calc_hist.calc_date = res[0]
    return calc_hist


def get_all_calculations(db: Database, user_ip: str) -> list[CalculationHistory]:
    with db.cursor() as cur:
        cur.execute('''
            SELECT user_ip, vip_customer, price, cashback, calc_date
            FROM calculation_history
            WHERE user_ip = %s
            ''',
            (user_ip,)
        )
        rows: list[tuple] = cur.fetchall()
    
    return [
        CalculationHistory(
            user_ip=t[0],
            vip_customer=t[1],
            price=t[2],
            cashback=t[3],
            calc_date=t[4]
        ) for t in rows
    ]
    
        