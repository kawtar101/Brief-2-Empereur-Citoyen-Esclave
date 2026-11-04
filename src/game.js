//game rules,card,rounds and scores
//Everything related to the rules of the game.
const emperorHand =["citizen","citizen","citizen","citizen","emperor"];
const slaveHand =["citizen","citizen","citizen","citizen","slave"];
export function createHand(camp) {
    if (camp === "emperor"){
        return [...emperorHand]; // so for each call we can can hand out fresh list and not the original
    }
    else {
        return [...slaveHand];
    }
    
}