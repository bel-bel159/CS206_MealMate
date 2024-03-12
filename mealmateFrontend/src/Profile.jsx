import React, { useEffect } from "react";
import user from "./assets/user.svg";
import next from "./assets/next.svg";
import "./style.css";

function Profile(){
    return (
        <div className="profile-page">
            
            <div className="card mb-3 mt-4 text-bg-warning mx-4 p-4 border rounded-5" >
                <div className="row g-0">
                    <div className="col-9">
                        <div className="card-body">
                            <h3 className="card-title">Javier</h3>
                            <p className="card-text pt-2">MealMate LITE<small className="text-body-secondary"></small></p>
                            <p className="card-text">Upgrade to MealMate PRO<small className="text-body-secondary"></small></p>

                        </div>
                    </div>
                    <div className="col-3">
                        <img src={user} alt="" style={{ width: "100px", height: "auto", marginTop: "20px" }} />
                    </div>
                </div>
            </div>

            <div className="container-fluid mealmate-bg-colour-mute">
                <div className="row p-2 border-bottom">
                    <h3><b>My Account</b></h3>
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Payment Methods</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Scheduled Orders</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>MealMate Vouchers</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Saved Places</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Update Profile</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Register to be a Student Deliverer</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <h3><b>General</b></h3>
                </div>

                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Help Centre</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Settings</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom">
                    <div className="col-9 m-2 p-2">
                        <h5>Language</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>
                <div className="row p-2 border-bottom pb-5 mb-4">
                    <div className="col-9 m-2 p-2">
                        <h5>Share Feedback</h5>
                    </div>
                    <div className="col-2 m-2 p-2 d-flex justify-content-end">
                        <img src={next} alt="" style={{ width: "20px", height: "auto" }} />
                    </div>
                    
                </div>

            </div>
            
        </div>
    );
        

    
    
}

export default Profile;


// const Profile = () => {
//     const [user, setUser] = useState({});
//     const [isUserUpdated, setIsUserUpdated] = useState(false);

    
//    useEffect(() => {
//     const getProfileData = async () => {
//         try{
//             const data = await axios.get("http://localhost:5000/api/v1/user", {
//                 headers: {
//                     Authorization: `bearer ${token}`,
                    
//                 },
//             });
//             setUser(data);
//             setIsUserUpdated(false);
//         }catch(error){
//                 console.log({error});
//         }          
//     };
//     getProfileData();
//    }, [token, isUserUpdated]);
   
//    return <div className="profile">
//     <div className = "avatar">
//         <div className="avatar-wrapper">
//             {user.avatarUrl ? (
//                 <img 
//                     src={user} 
//                     alt={`$(user.username} avatar`} 
//                 />
//             ) : (
//                 //if use has no image, use this icon as placeholder
//                 <user/>
//             )}
//             <UploadAvatar
//                 token = {token}
//                 userId={user.id}
//                 userName = {user.name}
//                 avatarUrl = {user.avatarUrl}
//                 setIsUserUpdated={setIsUserUpdated}
//             />
//         </div>
//     </div>
//         <p>Name: Javier</p>
//         <p>Email: javer@gmail.com</p>
        
//    </div>;
   
// };
