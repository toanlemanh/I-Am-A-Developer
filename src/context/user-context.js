import { createContext, useState } from 'react';

const initialUserState = {
    id: "123123",
    UserDailyLogin: {
        lastLoginDate: "",
        currentLoginDate: "",
        rewards: {
            money: 0,
        },
    },
    character: {
        name: "Username",
        money: 0,
        age: 0,
        occupation: "",

        inSchool: false,
        inUni: false,
    },
    status: {
        health: 100,
        happiness: 100,
        look: 100,
    },
    ageLogs: {


    },

    currentDiseases: [],
    education: {
        math: 0,
        literature: 0,
        history: 0,
        science: 0,
        geography: 0,
        art: 0,
        music: 0,
        physicalEducation: 0,
        computerScience: 0,
        english: 0
    },
    higherEducation: {
        computerScience: 0,
        softwareEngineering: 0,
        informationTechnology: 0,
        cybersecurity: 0,
        dataScience: 0,
        design: 0,
        networking: 0,
        security: 0,
        statistics: 0,
        sQL: 0,
        databaseManagement: 0,
        projectManagement: 0,
        communication: 0,
        businessAnalysis: 0,
        testing: 0,
        softwareDevelopment: 0,
        userExperience: 0,
        userInterface: 0
    },
    assets: {

    },
    progress: 0,
};

export const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState(initialUserState);

    const updateUser = (NewUserData) => {
        setUserState({
            ...NewUserData,
        });
    };

    const updateUserLogin = (newLoginData) => {
        setUserState({
            ...userState,
            UserDailyLogin: newLoginData,
        });
    };

    const updateCharacterStatus = (newStatusData) => {
        setUserState({
            ...userState,
            status: newStatusData,
        });
    };

    const updateUserMoney = (newMoney) => {
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                money: newMoney,
            },
        });
    };


    return (
        <UserContext.Provider value={{ userState, updateUserLogin, updateUserMoney, updateCharacterStatus, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
