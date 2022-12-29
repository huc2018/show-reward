import { useState,useEffect } from 'react';
import './App.css';
function App() {
  const [data, setData] = useState(null);
    const getData=() => {
      fetch('data.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      ).then(function(response){
        console.log(response)
        return response.json();
      }).then(setData);
    }

    useEffect(()=>{
      getData()
    },[])
    function calDate(number){ 
    	let now=new Date();
    	let date=new Date(now.getTime()-number*24*3600*1000);
    	let year=date.getFullYear();
    	let month=date.getMonth()+1>9?date.getMonth()+1:"0"+(date.getMonth()+1);
    	let day=date.getDate()>9?date.getDate():"0"+date.getDate();
    	let predate=year+"-"+month+"-"+day;
    	return predate;
    }
 
    function calreward(amount) {
      if(amount >50 && amount<= 100){
        return 50;
      } else if (amount > 100) {
        if (amount % 50 === 0) {
          return amount/50 * 50
        } else {
          return ((amount-amount%50)/50)/2*50 + amount%50 * 2
        }
      }
      return 0;
    }
    // if(data) 
    let filterdata = data.filter(item => new Date(item.date) > new Date (calDate(90)))
    console.log(filterdata)

    // return  <pre> {JSON.stringify(data,null,2)} </pre>

    return (
      <div>
      <table>
        <caption>Purchase history</caption>
        <thead>
        <tr>
          <th>Price</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {data.map(item => (
          <tr key={item.trans_id}>
          <td >{item.amount}</td>
          <td >{item.date}</td>
          </tr>
        ))}    
        </tbody>      

      </table>
      <br />
      <br />
      <br />
      <table>
        <caption>Reward in last 3 mounths</caption>
        <thead>
        <tr>
          <th>Price</th>
          <th>Date</th>
          <th>Reward</th>
        </tr>
        </thead>

        <tbody>
          {filterdata.map(item => (
            // if(new Date(item.date) > new Date(calDate))
            <tr key={item.trans_id}>
              <td >{item.amount}</td>
              <td >{item.date}</td>
              <td>{calreward(item.amount)}</td>
            </tr>
          ))} 
        </tbody>
        
      </table>
      </div>
      

    );
   
}
export default App;
