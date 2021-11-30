import React, {useState, useContext} from 'react';

const AuthContext = React.createContext();

export const useAuth = ()  => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({user: 'user'});

    const loginUser = async (email, password) => {
        // dummy code
        const user = {email, password};
        setCurrentUser(user);
    };

    const logoutUser = async () => {
        // dummy code
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        loginUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;