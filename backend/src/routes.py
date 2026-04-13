from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from db import Database
from calculation_history import CalculationHistory, insert_calculation, get_all_calculations
from calculate_cashback import calc_cashback

router = APIRouter()
db = Database()

@router.get('/cashback/')
async def get_cashback(price: float, vip_customer: bool, request: Request):
    user_ip: str = request.client.host
    
    cashback = calc_cashback(price, vip_customer)

    calc_hist: CalculationHistory | None = insert_calculation(
        db,
        CalculationHistory(
            user_ip=user_ip,
            vip_customer=vip_customer,
            price=price,
            cashback=cashback
        )
    )

    if calc_hist is None:
        return JSONResponse(status_code=500, content={'error': 'Could not calculate the cashback'})
    
    return {'cashback': cashback}

@router.get('/calculations/')
async def get_calculations(request: Request) -> list[CalculationHistory]:
    user_ip: str = request.client.host
    return get_all_calculations(db, user_ip)
