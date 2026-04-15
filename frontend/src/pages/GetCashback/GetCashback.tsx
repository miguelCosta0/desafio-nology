import { useState } from 'react';
import { TClientType } from '@types';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import './style.scss';


export default function InsertPage() {
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [clientType, setClientType] = useState<TClientType>('common');

    const [error, setError] = useState<string | null>(null);
    const [cashback, setCashback] = useState<number | null>(null);

    return (
        <Box className="cashback-page">
            <Typography variant='h3'> Calcular Cashback </Typography>
            <Paper className='form'>
                <Box>
                    <FormControl>
                        <FormLabel>Tipo de Cliente</FormLabel>
                        <RadioGroup
                            value={clientType}
                            onChange={(e) => { setClientType(e.target.value as TClientType) }}
                        >
                            <FormControlLabel value="common" control={<Radio />} label="Comum" />
                            <FormControlLabel value="vip" control={<Radio />} label="Vip" />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Box>
                    <TextField
                        onChange={(e) => setPrice(e.target.value.trim())}
                        label='Preço'
                        placeholder='Ex.: 199,50'
                        helperText='Campo obrigatório'
                    />
                </Box>

                <Box>
                    <TextField
                        onChange={(e) => setDiscount(e.target.value.trim())}
                        label='Desconto(%)'
                        placeholder='Ex.: 20%'
                    />
                </Box>

                <Button
                    onClick={handleSubmit}
                    disabled={!price}
                >
                    Enviar
                </Button>
            </Paper>

            <Paper className="response">
                {
                    error &&
                    <Alert variant="filled" severity="error">
                        <AlertTitle>ERRO</AlertTitle>
                        {error}
                    </Alert>
                }
                {
                    cashback !== null &&
                    <Alert variant="filled" severity="success">
                        <AlertTitle>Cashback</AlertTitle>
                        R${cashback.toFixed(2).replace('.', ',')}
                    </Alert>
                }
            </Paper>
        </Box>
    );

    async function handleSubmit() {
        const discountRegex = /^\d{1,2}([.,]\d+)?%?$/
        if (discount && !discount.match(discountRegex)) {
            setError('Desconto inválido.');
            setCashback(null);
            return;
        }
        const disc = discount ? parseInt(discount.replace('%', '').replace(',', '.')) : 0;

        const priceRegex = /^(R?\$)?\d+([.,]\d+)?$/
        if (!price.match(priceRegex)) {
            setError('Preço inválido.');
            setCashback(null);
            return;
        }
        const price_num = parseInt(price.replace(',', '.').replace(/R?\$/, ''));

        const final_price = price_num * (1 - disc / 100);

        if (final_price >= 1_000_000_000) {
            setError('Preço excedeu o valor máximo permitido. Escolha um valor menor.');
            setCashback(null);
            return;
        }

        try {
            console.log(`${process.env.API_URL}`);
            const res = await fetch(`${process.env.API_URL}/cashback/?price=${final_price}&vip_customer=${clientType === 'vip'}`);
            const data = await res.json()

            if (res.status < 200 || res.status >= 400 || data.cashback === undefined) {
                setError("Erro interno");
                setCashback(null);
                console.log(data);
                return;
            }

            setCashback(data.cashback);
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            setCashback(null);
            console.log(e);
        }
    }

};
