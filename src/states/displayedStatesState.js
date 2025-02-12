import {ApiCityManager} from "../utils/api_city_manager.js"


export async function stateDisplayedStates(fields, currentState){
  const apiCityManagerInst = new ApiCityManager()
  const states = await apiCityManagerInst.getSatesList(fields.countrysearch.value)
  fields.statesearch.addEventListener("input", () => {
    const query = fields.statesearch.value.toLowerCase();
    fields.statelist.innerHTML = "";
    if (query){
      const filteredStates = states.filter(state => state.toLowerCase().includes(query));
      filteredStates.forEach(state =>{
        const li = document.createElement("li");
        li.textContent = state;
        li.addEventListener("click", async () => {
          fields.statesearch.value = state;
          fields.statelist.innerHTML = "";
          if (fields.statesearch.value.trim() !== "") {
            fields.citysearch.disabled = false;
            currentState(3)
          }else{
            fields.citysearch.disabled = true;
          }
        });
        fields.statelist.appendChild(li);
      });
    }
  });
}
