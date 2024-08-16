import axios from "axios"
import PocketBase from 'pocketbase';


export default async function getinfo(props){
    const pb = new PocketBase('http://127.0.0.1:8090');
    const record = await pb.collection('Messages').create({Message:props.data});
    console.log(record)
}
function test(){
    
    axios.get("http://localhost:8090/api/collections/Messages/records").then((response)=>{
        console.log('data',response.data)
        const data=response.data
    }).catch((err)=>{
        console.log("Error: ",err.message)
    })
    const messageData = {
        Message: "Hello",
        collectionId: "ba4i0tco6r8xx15",
        collectionName: "Messages",
        created: "2024-08-16 00:25:10.012Z",
        id: "ib83hr4fsxa9q6r",
        updated: "2024-08-16 00:25:10.012Z"
      };
    axios.post("http://localhost:8090/api/collections/Messages/records",messageData).then((response)=>{
        console.log(response)
    })
}