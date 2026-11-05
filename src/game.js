//game rules,card,rounds and scores
//Everything related to the rules of the game.
const emperorHand =["citizen","citizen","citizen","citizen","emperor"];
const slaveHand =["citizen","citizen","citizen","citizen","slave"];
export const total_round = 12;
export const rounds_per_group =3;
export function createHand(camp) {
    if (camp === "emperor"){
        return [...emperorHand]; // so for each call we can can hand out fresh list and not the original
    }
    else {
        return [...slaveHand];
    }
    
}
export function duel (playerCard, computerCard) {
 if (playerCard === computerCard) {
    return "draw";
}
if(
     (playerCard === "emperor" && computerCard === "citizen") ||
    (playerCard === "citizen" && computerCard === "slave") ||
 (playerCard === "slave" && computerCard === "emperor")
){
    return "victory";
}
return "defeat";
}