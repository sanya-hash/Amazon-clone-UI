
import axios from "axios";
import { ContactData } from "./contactSlice";
import { base_url } from "../../../static/staticData";

const saveContact = async (contactData: ContactData) => {

    const response = await axios.post(`${base_url}/contacts`, contactData); // Assuming '/contacts' is the endpoint to save contact data
    return response.data; // Assuming the response contains any necessary data from the backend

};

const contactService = {
    saveContact,
};

export default contactService;
