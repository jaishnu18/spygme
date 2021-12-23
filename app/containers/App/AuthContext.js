import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  return (
    <AuthContext.Provider value={props.value}>
      {props.children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  value: PropTypes.object,
  children: PropTypes.node,
};
