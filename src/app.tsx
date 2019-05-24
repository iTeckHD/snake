import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from './redux/store';
import { Layout } from './components/layout/layout';
import { Game } from './components/game';

export const App = () => {
  const [store] = React.useState(getStore());

  return (
    <Provider store={store}>
      <Layout>
        <Game />
      </Layout>
    </Provider>
  );
};
