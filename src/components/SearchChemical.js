import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setSearchItem } from '../redux/chemicalSlice'
import { Container, Input } from 'reactstrap'
import './searchChemical.css'

export default function SearchChemical() {
    const [name, setName] = useState("")
    const dispatch = useDispatch()
  return (
    <Container>
        <div className='search-bar'>
            <h3 className='text-center'>Search Bar</h3>
            <input 
                type='text'
                placeholder='Search by name'
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        dispatch(setSearchItem(name.trim()))
                        setName("")
                    }
                }}
            ></input>
            <button>
                <span><i class='fa-solid fa-magnifying-glass'></i></span>
            </button>
        </div>
    </Container>
  )
}
