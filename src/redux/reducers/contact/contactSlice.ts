import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import contactService from "./contactService";


export interface ContactData {
    id?: string | null; // Assuming the contact has an ID
    name?: string | null; // Assuming the contact has a name field
    email?: string | null; // Assuming the contact has an email field
    phone?: string | null; // Assuming the contact has a phone field
    comment?: string | null; // Assuming the contact has a comment field
}

interface ContactState {
    contact:ContactData | null,
    isLoading: boolean,
    isSuccess: boolean,
    isError:boolean,
    errorMessage:string
}

const initialState:ContactState = {
    contact:null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
};

export const saveContact = createAsyncThunk('contactSlice/saveContact', async (contactData:ContactData, thunkAPI) => {
    try {
        const response = await await contactService.saveContact(contactData) // Assuming '/contacts' is the endpoint to save contact data
        return response.data; // Assuming the response contains any necessary data from the backend
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});

const contactSlice = createSlice({
    name: 'contactSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveContact.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(saveContact.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.errorMessage = "";
                toast.success("Added Successfully", {
                    position: "top-right"
                })
            })
            .addCase(saveContact.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to save contact information.";
                toast.error(state.errorMessage, {
                    position: "top-right"
                })
            });
    },
});

export default contactSlice.reducer;
