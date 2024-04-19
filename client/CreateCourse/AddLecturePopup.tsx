import React from 'react';

const AddLecturePopup = (props: { trigger: any; setTrigger: (arg0: boolean) => void; }) => {
  return (props.trigger)?(
    <div className='Popup'>
            <div className="modal-dialog">
                <div className="modal-content">
                      <div className="modal-header bg-dark">
                        <h5 className="modal-title text-white" id="addLectureLabel">Add Lecture</h5>
                        <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close" onClick={()=>props.setTrigger(false)}><i className="bi bi-x-lg"></i></button>
                      </div>
                      <div className="modal-body">
                        <form className="row text-start g-3">
                          
                          <div className="col-12">
                            <label className="form-label">Course name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter course name"/>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal" onClick={()=>props.setTrigger(false)}>Close</button>
                        <button type="button" className="btn btn-success my-0">Save Lecture</button>
                      </div>
                </div>
            </div>
      

    </div>

  ):"";
}

export default AddLecturePopup
