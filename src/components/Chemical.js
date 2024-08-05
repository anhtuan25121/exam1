import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'reactstrap'
import AddChemical from './AddChemical'
import ChemicalItem from './ChemicalItem'
import SearchChemical from './SearchChemical'
import './chemical.css'

export default function Chemical() {
   
  return (
    <Container>
        <AddChemical/>
        <SearchChemical/>
        
        <ChemicalItem/>
    </Container>
  )
}
