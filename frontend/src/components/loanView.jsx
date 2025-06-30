import React, { useEffect, useState } from 'react';
import { api } from '../configApi/configs.js';


const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchLoans = async () => {
        try {
            const response = await api.get('api/loan');
            setLoans(response.data.loans);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLoans();
    }, []);

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="ml-4">
            <h1 className="text-xl font-medium mb-2">Liste des emprunts</h1>
            <div className="grid md:grid-cols-2 gap-4">
                {loans.map(loan => (
                    <div key={loan.id} className="border-gray-500 p-4 rounded-lg shadow">
                        <h2 className="text-xl">
                            Emprunteur: {loan.loaner}
                        </h2>
                        <p>Statut: {loan.statut}</p>
                        <p>Du: {new Date(loan.start).toLocaleDateString()}</p>
                        <p>Au: {new Date(loan.end).toLocaleDateString()}</p>
                        
                        <div className="mt-2">
                            <h3 className="font-medium">Matériels empruntés:</h3>
                            {loan.tools.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {loan.tools.map(tool => (
                                        <li key={tool.id}>
                                            {tool.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun matériel associé</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoanList;