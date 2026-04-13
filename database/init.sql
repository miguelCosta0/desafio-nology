CREATE TABLE IF NOT EXISTS "calculation_history" (
    id SERIAL PRIMARY KEY,
    user_ip VARCHAR(64) NOT NULL,
    vip_customer BOOLEAN NOT NULL,
    price NUMERIC(11, 2) NOT NULL, -- precision up to XXX XXX XXX.XX
    cashback NUMERIC(11, 2) NOT NULL,
    calc_date TIMESTAMP DEFAULT NOW()
);