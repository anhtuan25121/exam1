import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { } from 'reactstrap'
import { addItem } from '../redux/chemicalSlice'
import './addChemical.css'

export default function AddChemical() {
    const [name, setName] = useState("")
    const [formula, setFormula] = useState("")
    const dispatch = useDispatch();

    const handle_add = (e) => {
        e.preventDefault(); 
        if (name.trim() && formula.trim()) {
          dispatch(addItem({ name: name.trim(), formula: formula.trim() }));
          setName("");
          setFormula("");
        }else alert("Please refill the form")
      };

    return (
        <div className='add-container'>
            <h1 className='text-center'>Add Chemical</h1>
            <form onSubmit={handle_add} className='add-form'>
                <input
                    text="text"
                    placeholder='Chemical Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                
                <input
                    text="text"
                    placeholder='Chemical Formula'
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    required
                />
                <button type="submit" className='btn btn-success'>Add Chemical
                    <span><i class='fa-solid fa-plus'></i></span>
                </button>
            </form>

        </div>
    )
}
