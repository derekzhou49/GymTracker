import React, {useState, useContext} from 'react';

const LogContext = React.createContext();

export const useLog = ()  => {
    return useContext(LogContext);
}

/*
TO USE: const {currentUser} = useAuth()
Do this call similar to how useState is called
*/

const LogProvider = ({children}) => {
    const [logList, setLogList] = useState([]);

    return (
        <LogContext.Provider value={[logList, setLogList]}>
            {children}
        </LogContext.Provider>
    );
};

export default LogProvider;