import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { Person } from "@stacks/profile";
const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });


export function authenticate() {
    try {
        showConnect({
            appDetails: {
                name: "Blue NFT",
                icon: "https://pbs.twimg.com/profile_images/1447497315699339264/a5ge4oOM_400x400.jpg"
            },
            redirectTo: "/",
            onFinish: () => {
                window.location.reload()
            },
            userSession: userSession
        })
    } catch (error) {
        console.log(error.message);
    }
}


export function getUserData() {
    if (userSession && userSession.isUserSignedIn()) {
        return userSession.loadUserData()
    }
    return null;
}


export function getPerson() {
    if (userSession && userSession.isUserSignedIn()) {
        return new Person(getUserData().profile);
    }
    return null;
}