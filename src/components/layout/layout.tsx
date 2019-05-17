import React, { PropsWithChildren } from 'react';
import { Header } from './header';

interface PresentationalProps {}

type Props = PropsWithChildren<PresentationalProps>;
export const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <div>{props.children}</div>
    </>
  );
};
