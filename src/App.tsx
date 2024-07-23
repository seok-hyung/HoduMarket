import React from 'react';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';
import GlobalStyled from 'styles/Globalstyled';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';
const queryClinet = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClinet}>
      <RecoilRoot>
        <GlobalStyled />
        <RouterProvider router={router} />
      </RecoilRoot>
      ,
    </QueryClientProvider>
  );
}

export default App;
