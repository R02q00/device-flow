import { useEffect, useState } from "react";
import { api } from "../configApi/configs";
import { toast } from "react-toastify";

function ModalForm({isOpen, onClose, mode, student, refresh}){

    const [data, setData]= useState({
        numEt:'',
        nom: '',
        noteMath: '',
        notePhys: '',

    })
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if( mode === 'add' ){
            console.log('modal mode add');
            console.log(data);
            try {
                await api.post("/etudiants", data)
                onClose();
                toast.success('Insertion reussie.');
                refresh();
                
            } catch (error) {
                toast.warning('Une erreur est survenu.');
                console.log(error);
            }

            
        }else{
            console.log('modal mode edit');
            console.log(data);
            try {
                await api.put(`/etudiants/${student.ID}`, data);
                onClose();
                toast.success('Modification reussie.');
                refresh();
                
            } catch (error) {
                toast.warning('Erreur de modification!');
                console.log(error);
                
            }
        }

    }
    useEffect(()=>{
        if(mode==='edit'){
            setData({
                numEt: student.numEt,
                nom: student.nom,
                noteMath: student.noteMath,
                notePhys: student.notePhys,
            });
        }
        
    },[mode, student])

    return(
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">{mode==='edit' ? 'Modifier etudiant': 'Ajouter etudiant'}</h3>

                    <form method="dialog" onSubmit={handleSubmit}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="numEt">Numero etudiant</label>
                            <input type="text" className="w-full input focus:outline-0" name="numEt"
                            value={data.numEt} onChange={handleChange} required readOnly={mode ==='edit'}/>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <label htmlFor="nom">Nom etudiant</label>
                            <input type="text" className="w-full input focus:outline-0" name="nom"
                            value={data.nom} onChange={handleChange} required/>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-2">
                            <label htmlFor="noteMath">Note mathematique</label>
                            <input type="text" className="w-full input focus:outline-0" name="noteMath"
                            value={data.noteMath} onChange={handleChange} required/>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <label htmlFor="notePhys">Note physique</label>
                            <input type="text" className="w-full input focus:outline-0" name="notePhys"
                            value={data.notePhys} onChange={handleChange} required/>
                        </div>

                        <button type="submit" className="btn btn-success mt-5">
                            {mode==='edit' ? 'Modifier' : 'Ajouter'}
                        </button>
                        
                    </form>
                </div>
            </dialog>
        </>
    );
}
export default ModalForm;