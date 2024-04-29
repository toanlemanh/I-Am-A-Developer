import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { CONSTRAINTS } from "../utils/constraints";
const initialUserState = {
    userName: "name",
    gameJustStarted: true,
    ageLogs: {},

    userDailyLogin: {
        // after comparison: lastlogin = currentlogin
        lastLoginDate: "",
        // set current login date
        currentLoginDate: "",
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
        sql: 0,
        databaseManagement: 0,
        projectManagement: 0,
        communication: 0,
        businessAnalysis: 0,
        testing: 0,
        softwareDevelopment: 0,
        userExperience: 0,
        userInterface: 0,
    },
    relationships: [
        {
            name: "William Jones",
            group: "Parents",
            relationshipType: "Father",
            relationshipLevel: 100,
            occupation: "Doctor",
            actions: [
                {
                    actionTitle: "Go to mall for clothes",
                    health: 1,
                    happiness: 10,
                    look: 10,
                    relationshipLevel: 10
                },
                {
                    actionTitle: "Meet teacher",
                    health: -3,
                    happiness: 5,
                    look: 0,
                    relationshipLevel: 8
                },
                {
                    actionTitle: "Go to barber shop ",
                    health: 10,
                    happiness: 2,
                    look: 10,
                    relationshipLevel: 12
                },
                {
                    actionTitle: "Family Game Night",
                    health: 2,
                    happiness: 9,
                    look: 0,
                    relationshipLevel: 10
                },
                {
                    actionTitle: "Cook and Share a Meal",
                    health: 4,
                    happiness: 7,
                    look: 0,
                    relationshipLevel: 11
                },
                {
                    actionTitle: "Create a Family Scrapbook",
                    health: 1,
                    happiness: 8,
                    look: 0,
                    relationshipLevel: 9
                },
                {
                    actionTitle: "Volunteer Together",
                    health: 3,
                    happiness: 6,
                    look: 0,
                    relationshipLevel: 10
                },
                {
                    actionTitle: "Plan a Family Day Trip",
                    health: 5,
                    happiness: 9,
                    look: 0,
                    relationshipLevel: 12
                }
            ]
        },
        {
            name: "Emily Taylor",
            group: "Parents",
            relationshipType: "Mother",
            relationshipLevel: 100,
            occupation: "Teacher",
            actions: [
                {
                    actionTitle: "Spend time baking together",
                    health: 3,
                    happiness: 8,
                    look: 0,
                    relationshipLevel: 10
                },
                {
                    actionTitle: "Watch a movie ",
                    health: 2,
                    happiness: 10,
                    look: 0,
                    relationshipLevel: 9
                },
                {
                    actionTitle: "Take a walk in the park",
                    health: 5,
                    happiness: 7,
                    look: 0,
                    relationshipLevel: 11
                },
                {
                    actionTitle: "Family Game Night",
                    health: 2,
                    happiness: 9,
                    look: 0,
                    relationshipLevel: 10
                },
                {
                    actionTitle: "Cook and Share a Meal",
                    health: 4,
                    happiness: 7,
                    look: 0,
                    relationshipLevel: 11
                },
                {
                    actionTitle: "Create a Family Scrapbook",
                    health: 1,
                    happiness: 8,
                    look: 0,
                    relationshipLevel: 9
                },
                {
                    actionTitle: "Volunteer Together",
                    health: 3,
                    happiness: 6,
                    look: 0,
                    relationshipLevel: 10
                },
                {
                    actionTitle: "Plan a Family Day Trip",
                    health: 5,
                    happiness: 9,
                    look: 0,
                    relationshipLevel: 12
                }
            ]
        },
        {
            name: "John Jones",
            group: "Siblings",
            relationshipType: "Brother",
            relationshipLevel: 75,
            age: 20,
            occupation: "Student",
            actions: [
                {
                    actionTitle: "Play video games",
                    health: 2,
                    happiness: 7,
                    look: 0,
                    relationshipLevel: 8
                },
                {
                    actionTitle: "Study together",
                    health: 3,
                    happiness: 5,
                    look: 0,
                    relationshipLevel: 7
                },
                {
                    actionTitle: "Go for a run",
                    health: 5,
                    happiness: 8,
                    look: 0,
                    relationshipLevel: 9
                },
                {
                    actionTitle: "Attend a sports event",
                    health: 3,
                    happiness: 9,
                    look: 0,
                    relationshipLevel: 8
                }
            ]
        },
        {
            name: "Max",
            group: "Pets",
            relationshipType: "Dog",
            relationshipLevel: 90,
            age: 3,
            actions: [
                {
                    actionTitle: "Go for a walk",
                    health: 5,
                    happiness: 10,
                    look: 0,
                    relationshipLevel: 10
                },
                {
                    actionTitle: "Play fetch",
                    health: 3,
                    happiness: 8,
                    look: 0,
                    relationshipLevel: 9
                },
                {
                    actionTitle: "Give belly rubs",
                    health: 2,
                    happiness: 9,
                    look: 0,
                    relationshipLevel: 9
                },
                {
                    actionTitle: "Grooming session",
                    health: 4,
                    happiness: 7,
                    look: 0,
                    relationshipLevel: 8
                }
            ]
        }
    ],
    assets: [],
    progress: 0,
};

export const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState(initialUserState);
    const [progress, setProgress] = useState(0);
    const [learningState, setLearningState] = useState({
        learningSubject: "",
        learningProgress: 0,
        intervalId: "",
    });
    // const [learningProgress, setLearningProgress] = useState(0)
    function refresh() {
        setUserState(initialUserState);
    }
    function updateUser(newUserState) {
        setUserState((prev) => ({
            ...prev,
            ...newUserState,
        }));
    }

    function updateLearningProgress(modifier) {
        setLearningState((prev) => ({
            ...prev,
            learningProgress: (prev.learningProgress += modifier),
        }));
    }

    function updateLearningSubject(subject) {
        setLearningState((prev) => ({
            ...prev,
            learningSubject: subject,
        }));
    }

    function updateLearningId(id) {
        setLearningState((prev) => ({
            ...prev,
            intervalId: id,
        }));
    }
    // function updateUser(newUserState) {
    //     setUserState((prev) => ({
    //         ...prev,
    //         character: {
    //             ...prev.character,
    //             ...newUserState.character
    //         }
    //     }));
    // };
    function updateAsset(asset) {
        console.log("asset: ", asset);
        setUserState((prev) => ({
            ...prev,
            assets: [...prev.assets, asset],
        }));
    }
    function updateUserName(newUserName) {
        setUserState((prev) => ({
            ...prev,
            userName: newUserName,
        }));
    }

    function updateInSchool(newStatus) {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                inSchool: newStatus,
            },
        }));
    }
    function updateInUniversity(newStatus) {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                inUniversity: newStatus,
            },
        }));
    }

    function updateOccupation(name, salary) {
        setUserState((prev) => ({
            ...prev,
            character: {
                ...prev.character,
                occupation: {
                    name: name,
                    salary: salary,
                },
            },
        }));
    }
    function formatDate() {
        let date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
        const day = String(date.getDate()).padStart(2, "0");
        date = `${year}/${month}/${day}`;
        return date;
    }
    function updateLastLoginDate() {
        setUserState((prev) => ({
            ...prev,
            userDailyLogin: {
                ...prev.userDailyLogin,
                rewards: 300,
            },
        }));
    }
    // Handle User Login Rewards
    // Must be call at the time user login
    function updateUserLogin() {
        setUserState((prev) => ({
            ...prev,
            userDailyLogin: {
                ...userState.userDailyLogin,
                rewards: 200,
            },
        }));
        updateLastLoginDate();
        console.log("state" + userState.userDailyLogin.rewards);
        if (
            userState.userDailyLogin.currentLoginDate !==
            userState.userDailyLogin.lastLoginDate ||
            !userState.userDailyLogin.lastLoginDate
        ) {
            setUserState((prev) => ({
                ...prev,
                userDailyLogin: {
                    ...prev.userDailyLogin,
                    rewards: 200,
                },
            }));
            console.log(userState.userDailyLogin.currentLoginDate);
            updateCharacterMoney(-userState.userDailyLogin.rewards);
            return `You have received $${userState.userDailyLogin.rewards} from daily login rewards!`;
        }
        setUserState({
            ...userState,
            userDailyLogin: {
                ...userState.userDailyLogin,
                lastLoginDate: userState.userDailyLogin.currentLoginDate,
            },
        });

        return "You have successfully logged in!";
    }
    // each one increase by one level
    function levelupAllEducation() {
        const updatedEducation = { ...userState.education };
        for (const subject in updatedEducation) {
            updatedEducation[subject] += 2;
            if (updatedEducation[subject] > 5) updatedEducation[subject] = 5;
        }
        setUserState((prevState) => ({
            ...prevState,
            education: updatedEducation,
        }));
    }

    function levelupEducation(subject) {
        const updatedEducation = { ...userState.education };
        updatedEducation[subject] += 1;
        if (updatedEducation[subject] > 5) updatedEducation[subject] = 5;
        setUserState((prevState) => ({
            ...prevState,
            education: updatedEducation,
        }));
    }

    function levelupHigherEducation(subject) {
        const updatedEducation = { ...userState.higherEducation };
        updatedEducation[subject] += 1;
        if (updatedEducation[subject] > 5) updatedEducation[subject] = 5;
        setUserState((prevState) => ({
            ...prevState,
            higherEducation: updatedEducation,
        }));
    }
    function startProgress() {
        const id = setInterval(() => {
            setProgress((prev) => (prev += 100 / 720));
        }, 1000);
        return id;
    }
    async function loadProgress(uid) {
        try {
            const loadedProgress = await AsyncStorage.getItem("progress" + uid);
            console.log("progressId  :", loadedProgress, uid);
            setProgress(JSON.parse(loadedProgress));
        } catch (error) {
            console.log("Error progress saving data: ", error);
        }
    }

    function setStatus({ newStatusData }) {
        setUserState({
            ...userState,
            status: { ...userState.status, ...newStatusData },
        });
    }
    function updateStatus({ health, happiness, appearance }) {
        setUserState({
            ...userState,
            status: {
                health: health
                    ? (userState.status.health + health) < 0
                        ? 0
                        : ((userState.status.health + health) > 100
                            ? 100
                            : (userState.status.health += health))
                    : userState.status.health,
                happiness: happiness
                    ? (userState.status.happiness + happiness) < 0
                        ? 0
                        : (userState.status.happiness + happiness) > 100
                            ? 100
                            : (userState.status.happiness += happiness)
                    : userState.status.happiness,
                appearance: appearance
                    ? (userState.status.happiness + happiness) < 0
                        ? 0
                        : (userState.status.appearance + appearance) > 100
                            ? 100
                            : (userState.status.appearance += appearance)
                    : userState.status.appearance,
            },
        });
    }
    function updateCharacterMoney(newMoney) {
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                money: (userState.character.money -= newMoney),
            },
        });
    }
    function updateCharacterAge(value) {
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                age: (userState.character.age += value),
            },
        });
    }
    function updateProgress(value) {
        setProgress((prev) => prev + value);
    }
    function setDiseases(diseases) {
        setUserState({
            ...userState,
            currentDiseases: diseases,
        });
    }
    function removeDisease(targetName) {
        setDiseases((prev) => [
            prev.findAll((disease) => disease.name !== targetName),
        ]);
    }
    function addDisease(newDisease) {
        setDiseases((prev) => [...prev, newDisease]);
    }
    function affectedByDiseases() {
        const diseases = userState.currentDiseases;
        for (let disease in diseases) {
            updateStatus(disease.effects);
        }
    }
    function setRelationships(newRelationships) {
        setUserState({
            ...userState,
            relationships: newRelationships,
        });
    }
    // update a specific realtionship by their group and key
    function updateRelationshipLevel(name, level) {
        for (let i = 0; i < userState.relationships.length; i++) {
            for (let j = 0; i < userState.relationships[i].length; j++) {
                if (userState.relationships[i][j].name === name)
                    userState.relationships[i][j].relationshipLevel += level
            }
        }
    }


    async function saveUserDataToStorage(uid) {
        if (!userState.gameJustStarted)
            try {
                let strData = "";
                console.log("saving as", (strData = JSON.stringify(userState)));
                if (strData) await AsyncStorage.setItem(uid, strData);
                //console.log('USER Data saved successfully!');
                console.log("save data", userState);
            } catch (error) {
                console.log("Error saving data: ", error);
            }
    }

    async function loadUserDataFromStorage(uid) {
        try {
            const storedData = await AsyncStorage.getItem(uid);
            console.log("stored ", storedData);
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                console.log("storedata", typeof parsedData);
                setUserState(parsedData);
                console.log("Data loaded: " + userState.status.health);
            }
        } catch (error) {
            console.log("Error loading data: ", error);
        }
        updateUser({ gameJustStarted: false });
    }
    function isAlive() {
        if (userState.status.health <= CONSTRAINTS.health.minHealthValue) {
            console.log("Chet");
            return false;
        }
        return true;
    }

    return (
        <UserContext.Provider
            value={{
                userState,
                progress,
                learningState,
                formatDate,
                updateLearningId,
                updateLearningSubject,
                updateLearningProgress,
                setLearningState,
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
                levelupAllEducation,
                levelupEducation,
                levelupHigherEducation,
                setStatus,
                removeDisease,
                addDisease,
                affectedByDiseases,
                updateRelationshipLevel,
                saveUserDataToStorage,
                loadUserDataFromStorage,
                refresh,
                updateAsset,
            }}
        >
            {children}
            {console.log("userstate eve: ", userState)}
        </UserContext.Provider>
    );
};

export default UserProvider;
