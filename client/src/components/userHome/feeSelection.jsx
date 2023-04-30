import React, { useEffect, useState } from 'react'
import { fetchCourses, getCourseLevels, getFees, getNationalities, getResultingamount } from '../../axios/user/user'
import '../../stylesheets/userHome.css'

function FeeSelection() {

    const [selectedValue,setSelectedValue] = useState('')
    const [selectedNationality,setSelectedNationality] = useState('')
    const [selectedCourse,setSelectedCourse] = useState('')
    const [selectedLevel,setSelectedLevel] = useState('')

    const [fees,setFees] = useState([])
    const [nationality,setNationality] = useState([])
    const [courses,setCourses] = useState([])
    const [levels,setLevels] = useState([])
    const [resultingAmount,setResultingAmount] = useState('0')

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
            setSelectedNationality(' ')
        }
        
    }

    const handleCourse = async(e) => {
        const { checked } = e.target;
        if(checked){
            setSelectedCourse(e.target.value)
            const response = await getCourseLevels({selectedCourse:e.target.value})
            if(response.success){
                setLevels(response.data)
            }
        }else{
            setSelectedCourse(' ')
        }
    }

    const handleLevel = async(e) => {
        const { checked } = e.target;
        if(checked){
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
            setSelectedLevel(' ')
        }
    }
    
    console.log(resultingAmount)

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
                        <input className='w-8' type="checkbox" id={name} name="nationality" value={name} onClick={handleCheck}/>
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
                        <input className='w-8' type="checkbox" name="course" value={course} onClick={handleCourse}/>
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
                        <input className='w-8' type="checkbox" id="usa" name="courselevel" value="UG" onClick={handleLevel}/>
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
