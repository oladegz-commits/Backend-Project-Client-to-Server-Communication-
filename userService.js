const arr = []; //Collection of users
import fs from "node:fs/promises";

function generateID(){
    if(arr.length === 0)
        return 1;
    const arr_user_id = arr.map(users=>users.id);
    return (Math.max(...arr_user_id) + 1);
}
export async function createUsersService(data){
    const id = generateID();
    data.id = id;
    arr.push (data);
    await fs.writeFile("./user_database.json", JSON.stringify(arr,null,2));
}
export function editUsersService(){
}
export function getUsersService(){
}
export function deleteUsersService(){
}