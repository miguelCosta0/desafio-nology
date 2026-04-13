import { TCalculationsHistory } from "@types";

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

export type CalculationsTableProps = {
  data: TCalculationsHistory[],
};

const columns = ["IP do Usuário", "Preço", "Tipo de Cliente", "Cashback", "Data da Consulta"];

// data.length > 0 !
export default function CalculationsTable({ data }: CalculationsTableProps) {

  return (
    <TableContainer component={Paper}>
      <Table align='center'>
        <TableHead>
          <TableRow>
            {
              columns.map((col, idx) => (
                <TableCell key={idx} align='center'>{col}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell key={0} align='center'>
                  {row.user_ip}
                </TableCell>
                <TableCell key={1} align='center'>
                  R${row.price.toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell key={2} align='center'>
                  {row.vip_customer ? 'Vip' : 'Comum'}
                </TableCell>
                <TableCell key={3} align='center'>
                  R${row.cashback.toFixed(2).replace('.', ',')}
                </TableCell>
                <TableCell key={4} align='center'>
                  {
                    new Date(row.calc_date + 'Z').toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      dateStyle: 'short',
                      timeStyle: 'short'
                    })
                  }
                </TableCell>

              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
