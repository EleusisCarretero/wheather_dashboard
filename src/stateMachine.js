import { stateStandBy } from "./states/standbyState.js";
import { stateDisplayedStates } from "./states/displayedStatesState.js";
import { stateDisplayedCities } from "./states/displayedCitiesState.js";
import { stateAwait } from "./states/awaitState.js";

export class StateMachine{
    constructor(fields){
    this.fields = fields;
    this.currentState = 1;
    }
    setState(newState) {
        this.currentState = newState;
        this.executeState();
    }
    
    executeState() {
        switch (this.currentState) {
          case 1:
            stateStandBy(this.fields, this.setState.bind(this));
            break;
          case 2:
            stateDisplayedStates(this.fields, this.setState.bind(this));
            break;
          case 3:
            stateDisplayedCities(this.fields, this.setState.bind(this));
            break;
          case 4:
            stateAwait(this.fields, this.setState.bind(this));
            break;
        }
    }
}