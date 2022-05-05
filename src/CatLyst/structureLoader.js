const { AiResinStructure, AiBranchJoint } = require("./structureStates");

function loadStructure(path) {
    const structureJSON = require(path);

    if(!structureJSON)
        throw new Error("no JSON data");
    if(!structureJSON.states)
        throw new Error("no \"states\" property in JSON");
    if(!structureJSON.conditions)
        throw new Error("no \"conditions\" property in JSON");
    if(!structureJSON.branches)
        throw new Error("no \"branches\" property in JSON");
    
    const structure = new AiResinStructure();

    for(i of Object.entries(structureJSON.states))
        structure.makeState(i, structureJSON.states[i]);
    for(i of structureJSON.conditions)
        structure.makeCondition(i);
    for(i of Object.entries(structureJSON.branches)) {
        let branch = structureJSON.branches[i];
        
        branches[i] = new AiBranch(i, states[branch.reffersTo]);
        for(condition of branch.baseConditions)
            branches[i].conditions.push(conditions[condition]);
    }
    for(i of Object.entries(structureJSON.states))
        for(branch of structureJSON.states[i].branches)
            structure.states[i].branches.push(new AiBranchJoint(structure.branches[branch]));
    
    return structure;
}

module.exports = {
    loadStructure
};