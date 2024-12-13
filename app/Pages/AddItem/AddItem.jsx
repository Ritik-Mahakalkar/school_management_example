'use client'
import React from 'react'
import {useState} from 'react'

import "./additem.css"
import upload_area from "../../../public/upload_area.png"
const AddItem = () => {
  const [image,setImage]=useState(false);
    const [data,setData]=useState({
      name:"",
      address:"",
      city:"",
      email:"",
      contact:"",
      state:""
    })
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      formData.append('image', image);
  
      const res = await fetch('/api/school/add', {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        console.log('School added successfully!');
      } else {
        console.log('Failed to add school!');
      }
    };
   

    

  return (
    <div>
      
      <form action='' className='add_product'  onSubmit={onSubmit}>
        <div className="productfild">
            <h2>Add school</h2>
            <div className=" input_box">
            
             <input   type="text"  onChange={onChangeHandler} value={data.name} name='name' required/>
             <label > Name</label>
        </div>
       
        <div className=" input_box">
            
             <input   type="email"  onChange={onChangeHandler} value={data.email} name='email' required/>
             <label >email</label>
        </div>
        <div className=" input_box">
            
             <input   type="number"   onChange={onChangeHandler} value={data.contact} name='contact' required/>
             <label >Phone</label>
        </div>
        <div className=" input_box">
            
             <input   type="text" onChange={onChangeHandler} value={data.city} name='city' required/>
             <label > City</label>
        </div>
        <div className=" input_box">
            
            <input   type="text" onChange={onChangeHandler} value={data.state} name='state' required/>
            <label > State</label>
       </div>
        <div className=" input_box">
            
             <input   type="text" onChange={onChangeHandler} value={data.address} name='address' required/>
             <label > Address</label>
        </div>
       
        <div className="addproduct_itemfield">
          
        <label htmlFor="image">
          <h4>upload</h4>
            <img src={image?URL.createObjectURL(image):upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
          
        </div>
        
        <button className="add_btn" >Submit</button>
        </div>
        
    </form>
      
    </div>
  )
}

export default AddItem
