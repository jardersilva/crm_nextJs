import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext({
  loading: false,
  setLoading: (value: boolean) => {}, 
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
