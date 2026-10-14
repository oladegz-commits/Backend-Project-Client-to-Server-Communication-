
import {createUsers,editUsers,deleteUsers,getUsers} from "./userController.js";
export function router(req, res){
    try{
        if (!req.url.startsWith("/users")){
            const err = new Error("Route does not exist");
            err.status_code = 404;
            throw err;
        }
        if (req.method==="POST")
            createUsers(req,res);
        else if (req.method==="PATCH")
            editUsers(req,res);
        else if (req.method==="DELETE")
            deleteUsers(req,res);
        else if (req.method==="GET")
            getUsers(req,res);
        else{
            const err =  new Error("HTTP method not supported for the end point. Use 'GET','PATCH','DELETE', or'POST'");
            err.status_code = 405;
            throw err;
        } 
        return;
    }
    catch(error){
        if (error.status_code === 405){
           res.statusCode = error.status_code;
           res.statusMessage = error.message;
           res.setHeader('Allow', 'GET','POST','DELETE','PATCH');
           res.end();
           return;
        }
        else if(error.status_code === 404){
            res.statusCode = error.status_code;
            res.statusMessage = error.message;
            res.end();
            return;
        }  
        res.statusCode = 500//Default Error handler(for unexpected error not handled)
        res.statusMessage = `Internal Server Error: ${error.message}`;
        res.end(); 
    }    
}