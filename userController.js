import{createUsersService,editUsersService,getUsersService,deleteUsersService} from"./userService.js"

function getRequestBody(req){
    return new Promise((resolve,reject) => {
        let body = ""
        req.setEncoding("utf8");
        req.on("data", (chunk) =>{
            body = body + chunk;
            resolve(body.trim());  
        });
        req.on("end", ()=> {
            if(body.trim().length ===0){
                const err = new Error("Request body is required");
                err.status_code = 400;
                reject(err);
            }
        });
    });
}

async function createAndEditLogic(req,res,serviceLogic,response_text,success_code){
    try{
        if(req.headers["content-type"]!=="application/json"){
            const err = new Error("Unsupported media type.Expected application/json");
            err.status_code = 415;
            throw err;
        }
        const body = await getRequestBody(req);
        const data = JSON.parse(body.trim());
        await serviceLogic(data);
        res.statusCode = success_code;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end(response_text);
     }
    catch(error){
        if(error.status_code === 415 ||error.status_code === 400){
            res.statusCode = error.status_code;
            res.statusMessage = error.message;
            res.end();
        }
        else{
            //Default Error handler(for unexpected error not handled)
            res.statusCode = 500
            res.statusMessage = "Internal Server Error";
            res.end(); 
        }
    }
}

export function createUsers(req,res){
    const message = "User created successfully";
    const success_code = 201;
    createAndEditLogic(req,res,createUsersService,message,success_code);
}

export function editUsers(req,res){
    const message = "User details edited successfully";
    const success_code = 200;
    createAndEditLogic(req,res,editUsersService,message,success_code);
}

export function getUsers(req,res){
    try{
        const body =  getUsersService(req,res);;
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.statusMessage = body.message;
        res.end(JSON.stringify(body.data));
    }
      catch{}
}
export function deleteUsers(req,res){
    try{
        const check = deleteUsersService(req,res);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        if (check === 1)
            res.end("User succesfully deleted");
        else if (check==0)
            res.end("All users succesfully deleted");
    }
    catch{}
}

