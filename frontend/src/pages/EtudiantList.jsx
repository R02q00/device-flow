import { useEffect, useState } from "react";
import ModalForm from "../components/ModalForm";
import ModalFormConfirm from "../components/Confirmation";
import { api } from "../configApi/configs";
import {ToastContainer, toast} from 'react-toastify'
import Graphic from "./Graphic";

function EtudiantList(){
  const [isOpen, setIsOpen]= useState(false);
  const [confirm, setConfirm]=useState(false);
  const [modalMode, setModalMode]= useState('add');
  const [students, setStudents]= useState([]);
  const [average, setAverage]=useState([]);
  const [selected, setSelected]=useState();
  const [reload, setReload] = useState(false);

  const handleOpen= (mode)=> {
    setIsOpen(true);
    setModalMode(mode);

  }

  const handleDelete=()=>{
    setConfirm(true);
  }

  const getAllStudents= async() => {
    try {
      const response= await api.get("/etudiants");

      setStudents(response.data.List);
      setAverage(()=>{
        return response.data.List.map((obj)=>{
          const a= (obj.noteMath + obj.notePhys) / 2;
          return a;
        })

      });
      setReload(prev => !prev);

    } catch (error) {
      console.log(error);
      toast.info('Une erreur est survenue lors de la recuperation !');
      
    }
  }
  const SetStatut=(avg)=>{
      if(avg < 10){
        return(
          <span>Redoublant</span>
        );
      }else{
        return(
          <span>Admis</span>
        );
      }
      
  }

  useEffect(() => {
      getAllStudents();

  }, []);

  return(
        <>
        <h3>Listes etudiants</h3>
        <div>
          <ToastContainer theme="dark" />
        </div>
        <div className="flex justify-end gap-2 mr-4">
            <button className="btn btn-outline btn-success" onClick={()=>{handleOpen('add')}}>Nouvel etudiant</button>
        </div>
        
        <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Numero etudiant</th>
                  <th>Nom</th>
                  <th>Note mathematique</th>
                  <th>Note physique</th>
                  <th>Moyenne</th>
                  <th>Statut</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  students.map((student, index)=>{

                    return(
                      <tr key={index} >
                          <td>{student.numEt}</td>
                          <td>{student.nom}</td>
                          <td>{student.noteMath}</td>
                          <td>{student.notePhys}</td>
                          <td>
                            {average[index]}
                          </td>
                          <td>
                            {SetStatut(average[index])}
                          </td>
                          <td className="flex justify-end gap-2">
                            <button className="btn btn-outline btn-primary" onClick={()=>{
                              handleOpen('edit'); setSelected(student); }}>Edit</button>

                            <button className="btn btn-outline btn-error" onClick={()=>{
                              setSelected(student); handleDelete(); }}>Delete</button>
                          </td>
                        </tr> 
                      );
                    })
                }
              </tbody>

            </table>
        </div>

        
        <div>
          
          {
            isOpen ? <ModalForm isOpen={isOpen} onClose={()=>{setIsOpen(false)}} 
            mode={modalMode} refresh={getAllStudents} student={selected} /> : null
          }
          
          {
            confirm ? <ModalFormConfirm isOpen={confirm} onClose={()=>{setConfirm(false)}}
            student={selected} refresh={getAllStudents} /> : null
          }
          
        </div>
        
        <div className="mt-10" >
          <Graphic reload={reload}/>
        </div>

        </>
  );
}

export default EtudiantList