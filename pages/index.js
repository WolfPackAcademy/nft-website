import { useState } from 'react';
import UseClaim from '../stacks/hooks/use-claim';
import { UseLastToken } from '../stacks/hooks/use-last-token'
import { userSession } from '../stacks/logic/auth'
import { Connect } from "@stacks/connect-react";


import Header from '../components/Header'



export default function Home() {

  const [userData, setUserData] = useState({});
  const [message, loading, error] = UseLastToken()

  const authOptions = {
    appDetails: {
      name: "Blue Nft",
      icon: "/icon.png"
    },
    userSession,
    finished: ({ userSession }) => {
      setUserData(userSession.loadUserData())
    }
  }

  const getToken = () => {
    if (loading) {
      return "Loading...";
    } else if (error) {

    } else {
      return message;
    }
  }


  return (
    <div>
      <Header />

      <div>
        {userSession.isUserSignedIn() ?
         <Connect authOptions={authOptions}>
          <UseClaim />
        </Connect> : <span>Please connect to wallet</span>}
      </div>

      <p> {getToken()} /500</p>

    </div>
  )
}
