import React, {useState, useContext} from 'react';

const AuthContext = React.createContext();
const LogContext = React.createContext();

export const useAuth = ()  => {
    return useContext(AuthContext);
}

export const useLog = () => {
    return useContext(LogContext);
}

/*
TO USE: const {currentUser} = useAuth()
Do this call similar to how useState is called
*/

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [logList, setLogList] = useState([]);

    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            <LogContext.Provider value={[logList, setLogList]}>
                {children}
            </LogContext.Provider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;