import React, {useState, useContext} from 'react';

const AuthContext = React.createContext();

export const useAuth = ()  => {
    return useContext(AuthContext);
}

/*
TO USE: const {currentUser} = useAuth()
Do this call similar to how useState is called
*/

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();

    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
        	{children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
