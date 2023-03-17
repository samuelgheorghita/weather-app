import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import "./search.css";

function Search({ onSearchChange, changeBackground }) {
  const [search, setSearch] = useState(null);

  function loadOptions(inputValue) {
    return fetch(`${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`, geoApiOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name},  ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  }

  function handleOnChange(searchData) {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return (
    <div className="search">
      <AsyncPaginate placeholder="Search for a city" debounceTimeout={600} value={search} onChange={handleOnChange} loadOptions={loadOptions} />
    </div>
  );
}

export default Search;
