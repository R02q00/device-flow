import './Home.css'
import photo from './../assets/photo.png'

function Home(){
    return(
      <div className="flex justify-between">
        <div>
          <h1>Home page</h1>
        </div>
        <div className="flex items-center">
            <div className='circle'>
              <img src={photo} alt="photo-duo" />
            </div>
        </div>
      </div>
    );
}

export default Home