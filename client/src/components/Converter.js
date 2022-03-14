import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';

import './Converter.css';
import switcher from './../assets/Switcher.png';
import { Link } from "react-router-dom";
import swal from 'sweetalert'

function Converter() {

    
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("EUR");
    const [to, setTo] = useState("USD");
    
    const options = ['USD','EUR','CHF']
    const [output, setOutput] = useState(0);
    
    // Calling the convert function whenever
    // a user switches the currency
    // useEffect(() => {
    //     setOptions(Object.keys(info));
    //     convert();
    //     console.log(options);
    // }, [info])
    // Function to convert the currency
    async function convert() {
        if (input > 0){
        const req ={fromCurrency:from,toCurrency:to,amountToConvert:input};
        console.log(req);
        

      await  Axios.post('http://localhost:3000/convert',req).then((data) => {  
          console.log(data.data)
           
        setOutput(data.data.value);
             }).catch( (err) => console.log(err) )
            }
            else {
                swal ('','Please enter a valide amount',"info");
            }
        
    }
    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
        convert();
    }
    return (
        <div className="converter-container">
            <div className="converter-headline-container">
                <div className="converter-headline">
                    Convert currencies in real-time.
                </div>
            </div>
            <div className="converter-elements-container-1">
                <div className="converter-elements-container-2">
                    <div className="converter-elements-row1-container">

                        <div className="converter-inputs-container">
                            <div className="dropdown">
                                <label className="name">Amount
                                    <input id="input-style" type="text" placeholder="0" onChange={(e) => setInput(e.target.value)} />
                                </label>
                            </div>
                        </div>
                        <div className="converter-inputs-container">
                            <div className="dropdown">
                                <label className="name">From
                                    <Dropdown className="dropdown-style" options={options}
                                        onChange={(e) => { setFrom(e.value) }}
                                        value={from} placeholder="From" />
                                </label>
                            </div>
                        </div>
                        <div className="converter-inputs-container" >
                            <img className="switcher"alt="switcher" src={switcher} onClick={() => { flip() }} />
                        </div>
                        <div className="converter-inputs-container">
                            <div className="dropdown">
                                <label className="name">To
                                    <Dropdown className="dropdown-style" options={options}
                                        onChange={(e) => { setTo(e.value) }}
                                        value={to} placeholder="To" />
                                </label>
                            </div>
                        </div>
                        <div className="converter-button-container">
                            <button className="button-style" disabled={input === "0" || input === "" || input < 0} onClick={() => { convert() }}>
                                <div className="button-value"> Convert
                                </div>
                            </button>
                        </div>
                        <div >
                            <Link to="/Conversion_history"><p className="button-view-history" >
                                View conversion history {'>'}
                            </p> </Link>
                        </div>
                    </div>

                    <div className="converter-elements-row2-container">
                        <div className="result-input">{input + " " + from + " = "}</div>
                        <div className="result-output">{output + " " + to}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Converter;