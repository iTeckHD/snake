import React, { PropsWithChildren } from 'react';
import { Header } from './header';

interface PresentationalProps {}

type Props = PropsWithChildren<PresentationalProps>;
export const Layout = (props: Props) => {
  return (
    <div className='layout'>
      <div className='layout-header'>
        <Header />
      </div>
      <div className='layout-wrapper'>
        <div className='layout-content'>{props.children}</div>
      </div>
    </div>
  );
};
