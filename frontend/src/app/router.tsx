import { createBrowserRouter } from 'react-router';

import Layout from '@components/Layout/Layout';
import Redirect from '@components/Redirect/Redirect';
import Historico from '@pages/Historico/Historico';
import GetCashback from '@pages/GetCashback/GetCashback';

const router = createBrowserRouter([
    {
        element: <Layout />,

        children: [
            {
                path: '/cashback',
                element: <GetCashback />,
            },
            {
                path: '/historico',
                element: <Historico />,
            },
            {
                path: '*',
                element: <Redirect />,
            },
        ],
    },
]);

export default router;
