import { Suspense, lazy, ElementType } from 'react';

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={<h1>Töltés...</h1>}>
    <Component {...props} />
  </Suspense>
);

export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const MonitorPage = Loadable(lazy(() => import('../pages/MonitorPage')));
export const SerialPortPage = Loadable(lazy(() => import('../pages/SerialPortPage')));