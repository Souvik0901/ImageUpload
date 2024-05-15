
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { FaPaperPlane, FaStar,  FaRegStar,  FaCheck } from "react-icons/fa";
import Cookies from 'js-cookie';
import { SERVICE_URL } from '@/utils/endpoint';
import { axiosInstance } from '@/redux/interceptors';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import defaultImg from '../assets/images/avatar/defaultprofile.png';



interface Review {
  reply: string;
  id: string;
  review: string;
  ratings: string;

  courseId: {
    _id:string;
    courseImage: string;
    courseTitle: string;
    lectures: number;
    price: number;
  };
  student:{
    _id:string;
    name:string;
    profileImg: string;
  };
  _id:string;
}



const ReviewBody = () => {
  const router = useRouter();
  const [review, setReview] = useState<Review[]>([]);
  const [replyDetails, setReplyDetails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchreviewedData = async () => {
      try {
          const reviewedResponse = await axiosInstance.get(`${SERVICE_URL}getreviews`);
          console.log('Reviewed Response:', reviewedResponse.data.data);
          setReview(reviewedResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchreviewedData();
  }, []);



  const renderStars = (ratings: string) => {
    // Extract the rating number using regular expression
    const match = ratings.match(/\((\d)\/5\)/);
    const ratingNumber = match ? parseInt(match[1]) : NaN;
  
    // console.log('Rating:', ratings, 'Rating Number:', ratingNumber);
  
    // Ensure ratingNumber is within range (1 to 5)
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      console.error('Invalid rating:', ratings);
      return null; 
    }
  
    // Fill arrays with stars based on ratingNumber
    const fullStars = Array(ratingNumber).fill(<FaStar />);
    const emptyStars = Array(5 - ratingNumber).fill(<FaRegStar />);
  
    // Concatenate and map stars to JSX elements
    return [...fullStars, ...emptyStars].map((star, index) => (
      <span key={index}>{star}</span>
    ));
  };
  

 const postReply = async (reviewId: string) => {
    try {
      const replyData = new FormData();
      replyData.append('reply', replyDetails[reviewId]);
      replyData.append('reviewId', reviewId);
      const res = await axiosInstance.post(`${SERVICE_URL}sendreply`, replyData);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, reviewId: string) => {
    const { value } = e.target;
    setReplyDetails(prevState => ({
      ...prevState,
      [reviewId]: value
    }));
  };
  

  
  
  const signOut = async()=>{
    try {
        const response = await axios.post(`${SERVICE_URL}logout`, {token:Cookies.get('token')});
        console.log(response); 
        Cookies.remove('token');
        router.push('/login');
      } catch (error:any) {
        console.log(error);
      }
  }

   return (
    <div className='ReviewBody'>
        <div className="container">
          <div className="row">
          
            <div className="col-xl-3">
              
              <nav className="navbar navbar-light navbar-expand-xl mx-0">
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              
                  <div className="offcanvas-header bg-light">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                 
                  <div className="offcanvas-body p-3 p-xl-0">
                    <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                    
                      <div className="list-group list-group-dark list-group-borderless">
                        <a className="list-group-item" href="dashboard"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                        <a className="list-group-item" href="mycourse"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                        <a className="list-group-item" href="earning"><i className="bi bi-graph-up fa-fw me-2"></i>Earnings</a>
                        <a className="list-group-item" href="studentslist"><i className="bi bi-people fa-fw me-2"></i>Students</a>
                        <a className="list-group-item" href="orderslist"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                        <a className="list-group-item active" href="reviews"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                        <a className="list-group-item" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                        <a className="list-group-item" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                        <p className="list-group-item text-danger bg-danger-soft-hover cursor-pointer" onClick={()=>{signOut()}}><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</p>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
             
            </div>
          

            <div className="col-xl-9">     
              <div className="card border rounded-3">
              
                <div className="card-header border-bottom">
                  <div className="row justify-content-between align-middle">
                   
                    <div className="col-sm-6">
                      <h3 className="card-header-title mb-2 mb-sm-0">Student review</h3>
                    </div>
                    
                 
                    <div className="col-sm-4">
                      <form>
                        <select className="form-select js-choice z-index-9 bg-white" aria-label=".form-select-sm">
                          <option value="">Sort by</option>
                          <option>★★★★★ (5/5)</option>
                          <option>★★★★☆ (4/5)</option>
                          <option>★★★☆☆ (3/5)</option>
                          <option>★★☆☆☆ (2/5)</option>
                          <option>★☆☆☆☆ (1/5)</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              


                <div className="card-body mt-2 mt-sm-4">
                {/* single content */}
                  <>
                  {Array.isArray(review) && review.map((Review) => (
                      <>
                  
                        <div className="d-sm-flex" key={Review._id}> 
                      
                            {Review.student.profileImg ? (
                                <Image src={Review.student.profileImg} width={100} height={100} className="avatar avatar-lg rounded-circle float-start me-3" alt="student-image" />
                                ) : (
                                <Image src={defaultImg} width={100} height={100} className="avatar avatar-lg rounded-circle float-start me-3" alt="default-image" />
                            )}          
        
                          <div>
                            <div className="mb-3 d-sm-flex justify-content-sm-between align-items-center">         
                              <div>
                                <h5 className="m-0" style={{color: "palevioletred"}}>{Review.student.name}</h5>
                                <span className="me-3 small">June 11, 2021 at 6:01 am </span>
                              </div>          
                              <div className="star-ratings" style={{ display: "flex", color: "yellow"}}>
                                {renderStars(Review.ratings)}
                              </div>
                            </div>        
                            <h6 style={{color: "burlywood"}}><span className="text-body fw-light" >Review on: </span>{Review.courseId.courseTitle}</h6>
                            <p>{Review.review}</p>              
                            <div className="text-end">
                            

                              
                              {Review.reply === "" ? (
                                  <div className="collapse show" id="collapseComment" style={{ visibility: "visible" }}>
                                    <div className="d-flex mt-3">
                                      <textarea 
                                        className="form-control mb-0" 
                                        placeholder="Add a comment..." 
                                        rows={2}
                                        spellCheck="false" 
                                        name="reply"
                                        value={replyDetails[Review._id] || ''}
                                        onChange={(e) => handleChange(e, Review._id)}
                                      ></textarea>
                                      <button className="btn btn-sm btn-primary-soft ms-2 px-4 mb-0 flex-shrink-0" onClick={() => postReply(Review._id)}>
                                        <i className="fas fa-paper-plane fs-5"><FaPaperPlane/></i>
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="collapse show" id="collapseComment" style={{ visibility: "visible" }}>
                                    <div className="d-flex mt-3">
                                      <textarea 
                                        className="form-control mb-0" 
                                        placeholder="Add a comment..." 
                                        rows={2}
                                        spellCheck="false" 
                                        value={Review.reply}
                                      ></textarea>
                                        <div className="replied" style={{
                                          width: "75px",
                                          height: "70px",
                                          backgroundColor: "#189c36fc", // Note: Background color should be enclosed in quotes
                                          color: "#fff",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          borderRadius: "50%"
                                        }}>
                                          <div className="fas fa-paper-plane fs-5"><FaCheck/></div>
                                        </div>


                                    </div>
                                  </div>
                                )}

                            </div>
                          </div>
                        </div>
                        <hr/>
                      </>
                  ))}
                
                  </>                
                </div>


             
                <div className="card-footer border-top">   
                  <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                    <p className="mb-0 text-center text-sm-start">Showing 1 to 8 of 20 entries</p>
          
                    <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                      <ul className="pagination pagination-sm pagination-primary-soft my-0 py-0">
                        <li className="page-item my-0"><a className="page-link" href="#" tabIndex={-1}><i className="fas fa-angle-left"></i></a></li>
                        <li className="page-item my-0"><a className="page-link" href="#">1</a></li>
                        <li className="page-item my-0 active"><a className="page-link" href="#">2</a></li>
                        <li className="page-item my-0"><a className="page-link" href="#">3</a></li>
                        <li className="page-item my-0"><a className="page-link" href="#"><i className="fas fa-angle-right"></i></a></li>
                      </ul>
                    </nav>
                  </div>     
                </div>

                
              </div>
              
            </div>
            
          </div>
        </div>
    </div>
  )
}
export default ReviewBody
