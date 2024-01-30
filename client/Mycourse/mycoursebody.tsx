"use client"
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { FaEdit,FaTimes } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'js-cookie';
import { SERVICE_URL } from '@/utils/endpoint';
import { axiosInstance } from '@/redux/interceptors';


interface course {
    id:string;
    courseImage: string,
    courseTitle: string;
    lectures: number;
    price: number;
  }



const Mycoursebody = () => {

    const user = Cookies.get('token');
    const [courses, setCourses] = useState<course[]>([]);
    
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const [selectedSort, setSelectedSort] = useState<string>("");
 

    useEffect(() => {
    const fetchCourses = async () => {

        try {
        const response = await axiosInstance.get(`${SERVICE_URL}paginatedcourses`, {

            params: { search, page: currentPage, limit: 5, sort: selectedSort}, 
        });

        const data: course[] = response.data.result;
        setCourses(data);
        setPageCount(response.data.pageCount);
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };

    fetchCourses();
    }, [user, search, currentPage, selectedSort]);

    


    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    };

    

   return (
    <div className='MycourseBody'>
        <section className="pt-0">
	        <div className="container">
                <div className="row">

                    {/* Sidebar */}
                    <div className="col-xl-3">
                  
                        <nav className="navbar navbar-light navbar-expand-xl mx-0">
                            <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div className="offcanvas-header bg-light">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body p-3 p-xl-0">
                                    <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                                        
                                    <div className="list-group list-group-dark list-group-borderless">
                                        <a className="list-group-item" href="dashboard"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                                        <a className="list-group-item active" href="mycourse"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                                        <a className="list-group-item" href="earning"><i className="bi bi-graph-up fa-fw me-2"></i>Earnings</a>
                                        <a className="list-group-item" href="studentslist"><i className="bi bi-people fa-fw me-2"></i>Students</a>
                                        <a className="list-group-item" href="orderslist"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                                        <a className="list-group-item" href="review"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                                        <a className="list-group-item" href="editprofile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                                        <a className="list-group-item" href="payout"><i className="bi bi-wallet2 fa-fw me-2"></i>Payouts</a>
                                        <a className="list-group-item" href="setting"><i className="bi bi-gear fa-fw me-2"></i>Settings</a>
                                        <a className="list-group-item" href="deleteaccount"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                                        <a className="list-group-item text-danger bg-danger-soft-hover" href="signin"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        
                    </div>
               
                    {/* rightSidebar the main content */}
                    <div className="col-xl-9">
                    
                        <div className="card border rounded-3">
                       
                            <div className="card-header border-bottom">
                                <h3 className="mb-0">My Courses List</h3>
                            </div>
                       
                            <div className="card-body">

                           

                                {/* Search & Sort Section */}
                                <div className="row g-3 align-items-center justify-content-between mb-4">
                                    
                                    <div className="col-md-8">
                                        <form className="rounded position-relative">
                                            <input 
                                            className="form-control pe-5 bg-transparent" 
                                            type="search" 
                                            placeholder="Search" 
                                            aria-label="Search"
                                            value={search}
                                            onChange={(e)=>setSearch(e.target.value)}
                                            />
                                            <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 "></i></button>
                                        </form>
                                    </div>

                        
                                    <div className="col-md-3">
                                     
                                        <form>
                                            <select 
                                            className="form-select js-choice border-0 z-index-9 bg-transparent"
                                             aria-label=".form-select-sm"
                                             value={selectedSort}
                                             onChange={(e) => setSelectedSort(e.target.value)}
                                             >
                                                <option value="">Sort by</option>
                                                <option>Free</option>
                                                <option value="Newest">Newest</option>
                                                <option>Most popular</option>
                                                <option>Most Viewed</option>
                                            </select>
                                        </form>
                                    </div>
                                </div>
                         


                                {/* table portion */}
                                <div className="table-responsive-lg border-0">
                                    <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                             
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 rounded-start">Course Title</th>
                                                <th scope="col" className="border-0">Enrolled</th>
                                                <th scope="col" className="border-0">Status</th>
                                                <th scope="col" className="border-0">Price</th>
                                                <th scope="col" className="border-0 rounded-end">Action</th>
                                            </tr>
                                        </thead>                     
                                        
                                        
                                        <tbody>
                                        {
                                          courses && courses.map((course) =>(
                                            <tr key={course.id}>
                                     
                                                <td>
                                                    <div className="d-flex align-items-center">
                                          
                                                        <div className="w-100px">
                                                            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${course.courseImage}`} width={100} height={100} className="rounded" alt="nonenone"/>
                                                        </div>
                                                        <div className="mb-0 ms-2">
                                             
                                                            <h6><a href="#">{course.courseTitle}</a></h6>
                                                    
                                                            <div className="d-sm-flex">
                                                                <p className="h6 fw-light mb-0 small me-3"><i className="fas fa-table text-orange me-2"></i>{course.lectures} lectures</p>
                                                                <p className="h6 fw-light mb-0 small"><i className="fas fa-check-circle text-success me-2"></i>0 Completed</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                 <td className="text-center text-sm-start">125</td>
                                     
                                                <td>
                                                    <div className="badge bg-success bg-opacity-10 text-success">Live</div>
                                                </td>
                                            
                                                <td>${course.price}</td>
                                      
                                                <td className="d-flex align-items-center mt-3">
                                                    <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-0" ><FaEdit/></a>
                                                    <button className="btn btn-sm btn-danger-soft btn-round mb-0" ><FaTimes/></button>
                                                </td>
                                            </tr>
                                        ))}

                                       



                                    


                                        </tbody>
                                        
                                    </table>
                                </div>
                               



                                {/* pagination */}
                                <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
                                 <p className="mb-0 text-center text-sm-start">Showing Page {currentPage}  of {pageCount}</p>
                                    <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                                        <ul className="pagination pagination-sm pagination-primary-soft mb-0 pb-0">
                                            {currentPage > 1 && (
                                                <li className="page-item mb-0">
                                                    <a className="page-link"  onClick={() => handlePageChange(currentPage - 1)}>
                                                        <RiArrowDropLeftLine className="text-[19px]" />
                                                    </a>
                                                </li>
                                            )}
                                            {[...Array(pageCount)].map((_, index) => (
                                                <li className={`page-item mb-0 ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                                    <a className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                        {index + 1}
                                                    </a>
                                                </li>
                                            ))}
                                            {currentPage < pageCount && (
                                                <li className="page-item mb-0">
                                                    <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                                        <RiArrowDropRightLine className="text-[19px]" />
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                        
                            </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Mycoursebody
