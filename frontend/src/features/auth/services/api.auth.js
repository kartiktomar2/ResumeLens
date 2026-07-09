import axios from "axios"

const api= axios.create({
       baseURL:"http://localhost:3000",
       withCredentials:true
})

export async function registerUser({username, email, password})
{
      try {
            const response= await api.post("/api/auth/register",{
                username,email,password
            },
        )
        return response.data;
      } catch (error) {
          console.log("error received in frontend while registering user is: ",error.response.data)
          throw error
      }    
}


export async function loginUser({email,password}){
    try {
        const response=  await api.post("/api/auth/login",{
               email,
               password
        })
        console.log("response is: ",response.data.data)
        return response.data;
    } catch (error) {
        console.log("error received in frontend while login is: ", error.response.data);
         throw error
    }

}

export async function logoutUser() {
    try {
        await api.post("/api/auth/logout");
          
    } catch (error) {
         console.log("error received in frontend while logout is: ",error.response.data)
    }
}


export async function getCurrentUser() {
    try {
        // console.log("api called")
        const response=  await api.get("/api/auth/current-user");
        // console.log("api finished", response.data)
        
        return response.data;

    } catch (error) {
         console.log("error received in frontend while getCurrentUser is: ",error.response.data)
         throw error;
    }
}