import { createContext, useEffect, useContext, useReducer } from "react";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "get/cities":
      return { ...state, cities: action.payload };
    case "toggle/loading":
      return { ...state, isLoading: !state.isLoading };
    case "create/city":
      return { ...state,  cities : [...state.cities, action.payload] };
    case "delete/city": 
      return { ...state,  cities : state.cities.filter((city) => city.id !== action.payload) };

    default:
      throw new Error("unknown action");
  }
}

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "newLoading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);

        dispatch({ type: "newData", payload: data });
      } catch {
        alert("there was an error loading data");
      } finally {
        dispatch({ type: "newLoading" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "newLoading" });

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "newData", payload: data });
    } catch {
      alert("there was an error loading data");
    } finally {
      dispatch({ type: "newLoading" });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "newLoading" });

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      dispatch({ type: "create/city", payload: data });
    } catch {
      alert("there was an error loading data");
    } finally {
      dispatch({ type: "newLoading" });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "newLoading" });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "delete/city", payload: id });
    } catch {
      alert("there was an error deleting data");
    } finally {
      dispatch({ type: "newLoading" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("cities context was used outside the CitiesProvider  ");
  return context;
}
export { CitiesProvider, useCities };
