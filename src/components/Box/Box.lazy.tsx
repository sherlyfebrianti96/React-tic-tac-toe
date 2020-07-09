import React, { lazy, Suspense } from 'react';
import {BoxType} from "../../types/BoxType";

const LazyBox = lazy(() => import('./Box'));

const Box = (props: BoxType & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBox {...props} />
  </Suspense>
);

export default Box;
