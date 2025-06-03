import Back from "../components/back";
import { Profile } from "../components/profile";

export default function About({}) {

    return(
        <div className="">
            <Back href={"home"} title={"About"}/>
            <Profile/>
        </div>
    );
}