const structureLoader = require("./src/CatLyst/structureLoader");

//Works like a Neural Network, but extended
const defaultStructurePath = require.main.path + "/brgtlhb/states.json";

var structurePath = defaultStructurePath;

function setStructurePath(path = defaultStructurePath) {
    structurePath = path;
}

function loadStructure(path = "") {
    path ?? structurePath;
    
    const structure = structureLoader.loadStructure(path);
}