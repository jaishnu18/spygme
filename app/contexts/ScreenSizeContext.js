import React from 'react';

export const ScreenSizeContext = React.createContext();

export function ScreenSizeProvider(props) {
  const { value, children } = props;
  return (
    <ScreenSizeContext.Provider value={{ ...value }}>{children}</ScreenSizeContext.Provider>
  );
}
