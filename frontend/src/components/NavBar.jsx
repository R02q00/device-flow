
function NavBar(){
    return(
        <>
            <div>
                <div>Icons</div>
                <div>
                    <Navlink to='/admin'>Home</Navlink>
                    <Navlink to='/admin/graph'>Graphic</Navlink>
                    <Navlink to='/admin/students'>Students</Navlink>
                    <Navlink to='/admin/about'>About</Navlink>
                </div>
            </div>
            <div>

            </div>
        </>
    );
}

export default NavBar