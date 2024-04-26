import { createContext, useState } from "react";

const initialUserState = {

  userName: "",
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
  ageLogs: {},

    userDailyLogin: {
        // after comparison: lastlogin = currentlogin
        lastLoginDate: new Date(),
        // set current login date
        currentLoginDate: new Date(),
        rewards: 100,
    },
    character: {
        name: "Username",
        money: 0,
        age: 0,
        occupation: {
            name: "",
            salary: 0,
        },

        inSchool: false,
        inUniversity: false,
    },
    status: {
        health: 100,
        happiness: 100,
        appearance: 100,
    },
    ageLogs: {
        0: [],



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
    english: 0,
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
    userInterface: 0,
  },
  assets: {},
  progress: 0,
};

export const UserContext = createContext(initialUserState);

 const UserProvider = ({ children }) => {
// <<<<<<< toan
//   const [userState, setUserState] = useState(initialUserState);

//   const updateUser = (newUserData) => {
//     setUserState((prev) => {
//         const obj = {
//             ...prev,
//         ...newUserData,
//         }
//       return obj;
//     });
//   };

//   const updateUserLogin = (newLoginData) => {
//     setUserState({
//       ...userState,
//       UserDailyLogin: newLoginData,
//     });
//   };

//   const updateCharacterStatus = (newStatusData) => {
//     setUserState({
//       ...userState,
//       status: newStatusData,
//     });
//   };

//   const updateUserMoney = (newMoney) => {
//     setUserState({
//       ...userState,
//       character: {
//         ...userState.character,
//         money: newMoney,
//       },
//     });
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         userState,
//         updateUserLogin,
//         updateUserMoney,
//         updateCharacterStatus,
//         updateUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// =======
    const [userState, setUserState] = useState(initialUserState);

    const updateUser = (newUserState) => {
        setUserState((prev) => ({
            ...prev, ...newUserState,
        }));
    };


    // Handle User Login Rewards
    // Must be call at the time user login
    const updateUserLogin = (newLoginData) => {
        setUserState({
            ...userState,
            userDailyLogin: {
                currentLoginDate: new Date()
            },
        });
        if (userState.userDailyLogin.currentLoginDate !== userState.userDailyLogin.lastLoginDate) {
            setUserState({
                ...userState,
                character: {
                    money: userState.character.money + userState.userDailyLogin.rewards
                },
            });
            updateCharacterMoney(userState.userDailyLogin.rewards, false)
        }
        setUserState({
            ...userState,
            UserDailyLogin: {
                lastLoginDate: new Date()
            },
        });
    };

    function levelupEducation() {
        for (var subject in userState.education) {
            setUserState({ ...userState, education: { ...userState.education, [subject]: userState.education[subject] + 1 } })
        }
    }


    // Increase Progress
    function startProgress() {
        setInterval(() => {
            // replace by constraints.speed
            updateProgress(0.2)
        }, 1000)
        if (userState.progress === 100) {
            updateCharacterAge(1)
            resetProgress()
        }
    }

    function drainStatus() {
        setInterval(() => {
            // replace by constraints.speed
            updateStatus({
                health: userState.status.health - 0.1,
                happiness: userState.status.happiness - 0.1
            })
        }, 1000)
        if (userState.status.health === 0) {
            console.log('ded')
        }
    }


    const updateStatus = ({ newStatusData }) => {
        // GET CONSTRAINTS FROM constraints.js
        // for (let i in newStatusData) {
        //     if (i > constraints.maxStatusPoint) {
        //         value = max
        //     }
        // }
        setUserState({
            ...userState,
            status: { ...newStatusData },
        });
    };

    const modifyStatus = ({ health, happiness, appearance }) => {
        // GET CONSTRAINTS FROM constraints.js
        // for (let i in newStatusData) {
        //     if (i > constraints.maxStatusPoint) {
        //         value = max
        //     }
        // }
        setUserState({
            ...userState,
            status: {
                health: userState.status.health + health,
                happiness: userState.status.happiness + happiness,
                appearance: userState.status.appearance + appearance
            },
        });
    };

    // update Money
    // False = increase
    const updateCharacterMoney = (newMoney, decrease) => {
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                // increase or decrease money
                money: !decrease ? userState.money + newMoney : userState.money - newMoney
            },
        });
    };

    // update age
    const updateCharacterAge = (value) => {
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                // increase age
                age: userState.character.age + value
            },
        });
    };

    // reset progress
    const resetProgress = () => {
        setUserState({
            ...userState,
            progress: 0,
        });
    };
    const updateProgress = (value) => {
        setUserState({
            ...userState,
            progress: userState.progress += value
        });
    };




    return (
        <UserContext.Provider value={{ userState, updateUserLogin, updateCharacterMoney, updateStatus, updateUser, drainStatus, updateCharacterAge, startProgress }}>
            {children}
        </UserContext.Provider>
    );

};

export default UserProvider;
