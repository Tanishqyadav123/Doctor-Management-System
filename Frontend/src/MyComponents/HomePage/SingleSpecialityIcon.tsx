import React from 'react'
import {SpecialityTypeObject} from '../../Types.ts'
import { Link } from 'react-router-dom'
function SingleSpecialityIcon({elem} : SpecialityTypeObject) {
  return (
    <Link to={`/doctor/${elem.name}`} className='flex items-center justify-center flex-col mt-5'>
        <img className='h-[5rem] hover:-translate-y-4 transition-all ' src={elem.imageName} alt="" />
        <p className='text-xs'>{elem.name}</p>
    </Link>
  )
}

export default SingleSpecialityIcon
