import React,{useState,useEffect} from 'react'
import './Crud.css'
const Crud = () => {
    const intialValue={
        firstname:'',
        country:'',
        number:'',
        role:''
    }
    const [Inputvalues,setInputvalues]=useState(intialValue)
    const [store,setStore] = useState([]) //storing the data
    const [InputErrors,setInputErrors]=useState({})//throws errors
    const [isSubmit,setIssubmit]=useState(false) //false conditon then update ture
    const [search,setsearch]=useState("") 
//input chandler the onchange event purpose
    const changeHandler=(event)=>{
        setInputvalues({...Inputvalues,[event.target.name]:event.target.value})
    }
//creating the submit Handler the from the overriding
    const submitHandler=(e)=>{
        e.preventDefault()
 //incase any errors the validate functinon as inputValues
        setInputErrors(Validate(Inputvalues))
        setIssubmit(true)//flase condition changing the ture condition
    }
    useEffect(()=>{
            if(Object.keys(InputErrors).length===0 && isSubmit){  //passing conditional keys and length applyed && opeator 
                const newStore=[...store,Inputvalues] 
                setStore(newStore) //upadting the store
            }
    },[InputErrors])

//delete button function
    const deleteHandler=(indexvalue)=>{
        const FilteredCrud=store.filter((elem,index)=>index !== indexvalue)
        setStore(FilteredCrud)
    }

//edit button function 
const editHandler=(editIndexvalue)=>{
    const FilteredCrud=store.filter((elem,index)=>index===editIndexvalue)
    setStore(FilteredCrud)
    const editSelector=store.find((elem,index)=>index===editIndexvalue)
    setInputvalues({
        firstname:editSelector.firstname,
        country:editSelector.country,
        number:editSelector.number,
        role:editSelector.role,
    });
}
//filter handler
const Filterhandler=(value,e)=>{
  const result=setsearch(value);
  if(result==value){
    return(
      setsearch(e.target.value)
    )
  }
}

//validate function the validations the user entered data
    const Validate = (values) => {
        const error = {};
        const OnlyNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const OnlyStrings = /^[a-zA-Z ]*$/;
        if (!values.firstname) {
          error.firstname = "ENTER YOUR NAME!";
        } else if (!values.firstname.match(OnlyStrings)) {
          error.firstname = "Please enter only Alphabets";
        }
        if (!values.country) {
          error.country = "Please enter your Country!";
        } 
        if (!values.number) {
          error.number = "ENTER MOBILE NUMBER FOR LATEST UPDATES!";
        } else if (!values.number.match(OnlyNum)) {
          error.number = "Please enter numbers only";
        }
        if (!values.role) {
          error.role = "CHOOSE YOUR ROLE!";
        }
        return error;
      };
  return (
    <div>
        <h5 className='mt-5'>CRICKET ACADEMY</h5>
        <form onSubmit={submitHandler}>
            <input type='text'
            placeholder='Enter your name'
            name='firstname'
            value={Inputvalues.firstname}
            onChange={changeHandler}
            />
            <small>{InputErrors.firstname}</small>
             <input type='text'
            placeholder='Country'
            name='country'
            value={Inputvalues.country}
            onChange={changeHandler}
            />
            <small>{InputErrors.country}</small>
             <input type='text'
            placeholder=' Enter A valid Number'
            name='number'
            value={Inputvalues.number}
            onChange={changeHandler}
            />
            <small>{InputErrors.number}</small>
            <select name='role' 
            value={Inputvalues.role}
            onChange={changeHandler}>
                <option value='' disabled selected hidden>
                    CHOOSE YOUR ROLE
                </option>
        <option>BATSMAN</option>
          <option>BOWLER</option>
          <option>ALL-ROUNDER</option>
          <option>WICKET-KEPPER</option>
            </select>
            <small>{InputErrors.role}</small>
        <button>SAVE</button>
        </form>
        {/* filter buttons as you want from role  tigged some action*/}
        <button onClick={()=>Filterhandler('BATSMAN')} value='BATSMAN' className='Role'>BATSMAN</button>&nbsp;
        <button onClick={()=>Filterhandler('BOWLER')} value='BOWLER' className='Role'>BOWLER</button>&nbsp;
        <button onClick={()=>Filterhandler('ALL-ROUNDER')} value='ALL-ROUNDER' className='Role'>ALL-ROUNDER</button>&nbsp;
        <button onClick={()=>Filterhandler('WICKET-KEPPER')} value='WICKET-KEPPER' className='Role'>WICKET-KEPPER</button>&nbsp;
        <button onClick={(e)=>setsearch(e.target.value)}  className='Role'>All Players</button>

        {/* table if user-enter data table will show */}
        {Object.keys(store).length>0?(
            <table style={{ width: "100%" }}>
            <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>country</th>
              <th>MOBILE NUMBER</th>
              <th>ROLE</th>

              <th> Edit / Delete</th>
            </tr>
          </thead> 
          <tbody>
                {store.filter((val)=>{
                    if(search ===""){
                        return val
                    }else if(val.role.toLowerCase().includes(search.toLowerCase())){
                        return val
                    }
                }).map((todo,index)=>{
                    return (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{todo.firstname}</td>
                        <td>{todo.country}</td>
                        <td>{todo.number}</td>
                        <td>{todo.role}</td>
                        <td>
                            <button
                            onClick={()=>editHandler(index)} 
                            className="EditButton">
                                EDIT
                            </button>

                            <button
                            onClick={()=>deleteHandler(index)} 
                            className="DeleteButton">
                            DELETE
                            </button>
                        </td>
                        </tr>
                    )
                })  }
          </tbody>
            </table>

        ):null}
    </div>
  )
}

export default Crud