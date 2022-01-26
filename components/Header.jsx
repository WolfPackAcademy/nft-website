import React, { useState, useEffect } from 'react';
import { authenticate, getPerson, getUserData, userSession } from '../stacks/logic/auth'


export default function Header() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (userSession.isSignInPending()) {
            userSession
                .handlePendingSignIn()
                .then((userData) => {
                    window.history.replaceState({}, document.title, "/");
                    setUserData(userData);
                }).catch((err) => console.log(err));
        } else if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());

        }
    }, [])


    const logout = () => {
        userSession.signUserOut()
        window.location = '/'
    }



    return <div>
        {!userSession.isUserSignedIn() ? <>
            <a className="btn btn-info" onClick={() => authenticate()}>
                connect
            </a>
        </> :

            <>
                <button onClick={logout}>Logout</button>
                <p> {getPerson()._profile.stxAddress.mainnet}</p>
            </>}

    </div>;
}
