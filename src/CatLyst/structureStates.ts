//Resin came from turning adaptive to resilient because they're synonymous
//and sounds like resin which is used to preserve something which the AI is meant to preserve 
//stuff.
export class AiResinStructure {
    states : {[index : string] : AiState};
    branches : {[index : string] : AiBranch};
    conditions : {[index : string] : AiCondition};
    activeState : AiState;

    setState(state : AiState) {
        if(!this.states[state.getName()])
            throw new Error("Not a valid state");

        this.activeState = state;
    }
    makeState(name : string, stateType : string) {
        return this.states[name] = new AiState(name, stateType);
    }
    makeCondition(name : string) {
        return this.conditions[name] = new AiCondition(name);
    }
    makeBranch(name : string, reffersTo : string) {
        return this.branches[name] = new AiBranch(name, this.states[reffersTo]);
    }
}

export class AiState {
    private name : string;
    private stateType : string;
    
    run : () => number;
    branches : [AiBranchJoint];

    constructor(name : string, stateType : string) {
        this.name = name;
        this.stateType = stateType;
    }
    getName() {
        return this.name;
    }
    getStateType() {
        return this.stateType;
    }
    hashCode() {
        return 1;
    }
}

export class AiBranch {
    private reffersTo : AiState;

    run : () => void;
    conditions : [AiCondition];

    constructor(name : string, reffersTo : AiState) {
        this.reffersTo = reffersTo;
    }
    onEvent() {
        if(!this.conditionsMet())
            return;
        
        this.run();
    }
    conditionsMet() {
        for(let condition of this.conditions)
            if(!condition.conditionMet())
                return false;
        return true;
    }
    getReffersTo() {
        return this.reffersTo;
    }
}

export class AiCondition {
    private name : string;

    conditionMet : () => boolean;

    constructor(name : string) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

export class AiBranchJoint {
    private connectedBranch : AiBranch;
    successPercent : number;

    constructor(connectedBranch : AiBranch) {
        this.connectedBranch = connectedBranch;
    }

    reportSuccess(percent : number) {
        this.successPercent >>= 1;
        this.successPercent + (percent >> 1);

        return this.successPercent;
    }
    getConnectedBranch() {
        return this.connectedBranch;
    }
}