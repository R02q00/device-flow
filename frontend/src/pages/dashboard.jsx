import React from "react";
import Graphic from "./Graphic";
import Back from "../components/back";
import Card from "../components/card";

export default function Dashboard({}) {
    return(
        <div className="bg-slate-100 h-[100vh]">
            <Back  href={"home"} title={"Dashboard"}/>
            <div className="px-3">
                <h3 className="font-500 pointer-event-none">Statistiques des donnees</h3>
            </div>
            <Card/>
            <div className="grid grid-cols-2 px-2 gap-1">
                <Graphic />
                <div className="bg-white rounded-lg">

                </div>
            </div>
        </div>

    );
}