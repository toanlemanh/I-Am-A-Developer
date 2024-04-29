import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { CONSTRAINTS } from "../utils/constraints";
const initialUserState = {
    userName: "name",
    gameJustStarted: true,
    ageLogs: {},
    isAlive: true,
    userDailyLogin: {
        // after comparison: lastlogin = currentlogin
        lastLoginDate: "",
        // set current login date
        currentLoginDate: "",
        rewards: 100,
    },
    character: {
        img: "",
        money: 0,
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
            relationshipLevel: 20,
            occupation: "Doctor",
        },
        {
            name: "Emily Taylor",
            group: "Parents",
            relationshipType: "Mother",
            relationshipLevel: 20,
            occupation: "Teacher",

        },
        {
            name: "John Jones",
            group: "Siblings",
            relationshipType: "Brother",
            relationshipLevel: 20,
            age: 20,
            occupation: "Student",

        },
        {
            name: "Max",
            group: "Pets",
            relationshipType: "Dog",
            relationshipLevel: 20,
            age: 3,

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
    function refresh() {
        const name = userState.userName
        setUserState(() => ({
            ...initialUserState,
            userName: name,
            character: {
                ...initialUserState.character,
                age: 0,
            },
            status: {
                health: 100,
                happiness: 100,
                appearance: 100,
            }
        }));
        setProgress(0),
            clearInterval(learningState.intervalId)
        setLearningState({
            learningSubject: "",
            learningProgress: 0,
            intervalId: ""
        }
        )
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
            learningProgress: modifier ? (prev.learningProgress += modifier) : 0,
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
    function updateStatus({ health, happiness, appearance }) {
        isAlive()
        if (userState.status.health <= 0) {
            console.log(userState.isAlive = false);
            console.log("You are dead!")
            return
        }
        setUserState({
            ...userState,
            status: {
                health: health
                    ? (userState.status.health + health) < 0
                        ? (0)
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
        if ((userState.character.money - newMoney) < 0) return false
        setUserState({
            ...userState,
            character: {
                ...userState.character,
                money: (userState.character.money -= newMoney),
            },
        });
        return true
    }
    function updateCharacterAge(value) {
        if (!isAlive) {
            console.log(isAlive)
            return
        }
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
    function updateRelationshipLevel(name, level) {
        for (let i = 0; i < userState.relationships.length; i++) {
            if (userState.relationships[i].name === name) {
                if (userState.relationships[i].relationshipLevel + level > 100) userState.relationships[i].relationshipLevel = 100
                else userState.relationships[i].relationshipLevel += level
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
        </UserContext.Provider>
    );
};

export default UserProvider;
