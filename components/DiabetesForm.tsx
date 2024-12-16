"use client"
import React from 'react'

interface DiabetesFormProps {
  submit: (data: {
    pregnancies: number;
    Glucose: number;
    BloodPressure: number;
    SkinThickness: number;
    Insulin: number;
    BMI: number;
    DiabetesPedigreeFunction: number;
    Age: number;
  }) => void;
}

const DiabetesForm: React.FC<DiabetesFormProps> = ({ submit }) => {

  const [pregnancies, setPregnancies] = React.useState(0)
  const [glucose, setGlucose] = React.useState(0)
  const [bloodPressure, setBloodPressure] = React.useState(0)
  const [skinThickness, setSkinThickness] = React.useState(0)
  const [insulin, setInsulin] = React.useState(0)
  const [bmi, setBmi] = React.useState(0)
  const [pedigree, setPedigree] = React.useState(0)
  const [age, setAge] = React.useState(0)

  return (
        <div className='w-full h-full flex justify-center items-center'>
          <form action="" className='flex flex-col gap-4 bg-gray-600  p-10 rounded-xl bg-opacity-50' onSubmit={(e)=>{
            e.preventDefault()
            submit({
              pregnancies: parseInt(pregnancies.toString()),
              Glucose: parseInt(glucose.toString()),
              BloodPressure: parseInt(bloodPressure.toString()),
              SkinThickness: parseInt(skinThickness.toString()),
              Insulin: parseInt(insulin.toString()),
              BMI: parseInt(bmi.toString()),
              DiabetesPedigreeFunction: parseFloat(pedigree.toString()),
              Age: parseInt(age.toString())
            })
          }}>
            <div className="flex gap-4 items-center justify-between">
              <label htmlFor="pregnancies" className="text-xl font-extrabold">Past Pregnancies :</label>
              <input required value={pregnancies} onChange={(e)=>setPregnancies(parseInt(e.target.value))} type="number" name="pregnancies" placeholder="1,2..." className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label htmlFor="glucose" className="text-xl font-extrabold">Glucose level :</label>
              <input required value={glucose} onChange={(e)=>setGlucose(parseInt(e.target.value))} type="number" name="glucose" placeholder="70" className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label  htmlFor="bloodPressure" className="text-xl font-extrabold">Blood Pressure :</label>
              <input required value={bloodPressure} onChange={(e)=>setBloodPressure(parseInt(e.target.value))} type="number" name="bloodPressure" placeholder="78" className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label htmlFor="skinThickness" className="text-xl font-extrabold">Skin thickness :</label>
              <input required value={skinThickness} onChange={(e)=>setSkinThickness(parseInt(e.target.value))} type="number" name="skinThickness" placeholder="10mm.." className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label htmlFor="insulin" className="text-xl font-extrabold">Insuulin level :</label>
              <input required value={insulin} onChange={(e)=>setInsulin(parseInt(e.target.value))} type="number" name="insulin" placeholder="90" className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label htmlFor="bmi" className="text-xl font-extrabold">BMI :</label>
              <input value={bmi} onChange={(e)=>setBmi(parseInt(e.target.value))} type="number" name="bmi" placeholder="18-25.." className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label htmlFor="pedigree" className="text-xl font-extrabold">Rate: 0-1 whether previus generations had diabetes issues :</label>
              <input required value={pedigree} onChange={(e)=>setPedigree(parseFloat(e.target.value))} type="number" name="pedigree" placeholder="0.2,0.3.." className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label htmlFor="age" className="text-xl font-extrabold">Age :</label>
              <input required value={age} onChange={(e)=>setAge(parseInt(e.target.value))} type="number" name="age" placeholder="32" className=" outline-none focus:outline-none bg-gray-600 rounded-xl py-2 px-4"/>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <button className='bg-blue-400 px-10 py-2 rounded-xl font-extrabold hover:scale-105 transition-all duration-300'>SUBMIT</button>
            </div>
          </form>
        </div>
  )
}

export default DiabetesForm
// {
//     "pregnancies": 0,
//     "Glucose": 70,
//     "BloodPressure": 80,
//     "SkinThickness": 2,
//     "Insulin": 80,
//     "BMI":20,
//     "DiabetesPedigreeFunction": 0.3,
//     "Age": 20
// }