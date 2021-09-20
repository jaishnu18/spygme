import React from 'react';

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const { value, children } = props;
  return (
    <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>
  );
}
