import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useContext } from "react";
import { CONSTRAINTS } from '../utils/constraints';
import AlertPopup from '../components/eventsPopup/AlertPopup';
import { AuthContext } from './auth';
import { postUserId } from './axios';
const initialUserState = {
    userName: "name",
    gameJustStarted: true,
    userDailyLogin: {
        lastLoginDate: "",
        currentLoginDate: "",
        rewards: {
            money: 0,
        },
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
        img: "",
        money: 20000000,
        age: 0,
        occupation: {
            name: "",
            salary: 0,
        },
        // occupation: null,

        inSchool: false,
        inUniversity: false,
    },
    status: {
        health: 100,
        happiness: 100,
        appearance: 100,
    },
    // currentDiseases in an array of diseases objects
    currentDiseases: [],
    education: {
        math: 10,
        literature: 0,
        history: 0,
        science: 10,
        geography: 0,
        art: 5,
        music: 0,
        physicalEducation: 0,
        computerScience: 0,
        english: 4,
    },
    higherEducation: {
        computerScience: 10,
        softwareEngineering: 10,
        informationTechnology: 0,
        cybersecurity: 0,
        dataScience: 0,
        design: 2,
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
        userExperience: 2,
        userInterface: 2,
    },

    relationships: {
        parents: [
            {
                name: "William Jones",
                group: "Parents",
                relationshipType: "Father",
                relationshipLevel: 100,
                occupation: "Doctor"
            },
            {
                name: "Emily Taylor",
                group: "Parents",
                relationshipType: "Mother",
                relationshipLevel: 100,
                occupation: "Teacher"
            },
        ],
        siblings: [

        ],
        love: [

        ],
    },
    assets: [],
    progress: 20,
};

export const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {

    const [userState, setUserState] = useState(initialUserState);
    const [progress, setProgress] = useState(0)
    function refresh() {
        setUserState(initialUserState);
    }
    function updateUser(newUserState) {
        setUserState((prev) => ({
            ...prev, ...newUserState,
        }));
    };
   function updateAsset(asset){
    console.log("asset: ",asset)
     setUserState((prev) => (
            {
                ...prev, 
                assets : [...prev.assets, asset],
            }
     ))
   }
    function updateUserName(newUserName) {
        setUserState((prev) => ({
            ...prev,
            userName: newUserName
        }));
    };

    function updateInSchool(newStatus) {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                inSchool: newStatus
            }
        }));
    }
    function updateInUniversity(newStatus) {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                inUniversity: newStatus
            }
        }));
    }

    function updateOccupation(name, salary) {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                occupation:
                {
                    name: name,
                    salary: salary,
                }
            }
        }));
    }

    // Handle User Login Rewards
    // Must be call at the time user login
    function updateUserLogin(newLoginData) {
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
    // each one increase by one level
    function levelupEducation() {
        const updatedEducation = { ...userState.education };
        console.log(updatedEducation)
        for (const subject in updatedEducation) {
            updatedEducation[subject] += 1;
        }

        setUserState(prevState => ({
            ...prevState,
            education: updatedEducation
        }));
    }


    // Increase Progress
    function startProgress() {

        const id = setInterval(() => {
            // replace by constraints.speed
            setProgress((prev) => prev += (100 / 720 * 3))
        }, 3000)
        return id
    }

    async function loadProgress(uid) {
        try {
            const loadedProgress = await AsyncStorage.getItem("progress" + uid);
            console.log("progressId  :", loadedProgress, uid);
            setProgress(JSON.parse(loadedProgress))
        } catch (error) {
            console.log('Error progress saving data: ', error);
        }

    }


    // set
    function setStatus({ newStatusData }) {
        // GET CONSTRAINTS FROM constraints.js
        // for (let i in newStatusData) {
        //     if (i > constraints.maxStatusPoint) {
        //         value = max
        //     }
        // }
        setUserState({
            ...userState,
            status: { ...userState.status, ...newStatusData },
        });
    };

    // Subtract or Add
    function updateStatus({ health, happiness, appearance }) {
        // GET CONSTRAINTS FROM constraints.js
        // for (let i in newStatusData) {
        //     if (i > constraints.maxStatusPoint) {
        //         value = max
        //     }
        // }

        setUserState({
            ...userState,
            status: {
                health: health ? ((userState.status.health += health) > 100 ? 100 : (userState.status.health += health)) : userState.status.health,
                happiness: happiness ? ((userState.status.happiness += happiness) > 100 ? 100 : (userState.status.happiness += happiness)) : userState.status.happiness,
                appearance: appearance ? ((userState.status.appearance += appearance) > 100 ? 100 : (userState.status.appearance += appearance)) : userState.status.appearance
            },
        });

    };

    // update Money
    // False = increase
    function updateCharacterMoney(newMoney) {
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                // increase or decrease money
                money: userState.character.money -= newMoney
            },
        });
    };

    // update age
    function updateCharacterAge(value) {
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                // increase age
                age: userState.character.age += value
            },
        });
    };


    function updateProgress(value) {
        setProgress((prev) => prev + value);
    };

    function setDiseases(diseases) {
        setUserState({
            ...userState, currentDiseases: diseases
        })
    }

    function removeDisease(targetName) {
        setDiseases((prev) => [
            prev.findAll((disease) => disease.name !== targetName)
        ])
    }



    // disease object can be added with format:
    // {
    //     name: "disease1",
    //     effects: {
    //         health: -20,
    //         happiness: -20,
    //         appearance: -20
    //     }
    //     cureCost: 100,
    // }
    function addDisease(newDisease) {
        setDiseases((prev) => [
            ...prev, newDisease
        ])
    }

    // called everytime character ages up
    function affectedByDiseases() {
        const diseases = userState.currentDiseases
        for (let disease in diseases) {
            updateStatus(disease.effects)
        }
    }

    function setRelationships(newRelationships) {
        setUserState({
            ...userState, relationships: newRelationships
        })
    }
    // update a specific realtionship by their group and key
    function updateRelationshipLevel(group, key, level) {
        setUserState((prevState) => {
            const relationships = {
                ...prevState.relationships,
                [group]: {
                    ...prevState.relationships[group] || {},
                    [key]: {
                        relationshipLevel: level,
                    },
                },
            };
            return { ...prevState, relationships };
        });
    }


    async function saveUserDataToStorage(uid) {
        if (!userState.gameJustStarted)
            try {
                let strData = ""
                console.log("saving as", strData = JSON.stringify(userState))
                if (strData) await AsyncStorage.setItem(uid, strData);
                //console.log('USER Data saved successfully!');
                console.log("save data", userState);
            } catch (error) {
                console.log('Error saving data: ', error);
            }
    };

    async function loadUserDataFromStorage(uid) {
        try {
            const storedData = await AsyncStorage.getItem(uid);
            console.log("stored ", storedData);
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                console.log("storedata", typeof parsedData);
                setUserState(parsedData)
                console.log('Data loaded: ' + userState.status.health)
            }
        } catch (error) {

            console.log('Error loading data: ', error);
        }
        updateUser({ gameJustStarted: false })
    };
    function isAlive () {
       if ( userState.status.health <= CONSTRAINTS.health.minHealthValue ) {
        console.log("Chet")
            return false;
       }
       return true;
    }

    return (
        <UserContext.Provider value=
            {
                {
                    userState,
                    progress,
                    updateUserLogin,
                    updateCharacterMoney,
                    updateStatus,
                    updateUser,
                    updateUserName,
                    updateInSchool,
                    updateInUniversity,
                    updateOccupation,
                    updateCharacterAge,
                    startProgress,
                    updateProgress,
                    loadProgress,
                    levelupEducation,
                    setStatus,
                    removeDisease,
                    addDisease,
                    affectedByDiseases,
                    updateRelationshipLevel,
                    saveUserDataToStorage,
                    loadUserDataFromStorage,
                    refresh,
                    updateAsset
                }
            }>
            {children}
            {console.log("userstate eve", userState)}           
        </UserContext.Provider>
    );

};

export default UserProvider;
