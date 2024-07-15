import axios from "axios";
import StatusModel from "../Models/StatusModel";

class FetchService{
    async fetchInitialState(){
        let response = await axios.get('https://localhost:7205/api/PanelStructure/GetAllMembers');
        console.log(response.data);
        return response.data;
    }
    async changeState(node : StatusModel){
        let response = await axios.put('https://localhost:7205/api/PanelStructure/UpdateMember',node);
        console.log(response.data);
        return response.data;
    }
}

export default new FetchService();