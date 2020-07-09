import React, { lazy, Suspense } from 'react';
import {BoardType} from "../../types/BoardType";

const LazyBoard = lazy(() => import('./Board'));

const Board = (props: BoardType & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBoard {...props} />
  </Suspense>
);

export default Board;
