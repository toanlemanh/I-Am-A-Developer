import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from "react";
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
    character: {
        name: "Username",
        money: 0,
        age: 20,
        occupation: {
            name: "",
            salary: 0,
        },

        inSchool: false,
        inUni: false,
    },
    status: {
        health: 50,
        happiness: 50,
        look: 50,
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
        english: 0,
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
    assets: {},
    progress: 20,
};

export const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {

    const [userState, setUserState] = useState(initialUserState);
    const [progress, setProgress] = useState(0)
    function updateUser(newUserState) {
        setUserState((prev) => ({
            ...prev, ...newUserState,
        }));
    };
    // function updateUser(newUserState) {
    //     setUserState((prev) => ({
    //         ...prev,
    //         character: {
    //             ...prev.character,
    //             ...newUserState.character
    //         }
    //     }));
    // };

    function updateUserName(newUserName) {
        setUserState((prev) => ({
            ...prev,
            userName: newUserName
        }));
    };

    function updateInSchool() {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                inSchool: prev.character.inSchool ? false : true
            }
        }));
    }



    function updateInUniversity() {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                inUniversity: prev.character.inUniversity ? false : true
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

    // function levelupSubject(subject) {
    //     for (var subject in userState.education) {
    //         setUserState({ ...userState, education: { ...userState.education, [subject]: userState.education[subject] + 1 } })
    //     }
    // }


    // each one increase by one level
    function levelupEducation() {
        for (var subject in userState.education) {
            setUserState({ ...userState, education: { ...userState.education, [subject]: userState.education[subject] + 1 } })
        }
    }


    // Increase Progress
    function startProgress() {

        const id = setInterval(() => {
            // replace by constraints.speed
            setProgress((prev) => prev += (100 / 720 * 3))
        }, 3000)
        return id
    }

    function loadProgress(uid) {
        try {
            const loadedProgress = AsyncStorage.getItem("progress" + uid)
            setProgress(JSON.parse(loadedProgress))
        } catch (error) {
            console.log('Error saving data: ', error);
        }

    }

    function drainStatus() {
        setInterval(() => {
            // replace by constraints.speed
            updateStatus({
                health: -10,
                happiness: -10,
                appearance: -10
            })
            if (userState.status.health <= 0) {

            }
        }, 5000)

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
                health: health ? userState.status.health += health : userState.status.health,
                happiness: happiness ? userState.status.happiness += happiness : userState.status.happiness,
                appearance: appearance ? userState.status.appearance += appearance : appearance
            },
        });
    };

    // update Money
    // False = increase
    function updateCharacterMoney(newMoney, decrease) {
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
                await AsyncStorage.setItem(uid, JSON.stringify(userState));
                console.log('USER Data saved successfully!');
                console.log(userState);
            } catch (error) {
                console.log('Error saving data: ', error);
            }
    };

    async function loadUserDataFromStorage(uid) {
        try {
            const storedData = await AsyncStorage.getItem(uid);
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                setUserState(parsedData)
                console.log('Data loaded: ' + userState.status.health)
            }
        } catch (error) {

            console.log('Error loading data: ', error);
        }
        updateUser({ gameJustStarted: false })
    };

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
                    drainStatus,
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
                    loadUserDataFromStorage
                }
            }>
            {children}
        </UserContext.Provider>
    );

};

export default UserProvider;
