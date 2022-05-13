import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Loader from './loder'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';

const schema = yup.object({
   title: yup.string().required('title is required'),
   description: yup.string().required('description is required'),
   category: yup.string().required('category is required'),
   price: yup.number().typeError('price is required'),
   image: yup.mixed().required('pls upload image'),
 }).required();

function AddItem() {
  const [title,setTitle] = useState();
  const [description,setdescription] = useState();
  const [price,setprice] = useState();
  const [category,setcategory] = useState();
  const [image,setimage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const formdata ={title,description,price,category,image}
  let location  = useLocation();
  console.log('location=>',location)
  
  const submitData =(e)=>{
     setIsLoading(true)
    axios.post('https://fakestoreapi.com/products',formdata).then(res=>{
       console.log(res);
       console.log(res.data);
       setIsLoading(false)
       if(res.status === 200){
         toast.success('Data Submitted Successfully')
       }else{
         toast.error('something went wrong')
       }
    }).catch(err=>{
       setIsLoading(false)
       console.log(err);
    })
  }

 const {register, handleSubmit, formState:{ errors }} = useForm({
   resolver: yupResolver(schema)
 });

 
 const submitForm = (data)=>{
   console.log(data)
   setIsLoading(true)
   axios.post('https://fakestoreapi.com/products',formdata).then(res=>{
      console.log(res);
      console.log(res.data);
      setIsLoading(false)
      if(res.status === 200){
        toast.success('Data Submitted Successfully')
      }else{
        toast.error('something went wrong')
      }
   }).catch(err=>{
      setIsLoading(false)
      console.log(err);
   })
 }

  return (
      <>
      
      {isLoading === true &&(
         <Loader />
      )}
      <ToastContainer />
    <h3 className='text-center text-white bg-info py-3'>AddItem</h3>
      {/* {location.pathname} */}
      {/* <div className="add-item">
          <div className="container">
              <div className="form card">
                  <div className="row p-4">
                 <div className="form-group col-md-6">
                    <label>Title</label>
                    <input type="text" onChange={e=>setTitle(e.target.value)} className="form-control" name='title' required />
                    
                 </div>
                 <div className="form-group col-md-6">
                    <label>Description</label>
                    <input type="text" onChange={e=>setdescription(e.target.value)} className="form-control" name='description' required />
                    
                 </div>
                 <div className="form-group col-md-6">
                    <label>Price</label>
                    <input type="number" onChange={e=>setprice(e.target.value)} className="form-control" name='Price' required />
                 </div>
                 <div className="form-group col-md-6">
                    <label>Category</label>
                    <input type="text" onChange={e=>setcategory(e.target.value)} className="form-control" name='category' required />
                 </div>
                 <div className="form-group col-md-12">
                    <label>Image</label>
                    <input type="file" onChange={e=>setimage(e.target.value)} className="form-control" name='image' required />
                 </div>
                 <div className='form-group col-md-6'>
                  <button type="submit" onClick={submitData} className="btn btn-primary">Submit</button>
                 </div>
                 </div>
              </div>
          </div>
      </div> */}
      {/*  second form */}

        <div className="container">
           <div className="card text-left">
              <form onSubmit={handleSubmit(submitForm)}>
              <div className="row p-4">
              <div className="form-group col-md-6 col-12">
                    <label>Title</label>
                    <input type="text"  className="form-control" {...register('title')}  />
                    <p className='error-msg'>{errors.title?.message}</p>
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Description</label>
                    <input type="text"  className="form-control" {...register('description')}  />
                    <p className='error-msg'>{errors.description?.message}</p>
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Price</label>
                    <input type="text"  className="form-control" {...register('price')}  />
                    <p className='error-msg'>{errors.price?.message}</p>
                 </div>
                 <div className="form-group col-md-6 col-12">
                    <label>Category</label>
                    <input type="text"  className="form-control" {...register('category')}  />
                    <p className='error-msg'>{errors.category?.message}</p>
                 </div>
                 <div className="form-group col-md-12 col-12">
                    <label>Image</label>
                    <input type="file"  className="form-control" {...register('image')}  />
                    <p className='error-msg'>{errors.image?.message}</p>
                 </div>
                 <div className='form-group col-md-6 col-12'>
                  <button type="submit"  className="btn btn-primary">Submit</button>
                 </div>
                 </div>
              </form>
           </div>
        </div>

    </>
  )
}

export default AddItem