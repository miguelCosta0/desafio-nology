
def calc_cashback(price: float, vip_customer: bool) -> float:
    perc = cashback_percentage(vip_customer)

    cashback = price * perc

    if price > 500:
        cashback *= 2

    return round(cashback, 2)

def cashback_percentage(vip_customer: bool) -> float:
    perc = .05
    if vip_customer:
        perc += .10
    return perc