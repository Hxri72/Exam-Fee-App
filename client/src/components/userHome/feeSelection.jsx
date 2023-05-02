import React, { useEffect, useState } from 'react'
import { fetchCourses, getCourseLevels, getFees, getNationalities, getResultingamount } from '../../axios/user/user'
import '../../stylesheets/userHome.css'
import toast from 'react-hot-toast'

function FeeSelection() {

    const [selectedValue,setSelectedValue] = useState('')
    const [selectedNationality,setSelectedNationality] = useState(null)
    const [selectedCourse,setSelectedCourse] = useState(null)
    const [selectedLevel,setSelectedLevel] = useState(null)

    const [fees,setFees] = useState([])
    const [nationality,setNationality] = useState([])
    const [courses,setCourses] = useState([])
    const [levels,setLevels] = useState([])
    const [resultingAmount,setResultingAmount] = useState('0')
    // const [options,setOptions] = useState(false)

    useEffect(()=>{
        const fetchData = async() => {
            const response = await getFees()
            
            if(response.success){
                setFees(response.data)
            }
        }
        fetchData();
    },[])

    const handleChange = async(e) => {
        if(selectedNationality || selectedCourse || selectedLevel !== null){
            return toast.error('Uncheck all the other fields to change fees')
        }
        setSelectedValue(e.target.value)
        const selectedFee = e.target.value 
        const response = await getNationalities({selectedFee})
        console.log(response.data)
        if(response.success){
            setNationality(response.data)
        }
    }

    const handleCheck = async(e) => {
        const { checked } = e.target;
        if(checked){
            setSelectedNationality(e.target.value)
            const response = await fetchCourses({selectedNationality:e.target.value})
            if(response.success){
                setCourses(response.data)
            }
        }else{
            setSelectedNationality(null)
            setCourses([])
            setLevels([])
            setSelectedCourse(null)
            setSelectedLevel(null)
            setResultingAmount('0')
        }
        
    }

    const handleCourse = async(e) => {
        const { checked } = e.target;
        if(selectedNationality === null){
            return toast.error('select nationality first')
        }
        if(checked){
            setSelectedCourse(e.target.value)
            const response = await getCourseLevels({selectedCourse:e.target.value})
            if(response.success){
                setLevels(response.data)
            }
        }else{
            setSelectedCourse(null)
            setLevels([])
            setResultingAmount('0')
            setSelectedLevel(null)
        }
    }

    const handleLevel = async(e) => {
        const { checked } = e.target;
        if(checked){
            setSelectedLevel(e.target.value)
            const data = {
                nationality:selectedNationality,
                course:selectedCourse,
                level:e.target.value
            }
            const response = await getResultingamount(data)
            console.log(response)
            if(response.success){
                setResultingAmount(response.data)
            }
        }else{
            setSelectedLevel(null)
            setResultingAmount('0')
        }
    }

    console.log(selectedNationality)
    

  return (
    <>
        <div className='mainDivFee'>
            <div className='flex justify-center pt-4'>
                <p className='mr-8 mt-1 font-medium'>Please select Exam Fee</p>
                <select
                className="bg-slate-600 px-3 py-1 rounded-lg text-white"
                value={selectedValue}
                onChange={handleChange}
                >
                <option value="">Select a Fee</option>
                {fees !== null && fees.map((fee,index)=>(
                <option key={index}>{fee}</option>
                ))}
                 
              </select>
            </div>
            
            
            <div className='nationalitiesDiv'>
                <div className='flex justify-center pt-2'>
                    <p className='font-medium '>Select a nationality</p>
                </div>

                <div className='flex justify-center py-5'>
                    <ul className='flex'>
                        {nationality.map((national)=>{
                           return Object.keys(national.ExamFee).map((name)=>{
                        return<>
                        <li>
                        <label className='text-lg' >
                        <input className='w-8' type="checkbox" id={name} name="options" value={name} onClick={handleCheck} disabled={Object.keys(national.ExamFee).length > 1 && selectedNationality !== null && selectedNationality !== name}/>
                        {name}
                        </label>
                        </li>
                        </>
                        })
                        })}
                    </ul>
                </div>
            </div>

            <div className='coursesDiv'>
                <div className='flex justify-center pt-2 font-medium'>
                    <p>Select a Course</p>
                </div>

                <div className='flex justify-center py-5'>
                    <ul className='flex'>
                        {courses.map((course)=>(
                        <li>
                        <label className='text-lg' >
                        <input className='w-8' type="checkbox" name="options" value={course} onClick={handleCourse} disabled={selectedCourse !== null && selectedCourse !== course}/>
                        {course}
                        </label>
                        </li>
                        ))}
                    </ul>
                </div>
                
            </div>

            <div className='coursesDiv'>
                <div className='flex justify-center pt-2 font-medium'>
                    <p>Select Course Level</p>
                </div>

                <div className='flex justify-center py-5'>
                    <ul className='flex'>
                        {levels.map((level)=>(
                        <li>
                        <label className='text-lg' >
                        <input className='w-8' type="checkbox" name="options" value={level} onClick={handleLevel} disabled={selectedLevel !== null && selectedLevel !== level}/>
                        {level}
                        </label>
                        </li>
                        ))}
                    </ul>
                </div>
                
            </div>

            <div className='coursesDiv'>
                <div className='flex justify-center pt-2 font-medium'>
                    <p className='font-medium'>Resulting amount is : {resultingAmount}/-</p>
                </div>
            </div>

        </div>
    </>
  )
}

export default FeeSelection
