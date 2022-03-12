import './Conversion_history.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Conversion_history() {
    const [conversions,setconversion]= useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/getConversions')
            .then(res => {
                
                setconversion(res.data.data)
                
                
            })
            .catch(err => {
                console.log(err)})
    },[])
    return (
        <>
        <div className='button-container' >
            <Link to="/"> <p className ="button-go-back" >{'<'} Go back</p>
            </Link>
            </div>
        <div className='main-container'>
            
            <div className='conversion-history'>
                <div className='names-container'>
                    <div className='names-style'>
                        date
                    </div>
                    <div className='names-style'>
                        From
                    </div>
                    <div className='names-style'>
                        To
                    </div>
                </div>
                {conversions.map((conversion,index)=>
                <div key={index} className='box-container'>
                    
                    <div className='value-style'>
                      {conversion.conversionDate}
                    </div>
                    <div className='value-style'>
                    {conversion.fromCurrency}
                    </div>
                    <div className='value-style'>
                    {conversion.toCurrency}
                    </div>
                </div>)}

            </div>
        </div>
        </>
    )
}
export default Conversion_history;


