"use client"
import {ChangeEvent, useState } from 'react';
import axios from 'axios';
import galary from '../assets/images/element/gallery.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SERVICE_URL } from '../../../utils/endpoint';
import Cookies from 'js-cookie';
import Popup from '../Createcourse/Popup';

import "../assets/vendor/stepper/css/bs-stepper.min.css";
import "../assets/vendor/quill/css/quill.snow.css";
import about04 from '../assets/images/about/04.jpg';



const Createcoursebody = () => {
  const user = Cookies.get('token');
  const [image, setImage] = useState<File| null>(null);
  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };


  const [activeStep, setActiveStep] = useState(1);
  const handleStepClick = (step: React.SetStateAction<number>) => {
    setActiveStep(step);
  };

  const [courseDetails, setCourseDetails] = useState({
    courseImage:'',
    courseTitle : '', 
    shortDescrp : '', 
    courseCategory: '', 
    courseLevel : '',
    courseLanguage : '', 
    price : '', 
    lectures : '', 
    purchaseDate: '', 
    period: '', 
    longDescrp : '',
    videoLink: '',
    video:''
  });

  const [buttonPopup, setButtonPopup] = useState(false);

  const router = useRouter(); 

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
      // Create FormData and append other form fields
      let formData = new FormData();
      formData.append('courseTitle', courseDetails.courseTitle);
      formData.append('shortDescrp', courseDetails.shortDescrp);
      formData.append('longDescrp', courseDetails.longDescrp);
      formData.append('courseCategory', courseDetails.courseCategory);
      formData.append('courseLevel', courseDetails.courseLevel);
      formData.append('courseLanguage', courseDetails.courseLanguage);
      formData.append('price', courseDetails.price);
      formData.append('period', courseDetails.period);
      formData.append('lectures', courseDetails.lectures);
      formData.append('videoLink', courseDetails.videoLink);
      formData.append('video', courseDetails.video);
      // Append the file to FormData
      formData.append('courseImage', image || '');
  
      // Make a POST request using axios
      const response = await axios.post(`${SERVICE_URL}createcoursewithimage`, formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: user 
        },
      });
      const responseData = response.data;
  
      if (responseData.success) {
        console.log(courseDetails);
        router.push('/courseadded');
      }    
  };
  

  return (
    
     <div className='createcourse'>
        <section className="py-0 bg-blue h-100px align-items-center d-flex h-200px rounded-0" style={{ background: "url(assets/images/pattern/04.png) no-repeat center center", backgroundSize: "cover" }}>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h1 className="text-white">Submit a new Course</h1>
                <p className="text-white mb-0">Read our <a href="#" className="text-white"><u>Before you create a course</u></a> article before submitting!</p>	
              </div>
            </div>
          </div>
        </section>


        <section>
          <div className="container">
                {/* headlines */}
                <div className="row">
                  <div className="col-md-8 mx-auto text-center">     
                    <p className="text-center">Use this interface to add a new Course to the portal. 
                    Once you are done adding the item it will be reviewed for quality. 
                    If approved, your course will appear for sale and you will be informed by email that your course has been accepted.
                    </p>
                  </div>
                </div>



                {/* card border  */}
                <div className="card border rounded-3 mb-5">

                  <div id="stepper" className="bs-stepper stepper-outline">
                
                         {/* lines */}
                        <div className="card-header bg-light border-bottom px-lg-5">
                        
                          <div className="bs-stepper-header" role="tablist">
                    
                            <div className={`step ${activeStep === 1 ? 'active' : ''}`} data-target="#step-1">
                              <div className="d-grid text-center align-items-center">
                                <button type="button" 
                                className="btn btn-link step-trigger mb-0" 
                                role="tab" 
                                id="steppertrigger1" 
                                aria-controls="step-1"
                                onClick={() => handleStepClick(1)}
                                >
                                  <span className="bs-stepper-circle">1</span>
                                </button>
                                <h6 className="bs-stepper-label d-none d-md-block">Course details</h6>
                              </div>
                            </div>


                            <div className="line"></div>
                
                        
                            <div className={`step ${activeStep === 2 ? 'active' : ''}`} data-target="#step-2">
                              <div className="d-grid text-center align-items-center">
                                <button type="button" 
                                className="btn btn-link step-trigger mb-0" 
                                role="tab" 
                                id="steppertrigger2" 
                                aria-controls="step-2"
                                onClick={() => handleStepClick(2)}
                                >
                                  <span className="bs-stepper-circle">2</span>
                                </button>
                                <h6 className="bs-stepper-label d-none d-md-block">Course media</h6>
                              </div>
                            </div>


                            <div className="line"></div>
                
                        
                            <div className={`step ${activeStep === 3 ? 'active' : ''}`} data-target="#step-3">
                              <div className="d-grid text-center align-items-center">
                                <button type="button" 
                                 className="btn btn-link step-trigger mb-0" 
                                 role="tab" 
                                 id="steppertrigger3" 
                                 aria-controls="step-3"
                                 onClick={() => handleStepClick(3)}
                                 >
                                  <span className="bs-stepper-circle">3</span>
                                </button>
                                <h6 className="bs-stepper-label d-none d-md-block">Curriculum</h6>
                              </div>
                            </div>


                            <div className="line"></div>
                
                          
                            <div className={`step ${activeStep === 4 ? 'active' : ''}`} data-target="#step-4">
                              <div className="d-grid text-center align-items-center">
                                <button 
                                type="button" 
                                className="btn btn-link step-trigger mb-0" 
                                role="tab" 
                                id="steppertrigger4" 
                                aria-controls="step-4"
                                onClick={() => handleStepClick(4)}
                                >
                                  <span className="bs-stepper-circle">4</span>
                                </button>
                                <h6 className="bs-stepper-label d-none d-md-block">Additional information</h6>
                              </div>
                            </div>
                          </div>
                        
                        </div>


                         {/* card-body */}
                        <div className="card-body">
                        
                          <div className="bs-stepper-content">
                              
                              {/* form portion */}
                            <form  onSubmit={handleSubmit}
                                id="coursedetailsform">  

                              {activeStep === 1 && 
                                <div>
                                    <h4>Course details</h4>

                                    <hr/>
                              
                                    <div className="row g-4">
                              
                                      <div className="col-12">
                                        <label className="form-label">Course title</label>
                                        <input 
                                          className="form-control" 
                                          type="text" 
                                          placeholder="Enter course title"
                                          name="courseTitle"
                                          value={courseDetails.courseTitle}
                                          onChange={handleChange}
                                        />
                                      </div>
                              
                              
                                      <div className="col-12">
                                        <label className="form-label">Short description</label>
                                        <textarea 
                                          className="form-control" 
                                          rows={2} 
                                          placeholder="Enter keywords"
                                          name="shortDescrp"
                                          value={courseDetails.shortDescrp}
                                          onChange={handleChange}
                                        >
                                        </textarea>
                                      </div>
                              
                              
                                      <div className="col-md-6">
                                        <label className="form-label">Course category</label>
                                        <select 
                                          className="form-select js-choice border-0 z-index-9 bg-transparent" 
                                          aria-label=".form-select-sm" 
                                          data-search-enabled="true"
                                          name='courseCategory'
                                          value={courseDetails.courseCategory}
                                          onChange={handleChange}
                                        >
                                            <option value="">Select category</option>
                                            <option>Engineer</option>
                                            <option>Medical</option>
                                            <option>Information technology</option>
                                            <option>Finance</option>
                                            <option>Marketing</option>
                                        </select>
                                      </div>
                              
                              
                                      <div className="col-md-6">
                                        <label className="form-label">Course level</label>
                                        <select 
                                          className="form-select js-choice border-0 z-index-9 bg-transparent" 
                                          aria-label=".form-select-sm" 
                                          data-search-enabled="false" 
                                          data-remove-item-button="true"
                                          name='courseLevel'
                                          value={courseDetails.courseLevel}
                                          onChange={handleChange}
                                        >
                                            <option value="">Select course level</option>
                                            <option>All level</option>
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advance</option>
                                        </select>
                                      </div>
                              
                              
                                      <div className="col-md-6">
                                        <label className="form-label">Language</label>
                                        <select 
                                          className="form-select js-choice border-0 z-index-9 bg-transparent" 
                                          aria-label=".form-select-sm" 
                                          data-max-item-count="3" 
                                          data-remove-item-button="true"
                                          name='courseLanguage'
                                          value={courseDetails.courseLanguage}
                                          onChange={handleChange}
                                        > 
                                          <option value="">Select language</option>
                                          <option>English</option>
                                          <option>German</option>
                                          <option>French</option>
                                          <option>Hindi</option>
                                        </select>
                                      </div>
                                
                                      <div className="col-md-6 d-flex align-items-center justify-content-start mt-5">
                                      <div className="form-check form-switch form-check-md">
                                        <input className="form-check-input" type="checkbox" id="checkPrivacy1"/>
                                        <label className="form-check-label" htmlFor="checkPrivacy1">Check this for featured course</label>
                                      </div>
                                      </div>
                              
                              
                                      <div className="col-md-6">
                                      <label className="form-label">Course time</label>
                                        <input 
                                          className="form-control" 
                                          type="text" 
                                          placeholder="Enter course time"
                                          name='period'
                                          value={courseDetails.period}
                                          onChange={handleChange}
                                        />
                                      </div>
                              
                                      <div className="col-md-6">
                                        <label className="form-label">Total lecture</label>
                                        <input 
                                          className="form-control" 
                                          type="text" 
                                          placeholder="Enter total lecture"
                                          name='lectures'
                                          value={courseDetails.lectures}
                                          onChange={handleChange}
                                        />
                                      </div>
                              
                              
                                      <div className="col-md-6">
                                        <label className="form-label">Course price</label>
                                        <input 
                                          type="text" 
                                          className="form-control" 
                                          placeholder="Enter course price"
                                          name='price'
                                          value={courseDetails.price}
                                          onChange={handleChange}
                                        />
                                      </div>
                              
                              
                                      <div className="col-md-6">
                                      <label className="form-label">Discount price</label>
                                      <input className="form-control" type="text" placeholder="Enter discount"/>
                                      <div className="col-12 mt-1 mb-0">
                                        <div className="form-check small mb-0">
                                          <input className="form-check-input" type="checkbox" id="checkBox1"/>
                                          <label className="form-check-label" htmlFor="checkBox1">
                                            Enable this Discount
                                          </label>
                                        </div>
                                      </div>
                                      </div>
                              
                              
                                      <div className="col-12">
                                      <label className="form-label">Add description</label>
                                
                                      <div className="bg-light border border-bottom-0 rounded-top py-3" >
                                      Normal Text
                                      </div>
                                
                                
                                      <div className="bg-body border rounded-bottom h-400px overflow-hidden" >
                                        <textarea
                                            className="w-100 h-100 border-0 p-3"
                                            placeholder="Type your text here..."
                                            rows={6}
                                            style={{ backgroundColor: '#222529', color: '#ffffff' }}
                                            name='longDescrp'
                                            value={courseDetails.longDescrp}
                                            onChange={handleChange}
                                        />
                                      </div>	
                                
                              
                                      <div className="d-flex justify-content-end mt-3">
                                       <button className="btn btn-primary next-btn mb-0" onClick={() => handleStepClick(2)} >Next</button>
                                      </div>
                                    </div>
                              
                                    </div>
                                </div>    
                              }


                              {activeStep === 2 && 
                                <div>
                                    <h4>Course media</h4>

                                    <hr/> 
                                
                                    <div className="row">
                                
                                    <div className="col-12">
                        
                                      <div className="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                            
                                        <Image src={image?URL.createObjectURL(image):galary} className="h-50px" width={100} height={100} alt=""/>
                                        <div>
                                          <h6 className="my-2">Upload course image here, or<a href="#!" className="text-primary"> Browse</a></h6>
                                          <label style={{ cursor: 'pointer' }}>
                                            <span> 
                                              <input 
                                              className="form-control stretched-link" 
                                              type="file" 
                                              name="my-image" 
                                              id="image" 
                                              accept="image/gif, image/jpeg, image/png"
                                              onChange={imageHandler}
                                              />
                                            </span>
                                          </label>
                                            <p className="small mb-0 mt-2">
                                              <b>Note:</b> Only JPG, JPEG and PNG. Our suggested dimensions are 600px * 450px. 
                                              Larger image will be cropped to 4:3 to fit our thumbnails/previews.
                                            </p>
                                        </div>	
                                      </div>
                            
                            
                                      <div className="d-sm-flex justify-content-end mt-2">
                                        <button type="button" className="btn btn-sm btn-danger-soft mb-3">Remove image</button>
                                      </div>
                                    </div> 
                                
                                      <div className="col-12">
                                        <h5>Upload video</h5>
                                      
                                        <div className="col-12 mt-4 mb-5">
                                          <label className="form-label">Video URL</label>
                                          <input 
                                            className="form-control"
                                            type="text" 
                                            placeholder="Enter video url"
                                            name='videoLink'
                                            value={courseDetails.videoLink}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div className="position-relative my-4">
                                          <hr/>
                                          <p className="small position-absolute top-50 start-50 translate-middle bg-body px-3 mb-0">Or</p>
                                        </div>
                                
                                        <div className="col-12">
                                          <label className="form-label">Upload video</label>
                                          <div className="input-group mb-3">
                                            <input type="file" className="form-control" id="inputGroupFile01"  accept="video/mp4,video/x-m4v,video/*" 
                                            name='video'
                                            value={courseDetails.video}
                                            onChange={handleChange}
                                            />
                                            <label className="input-group-text">.mp4/.WebM/.OCG</label>
                                          </div>
                                        </div>                                
                                
                                      {/* video preview functionality */}
                                        <h5 className="mt-4">Video preview</h5>
                                        <div className="position-relative">
                                      
                                          <Image src={about04} className="rounded-4" alt=""/>
                                          <div className="position-absolute top-50 start-50 translate-middle">
                                          
                                            <a href="https://www.youtube.com/embed/tXHviS-4ygo" className="btn btn-lg text-danger btn-round btn-white-shadow mb-0" data-glightbox="" data-gallery="video-tour">
                                              <i className="fas fa-play"></i>
                                            </a>
                                          </div>
                                        </div>
                                
                                
                                
                                      </div>
                                  
                                
                                    
                                      <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-secondary prev-btn mb-0" onClick={() => handleStepClick(1)}>Previous</button>
                                        <button className="btn btn-primary next-btn mb-0" onClick={() => handleStepClick(3)} >Next</button>
                                      </div>
                                    </div>
                                </div>       
                              }  


                              {activeStep === 3 &&           
                                <div>

                                  <h4>Curriculum</h4>
                            
                                  <hr/> 
                            
                                  <div className="row">
                                    
                                    <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                                      <h5 className="mb-2 mb-sm-0">Upload Lecture</h5>
                                      <a href="#" className="btn btn-sm btn-primary-soft mb-0" data-bs-toggle="modal" data-bs-target="#addLecture" onClick={()=>setButtonPopup(true)}><i className="bi bi-plus-circle me-2"></i>Add Lecture</a>                       
                                    </div>

                                    {/* Popup modal for add lecture */}
                                    <Popup trigger ={buttonPopup} setTrigger ={setButtonPopup}>                          
                                    </Popup>
                                  
                                    <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                                  
                                      <div className="accordion-item mb-3">
                                        <h6 className="accordion-header font-base" id="heading-1">
                                          <button className="accordion-button fw-bold rounded d-inline-block collapsed d-block pe-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="false" aria-controls="collapse-1">
                                            Introduction of Digital Marketing 
                                          </button>
                                        </h6>
                            
                                        <div id="collapse-1" className="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
                                      
                                          <div className="accordion-body mt-3">
                                      
                                            <div className="d-flex justify-content-between align-items-center">
                                              <div className="position-relative">
                                                <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"><i className="fas fa-play"></i></a>
                                                <span className="ms-2 mb-0 h6 fw-light">Introduction</span>
                                              </div>
                                      
                                              <div>
                                                <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit"></i></a>
                                                <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times"></i></button>
                                              </div>
                                            </div>
                                        
                                            <hr/>
                            
                                            <div className="d-flex justify-content-between align-items-center">
                                              <div className="position-relative">
                                                <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"><i className="fas fa-play"></i></a>
                                                <span className="ms-2 mb-0 h6 fw-light">What is Digital Marketing</span>
                                              </div>
                                            
                                              <div>
                                                <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit"></i></a>
                                                <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times"></i></button>
                                              </div>
                                            </div>
                                          
                                            <hr/>
                                        
                            
                                        
                                            <a href="#" className="btn btn-sm btn-dark mb-0" data-bs-toggle="modal" data-bs-target="#addTopic"><i className="bi bi-plus-circle me-2"></i>Add topic</a>
                                          </div>
                                    
                                        </div>
                                      </div>
                              
                                      <div className="accordion-item mb-3">
                                        <h6 className="accordion-header font-base" id="heading-2">
                                          <button className="accordion-button fw-bold rounded d-inline-block collapsed d-block pe-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                            Customer Life cycle
                                          </button>
                                        </h6>
                            
                                        <div id="collapse-2" className="accordion-collapse collapse" aria-labelledby="heading-2" data-bs-parent="#accordionExample2">
                                          <div className="accordion-body mt-3">
                                          
                                            <a href="#" className="btn btn-sm btn-dark mb-0" data-bs-toggle="modal" data-bs-target="#addTopic">
                                              <i className="bi bi-plus-circle me-2"></i>Add topic
                                            </a>	
                                          </div>
                                        </div>
                                      </div>
                            
                                      <div className="accordion-item mb-3">
                                        <h6 className="accordion-header font-base" id="heading-3">
                                          <button className="accordion-button fw-bold collapsed rounded d-block pe-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                                            How much should I offer the sellers? 
                                          </button>
                                        </h6>
                                        
                                        <div id="collapse-3" className="accordion-collapse collapse" aria-labelledby="heading-3" data-bs-parent="#accordionExample2">
                                          <div className="accordion-body mt-3">
                                            
                                            <a href="#" className="btn btn-sm btn-dark mb-0" data-bs-toggle="modal" data-bs-target="#addTopic">
                                              <i className="bi bi-plus-circle me-2"></i>Add topic
                                            </a>
                                          </div>
                                        </div>
                                      </div>	
                                      
                            
                                    </div>
                                  
                            
                                  
                                    <div className="d-flex justify-content-between">
                                      <button className="btn btn-secondary prev-btn mb-0" onClick={() => handleStepClick(2)}>Previous</button>
                                      <button className="btn btn-primary next-btn mb-0" onClick={() => handleStepClick(4)}>Next</button>
                                    </div>
                                  </div>
                                          
                                </div>
                              }


                              {activeStep === 4 && 
                                <div>
                                    <h4>Additional information</h4>

                                    <hr/> 

                                    <div className="row g-4">
                                      

                                      <div className="col-12">
                                        <div className="bg-light border rounded p-2 p-sm-4">
                                          <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                                            <h5 className="mb-2 mb-sm-0">Upload FAQs</h5>
                                            <a href="#" className="btn btn-sm btn-primary-soft mb-0" data-bs-toggle="modal" data-bs-target="#addQuestion"><i className="bi bi-plus-circle me-2"></i>Add Question</a>
                                          </div>

                                          <div className="row g-4">
                                            <div className="col-12">
                                              <div className="bg-body p-3 p-sm-4 border rounded">
                                              
                                                <div className="d-sm-flex justify-content-sm-between align-items-center mb-2">
                                            
                                                  <h6 className="mb-0">How Digital Marketing Work?</h6>
                                            
                                                  <div className="align-middle">
                                                    <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit"></i></a>
                                                    <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times"></i></button>
                                                  </div>
                                                </div>
                                              
                                                <p>Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor joy. She rapturous suffering concealed.</p>
                                              </div>
                                            </div>

                                            <div className="col-12">
                                              <div className="bg-body p-4 border rounded">
                                              
                                                <div className="d-sm-flex justify-content-sm-between align-items-center mb-2">
                                                
                                                  <h6 className="mb-0">How Digital Marketing Work?</h6>
                                                
                                                  <div className="align-middle">
                                                    <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit"></i></a>
                                                    <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times"></i></button>
                                                  </div>
                                                </div>
                                              
                                                <p>Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor joy. She rapturous suffering concealed.</p>
                                              </div>	
                                            </div>
                                          </div>
                                        </div>	
                                      </div>
                                            


                                        <div className="col-12">
                                          <div className="bg-light border rounded p-4">
                                            <h5 className="mb-0">Tags</h5>
                                          
                                            <div className="mt-3">
                                              <input type="text" className="form-control js-choice mb-0" data-placeholder="true" data-placeholder-val="Enter tags" data-max-item-count="14" data-remove-item-button="true"/>
                                              <span className="small">Maximum of 14 keywords. Keywords should all be in lowercase and separated by commas. e.g. javascript, react, marketing</span>
                                            </div>
                                          </div>
                                        </div>
                                            


                                        <div className="col-12">
                                          <div className="bg-light border rounded p-4">
                                            <h5 className="mb-0">Message to a reviewer</h5>


                                            <div className="mt-3">
                                              <textarea className="form-control" rows={4} placeholder="Write a message" spellCheck="false"></textarea>
                                              <div className="form-check mb-0 mt-2">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                  Any images, sounds, or other assets that are not my own work, have been appropriately licensed for use in the file preview or main course. Other than these items, this work is entirely my own and I have full rights to sell it here.
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        

                                      <div className="d-md-flex justify-content-between align-items-start mt-4">
                                        <button className="btn btn-secondary prev-btn mb-2 mb-md-0" onClick={() => handleStepClick(3)}>Previous</button>
                                        <button className="btn btn-light me-auto ms-md-2 mb-2 mb-md-0">Preview Course</button>
                                        <div className="text-md-end">
                                        <button className="btn btn-primary next-btn mb-0" type='submit'>Submit</button>
                                          <p className="mb-0 small mt-1">Once you click Submit a Course, your course will be uploaded and marked as pending for review.</p>
                                        </div>
                                      </div>

                                    </div>
                                </div>                                                           
                              }  

                            </form>
                           
                           
                          </div>
                        </div>

                  </div>
                </div>


          </div>
        </section>

  




     </div>




  )
}

export default Createcoursebody
