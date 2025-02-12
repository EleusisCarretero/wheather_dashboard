
export function stateAwait(fields, currentState){
  // 1. Check country has text
  fields.countrysearch.addEventListener("input", () => {
    if(fields.countrysearch.value.trim() == ""){
      fields.statesearch.value = "";
      fields.statesearch.disabled = true;

      fields.citysearch.value = "";
      fields.citysearch.disabled = true;
      currentState(2)
    }
  });
  // 2. Check State has text
  fields.citysearch.addEventListener("input", () =>{
    if(fields.statesearch.value.trim() == ""){
      fields.citysearch.value = "";
      fields.citysearch.disabled = true;
      currentState(4)
    }
  });

}