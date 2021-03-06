import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from './loder'

function ProductList() {
 
    const [product,setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const BASE_URL = 'https://fakestoreapi.com';
    
    
    useEffect(() => {
      getAlldata()
    },[])
  
    const getAlldata =()=>{
      setIsLoading(true)
      axios.get(`${BASE_URL}/products`).then(res=>{
        console.log(res.data)
        setProduct(res.data)
        setIsLoading(false)
      })
    }
  
    const deleteProduct =(id)=>{
      console.log('id=>',id)
      setIsLoading(true)
      axios.delete(`${BASE_URL}/products/${id}`).then(res=>{
        console.log(res);
        console.log(res.data);
        if(res.status === 200 ){
          setIsLoading(false)
          toast.success('data has been deleted successfully')
        }else{
          setIsLoading(false)
          toast.error('something wrong')
        }
      })
      getAlldata();
    }

  return (
      <>
    {isLoading === true &&(
        <Loader />
     )}
     <ToastContainer />
      <h3 className='bg-info text-white py-3'>Product List</h3>
      <div className="text-right mb-3 mr-3">
      <Link to='/addItem'><button className='btn btn-primary ml-auto'>Add Item</button></Link>
      </div>
      <div className="container-fluid">
        <div className="wrapper">
          <div className="row">
      {product?.length > 0 && product.map((el)=>{
        return(
         <div key={el?.id} className="col-md-3 mb-3">
              <div className="card product-card" >
             <img src={el?.image} className="card-img-top border-bottom border-dark w-100" alt="product img"  />
             <div className="card-body">
               <p className="card-text">{el?.title}</p>
               <div className="d-flex justify-content-between">
                 <p><strong>Cate : {el?.category}</strong></p>
                 <p>Rate : {el?.rating?.rate}</p>
               </div>
               <div className="d-flex justify-content-between">
                 <p><strong>Price : {el?.price}</strong></p>
                 <p>Stock : {el?.rating?.count}</p>
               </div>
               <div className="action">
                 <div className="d-flex justify-content-between">
                  <Link  to={`/editproduct/${el?.id}`}> <a href='#' className='btn text-warning btn-outline-warning btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                 <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                 <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
               </svg></a>
                </Link>
                   <a href='#' onClick={(e)=>deleteProduct(el?.id)} className='btn text-danger btn-outline-danger btn-sm'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                   <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                 </svg>
                   </a>
                 </div>
                 
               </div>
             </div>
           </div>
            </div>
        )
      })}
            
          </div>
        </div>
      </div>
      </>
  )
}

export default ProductList