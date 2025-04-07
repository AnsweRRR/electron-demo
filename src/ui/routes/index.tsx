import { useRoutes } from 'react-router-dom';

import {
  HomePage,
  MonitorPage,
} from './elements';

import { PATH_APP } from './paths';

export default function HashRouter() {
  return useRoutes([
    {
      path: PATH_APP.root,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'resources', element: <MonitorPage /> },
      ]
    }
  ]);
}

// export default function HashRouter() {
//   return useRoutes([
//     {
//       path: '/',
//       element: <Navigate to="/app" />,
//     },
//     {
//       path: '/app',
//       children: [
//         { index: true, element: <HomePage /> },
//         { path: 'resources', element: <MonitorPage /> },
//         { path: 'serialPorts', element: <div>Serial Page</div> },
//       ],
//     }
//   ]);
// }