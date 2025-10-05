import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const localData = localStorage.getItem("userData");
const getData = localData ? JSON.parse(localData) : [];

interface InitialState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl: string;
  currentPage: number;
  itemsPerPage: number;
  searchTerm: string;
}

const InitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  imageUrl: "",
  currentPage: 1,
  itemsPerPage: 4,
  searchTerm: "",
};

const register = createSlice({
  name: "register",
  initialState: InitialState,
  reducers: {
    handleSubmit: (state, actions) => {
      state.firstName = actions.payload.firstName;
      state.lastName = actions.payload.lastName;
      state.email = actions.payload.email;
      state.password = actions.payload.password;
      state.imageUrl = actions.payload.imageUrl;

      const newId = uuidv4();

      const newUser = {
        ...actions.payload,
        id: newId,
      };

      getData.push(newUser);

      console.log(newUser, "newUser");

      localStorage.setItem("userData", JSON.stringify(getData));
    },
    handleUpdateValues: (_, actions) => {
      const itemToUpdate = actions.payload;

      const newValue = getData.map(
        (item: {
          imageUrl: string;
          firstName: string;
          lastName: string;
          email: string;
          password: string;
          id: string;
        }) => {
          if (item.id === String(itemToUpdate.id)) {
            return itemToUpdate;
          } else {
            return item;
          }
        }
      );

      localStorage.setItem("userData", JSON.stringify(newValue));
    },
    handleDeleteValue: (state, actions) => {
      const itemToDelete = actions.payload;
      console.log(state, "state");

      const updateItems = getData.filter(
        (item: { id: string }) => item.id !== itemToDelete
      );

      localStorage.setItem("userData", JSON.stringify(updateItems));
    },
    nextPage: (state, actions) => {
      state.currentPage = actions.payload;
    },
    itemPerPages: (state, actions) => {
      console.log(state, actions, "actions, state 2nd");
      state.itemsPerPage = actions.payload;
    },
    setSearchTerm: (state, actions) => {
      state.searchTerm = actions.payload;
    },
  },
});

export const {
  handleSubmit,
  handleDeleteValue,
  handleUpdateValues,
  nextPage,
  itemPerPages,
  setSearchTerm,
} = register.actions;
export default register.reducer;
