import { useState } from "react";
import { api } from "../configApi/configs";
import { toast } from "react-toastify";

function ModalFormConfirm({isOpen, onClose, student, refresh}){

    const handleDelete= async() => {
        try {
          await api.delete(`/etudiants/${student.ID}`);
          toast.success("Suppression reussie.");
          refresh();
          onClose();
    
        } catch (error) {
            toast.warning('Erreur de suppression.');
            console.log(error)
        }
      }
    return(
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">Suppression etudiant.</h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                        <p>Etes-vous sure de vouloir supprimer l'etudiant <span className="text-red-400">{student.numEt}</span> ?</p>
                        <div className="flex justify-end gap-5 mt-10">
                            <button className="btn btn-outline bordered-white-200" onClick={onClose}>Non annuller</button>
                            <button className="btn btn-outline btn-error" onClick={handleDelete}>Delete</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
export default ModalFormConfirm;