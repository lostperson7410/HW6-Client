import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {

    const [Students, setStudents] = useState({})
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [Major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        const result = await axios.get(`http://localhost/api/Students`)
        console.log(result.data)
        setStudents(result.data)
    }

    const addStudent = async () => {
        const result = await axios.post(`http://localhost/api/Students`, {
            id,
            name,
            Major,
            GPA
        })
        console.log(result.data)
        getStudents()
    }

    const getStudent = async (std) => {       
        const result = await axios.get(`http://localhost/api/Students/${std}`)
        console.log(result.data)
        setID(result.data.id)
        setName(result.data.name)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
    }
    const updateStudent = async (std) => {
        const result = await axios.put(`http://localhost/api/Students/${std}`, {
            id,
            name,
            Major,
            GPA
        })

        console.log(result.data)
        setID(result.data.id)
        setName(result.data.name)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
        getStudents()
    }

    const delStudent = async (std) => {
        const result = await axios.delete(`http://localhost/api/Students/${std}`)
        getStudents()
    }

    const printStudents = () => {
        if (Students && Students.length)
            return Students.map((Student, index) => {
                return (
                    <li key={index}>
                        {Student.id} : {Student.name} : {Student.Major} : {Student.GPA}
                        <button type="button" class="btn btn-outline-primary"onClick={() => getStudent(Student.std)}>GET Student</button>
                        <button type="button" class="btn btn-outline-danger"onClick={() => delStudent(Student.std)}>Delete</button>
                        <button type="button" class="btn btn-outline-success" onClick={() => updateStudent(Student.std)}>Update</button>

                    </li>
                )
            })
        else {
            return (<h2> No Student </h2>)
        }
    }

    return (
        <div>
            <h2>Student</h2>
            <ul>
                {printStudents()}
            </ul>
            <h2>Get Student</h2>
            Get: {name}   {Major}  {GPA}

            <h2>Add Student</h2>
            ID:
            <input placeholder="ID" type="text" name="name" onChange={(e) => setID(e.target.value)} /> <br />
            Name:
            <input placeholder="name" type="text" name="name" onChange={(e) => setName(e.target.value)} /> <br />
            Major:
            <input placeholder="Major" type="text" name="Major" onChange={(e) => setMajor(e.target.value)} /><br />
            GPA:
            <input placeholder="GPA" type="number" name="GPA" onChange={(e) => setGPA(e.target.value)} /><br />
            
            <button type="button" class="btn btn-outline-primary"onClick={addStudent}>Add</button>
        </div>
    )
}