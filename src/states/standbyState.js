
export function stateStandBy(fields, currentState){
    const availableCountries = getCountryList()
    fields.countrysearch.addEventListener("input", () => {
      const query = fields.countrysearch.value.toLowerCase();
      fields.countrylist.innerHTML = "";
      if(query){
        const filteredCountries = availableCountries.filter(country => country.toLowerCase().includes(query));
        filteredCountries.forEach(country =>{
          const li = document.createElement("li");
          li.textContent = country;
          li.addEventListener("click", async () => {
              fields.countrysearch.value = country;
              fields.countrylist.innerHTML = "";
              if (fields.countrysearch.value.trim() !== "") {
                fields.statesearch.disabled = false;
                currentState(2)
              }else{
                fields.statesearch.disabled = true;
              }
          });
          fields.countrylist.appendChild(li);
        });
      }
    });
  }

function getCountryList() {
    return ["Mexico", "Colombia", "Ecuador", "Venezuela", "Argentina"];
  }