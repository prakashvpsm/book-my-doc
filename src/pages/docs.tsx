import React from 'react'
import { useParams } from 'react-router-dom';
import Details from '../components/details/details';

export default function Docs() {
    let { id } = useParams();

    
  return (
    <div>
        <Details id={id}/>
    </div>
  )
}
