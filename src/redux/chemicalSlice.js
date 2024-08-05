import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

if (localStorage.getItem("chemicalInfo")) {
    initialState = JSON.parse(localStorage.getItem("chemicalInfo"));
} else {
    initialState = {
        chemicals: [
            { id: 1, name: "Hydrochloric Acid", formula: "HCl" },
            { id: 2, name: "Sodium Chloride", formula: "NaCl" },
            { id: 3, name: "Sulfuric Acid", formula: "H2SO4" },
            { id: 4, name: "Ammonia", formula: "NH3" },
            { id: 5, name: "Ethanol", formula: "C2H5OH" },
        ],
        searchName: "",
        isEdit: false,
        editItem: {}
    };
}

const chemicalSlice = createSlice({
    name: "chemicals",
    initialState,
    reducers: {
        deleteItem(state, action) { 
            state.chemicals = state.chemicals.filter(item => item.id !== action.payload);
            localStorage.setItem("chemicalInfo", JSON.stringify(state));
        },
        addItem(state, action) {
            let maxId = state.chemicals.reduce((curr, item) => Math.max(curr, item.id), 0);
            state.chemicals = [...state.chemicals, { id: state.chemicals.length < 1 ? 1 : maxId + 1, name: action.payload.name, formula: action.payload.formula }];
            localStorage.setItem("chemicalInfo", JSON.stringify(state));
        },
        updateItem(state, action) {
            state.chemicals = state.chemicals.map(item => item.id === action.payload.id ? action.payload : item);
            localStorage.setItem("chemicalInfo", JSON.stringify(state));
        },
        setSearchItem(state, action) {
            state.searchName = action.payload;
        },
        setIsEdit(state, action) {
            state.isEdit = action.payload.flag;
            state.editItem = state.chemicals.find(item => item.id === action.payload.id);
            localStorage.setItem("chemicalInfo", JSON.stringify(state));
        }
    }
});

export const { deleteItem, addItem, updateItem, setSearchItem, setIsEdit } = chemicalSlice.actions; // Added missing actions
export default chemicalSlice.reducer;
