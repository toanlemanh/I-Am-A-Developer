const CONSTRAINTS = ({
    // 12 months
    progressSpeed: 100 / 720,
    // 4 months
    learnSpeed: CONSTRAINTS.progressSpeed / 3,
    // 36 months
    drainSpeed: CONSTRAINTS.progressSpeed * 3,
    //
    maxStatus: 100,

    minStatus: 0,

    // Education
    maxLevel: 5,

    minLevel: 0
})

export default CONSTRAINTS