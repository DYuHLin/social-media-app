import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const sub = onAuthStateChanged(auth,(user) => {
            setCurrentUser(user);
        });

        return () => {
            sub();
        };
    },[]);

    return (
        <UserContext.Provider value = {{currentUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;