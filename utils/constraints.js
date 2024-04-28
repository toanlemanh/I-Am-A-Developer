
export const CONSTRAINTS = {
    age: {
        minimumEducationStart: 5,
        receiveMoneyFromParents: 18,
        legalAdult: 18,
        minimumWorkingAge: 16,
        retirement: 65, // Age at which players can retire
        max: 100,
        min: 0,

    },
    financial: {
        initialMoneyFromParents: 10000,
        minimumSalary: 30000, // Example value, adjust as needed
        maximumLoanAmount: 50000 // Example value, adjust as needed
    },
    health: {
        minHealthValue: 0,
        maxHealthValue: 100,
        healthDeclineRate: 1 // Per year or event, adjust based on your game dynamics
    },
    happiness:{
        minHappiness: 0,
        maxHappiness: 100,
        happinessDeclineRate: 1 // Per year or event, adjust based on your game dynamics
    },
    look:{
        minLookValue: 0,
        maxLookValue: 100,
        lookDesclineRate: 1,
    },
    education: {
        prerequisites: {
            // "High School": ["Primary", "Secondary"],
            // "University": ["High School"]
            // Add more prerequisites as needed
        }
    },
    career: {
        noSkillJobsMinimumAge: 18,
        jobSkillRequirements: {
            "Software Developer": ["Coding", "Problem Solving"],
            "Manager": ["Leadership", "Communication"]
            // Define other jobs and their requirements
        },
        healthRequirements:{
           forCoding :  60, // (min=60)
           forMamnualWork: 80,
        }
    },
    social: {
        minimumAgeForDating: 16,
    },
    extraFeatures: {
        insurancePayoutRates: {
            health: 80,
            property: 50,
            life: 75
        },
        startupInitialCost: 20000 // Example value, adjust as needed
    },
    cost:{
        car : 250000,
        mobile: 1000,
        school: 3000,
        higherEducation: 20000,

    },
    dynamicEvents: {
        // Probability and effects of random life events
        accident: { probability: 0.05, healthImpact: -20, financialImpact: -2000 },
        lotteryWin: { probability: 0.01, financialImpact: 50000 },
        getDisease: {
            probability: 0.1, healthImpact: -20
        },
        isCheated: {
            probability: 0.1, happinessImpact: -20
        }, 
        hasMoneyLost: {
            probability: 0.1, happinessImpact: -20
        }
    }
};
