
import { StateMachine } from "./stateMachine.js";

const app = document.getElementById("app");

function readCurrentFiledInfo(){
  const mainAvailableFields = document.querySelectorAll("[data-field]");
  let objFields = {};
  for (var field of mainAvailableFields){
    var objName = field.id.replace("-","")
    objFields[objName] = document.getElementById(field.id);
  }
  return objFields
}

async function main() {
  const fields = readCurrentFiledInfo();
  const stateMachine = new StateMachine(fields);
  stateMachine.executeState();
}

main();
