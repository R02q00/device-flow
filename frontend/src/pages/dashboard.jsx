import React from "react";
import Graphic from "./Graphic";
import Back from "../components/back";
import Card from "../components/card";

export default function Dashboard({}) {
    return(
        <div className="bg-gray-50 h-[100vh]">
            <Back  href={"home"} title={"Dashboard"}/>
            <div className="px-3">
                <h3 className="font-500 pointer-event-none">Statistiques des donnees</h3>
            </div>
            <Card/>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 px-1 gap-2">
                <div className="bg-white">
                    <Graphic />
                </div>
                <div className="bg-white rounded-lg px-2 py-1">
                    <h1>Loan en cours</h1>
                </div>
            </div>
        </div>

    );
}