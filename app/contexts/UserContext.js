import React from 'react';

export const UserContext = React.createContext();

export function UserProvider(props) {
  const { value, children } = props;
  return (
    <UserContext.Provider value={{ ...value }}>{children}</UserContext.Provider>
  );
}
