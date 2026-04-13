import { useState, useEffect } from 'react';
import CalculationsTable from '@components/CalculationsTable/CalculationsTable';
import { TCalculationsHistory } from '@types';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import './style.scss';


export default function Historico() {
    const [data, setData] = useState<TCalculationsHistory[]>([]);

    useEffect(() => {
        getCalculations();
    }, []);

    return (
        <Box className="calculations-page">
            <Paper className='table1'>
                <Typography variant='h3'> Histórico </Typography>
                <CalculationsTable data={data} />
            </Paper>
        </Box>
    );


    async function getCalculations() {
        try {
            const res = await fetch(`${process.env.API_URL}/calculations/`);
            const data = await res.json()

            if (res.status < 200 || res.status >= 400) {
                console.log(data);
                return;
            }

            setData((data as Array<any>).reverse());
        } catch (e) {
            console.log(e);
        }
    }
};
