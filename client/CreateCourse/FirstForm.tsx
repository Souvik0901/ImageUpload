'use client';

import {ChangeEvent, useState } from 'react';
import axios from 'axios';
import galary from '../assets/images/element/gallery.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const FirstForm = () => {

  
  const [image, setImage] = useState<File| null>(null);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setImage(files[0]);
    }
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
    longDescrp : ''
  });




  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };
  
  const router = useRouter();
 
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

  
      // Append the file to FormData
      formData.append('courseImage', image || '');
  
      // Make a POST request using axios
      const response = await axios.post('http://localhost:3001/node/api/core/createcoursewithimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
  
      const responseData = response.data;
  
      if (responseData.success) {
        console.log(courseDetails);
        router.push('/courseadded');
      } 
    
  };
  

  return (

           
    <form onSubmit={handleSubmit}
    id="coursedetailsform">            
                        
                       
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
      <button className="btn btn-primary next-btn mb-0" type='submit'>Submit</button>
      </div>
      </div>

      </div>

   </form>


 
  )
}

export default FirstForm
