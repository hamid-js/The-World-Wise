import { createContext, useState, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_CURRENT_CITY":
      return {
        ...state,
        currentCity: action.payload,
      };
    case "ADD_CITY":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "DELETE_CITY":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      return state;
  }
};

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    cities: [],
    isLoading: false,
    currentCity: {},
  });

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "SET_IS_LOADING", payload: true });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "SET_CITIES", payload: data });
      } catch {
        alert("there was an error loading data");
      } finally {
        dispatch({ type: "SET_IS_LOADING", payload: false });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "SET_CURRENT_CITY", payload: data });
    } catch {
      alert("there was an error loading data");
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: "ADD_CITY", payload: data });
    } catch {
      alert("there was an error loading data");
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "DELETE_CITY", payload: id });
    } catch {
      alert("there was an error deleting data");
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: state.cities,
        isLoading: state.isLoading,
        currentCity: state.currentCity,
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
