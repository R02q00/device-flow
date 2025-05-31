import { useEffect, useState } from "react";
import {BsUpload} from "react-icons/bs"
import {CiImageOn} from "react-icons/ci"
import { api } from "../configApi/configs";


const Modal = ({mode, refresh, isOpen, onClose}) => {
  const toolsId = ""
  const [selected, setSelected] = useState("")
  const options = [
    {label: "fix"},
    {label: "wrong"},
    {label: "good"}
  ]
  const [data, setData] = useState({
    sequence_number: '',
    name: '',
    photo: '',
    statut: '',
  })
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(event) =>{
      event.preventDefault();
      if (mode === 'add') {
        console.log(data)
        await api.post('api/tools/', data)
          .then(result =>{
              console.log(result.data.message);
              onClose();
              refresh();
          })
          .catch(error => console.log(error.result?.message || error.message));

      }else{
        console.log(data);
        /*await api.post(`api/tools/:${toolsId}`, data)
          .then(result => {
              console.log(result.data);
          })
          .catch(error => console.log(error.result?.message || error.message))*/

      }
  }

  useEffect(() => {
    
  },[])

  return(
      <dialog className="modal" open={isOpen}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
          <h3 className="text-2xl text-indigo-500 mb-2">{mode === "add" ? "New tools": "Edit tools"}</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="sequence_number" className="text-md font-700">Sequence number:</label>
              <input type="text" name="sequence_number" placeholder="Sequence number" className="w-full border border-indigo-500 rounded-md p-2 focus:outline-none"
                value={data.sequence_number} onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="text-md font-700">Name:</label>
              <input type="text" name="name" placeholder="Name" className="w-full rounded-md border border-indigo-500 p-2 focus:outline-none"
                value={data.name} onChange={handleChange}
              />
            </div>
            <div className={mode === 'add' ? 'rounded-md border border-indigo-500 p-2 mb-8': 'rounded-md border border-indigo-500 p-2 mb-4'}>
              <label htmlFor="photo" className="flex">
                <CiImageOn className="text-[25px] text-gray-500 cursor-pointer"/>
                {data.photo.name || "Upload img"}
              </label>
              <input type="file" name="photo" id="photo" className="hidden" accept="image/*"
                onChange={(e) => setData({...data, photo: e.target.files[0]})}
              />
              
            </div>
            
            {
              mode ==='edit' ?
                <div className="flex flex-col gap-1 mb-15">
                  <label>Choice statut tools:</label>
                  <select className="w-full rounded-md border border-indigo-500 p-3 focus:outline-none"
                    onChange={(e) => setData({...data, statut: e.target.value})}
                  >
                    {
                      options.map((option) => (
                        <option key={option.label} value={option.label}>{option.label}</option>
                      ))
                    }
                  </select>
                </div>
              : null
            }
            
            <div className="">
                <button className="text-white font-700 bg-green-300 px-8 py-2 rounded-md">Save</button>
            </div>
          </form>
        </div>
      </dialog>
  );
}
export default Modal;
