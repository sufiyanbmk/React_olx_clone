import React,{useEffect,useContext,useState} from 'react';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import './View.css';
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {Firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const {userId} = postDetails
    Firebase.firestore().collection('users').where('id','==',userId).get().then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
  },[])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
