import './NotFound.css';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notFound">
        <div className="row"> 
            <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                    <div className="four_zero_four_bg">
                        <h1 className="text-center ">404</h1>
                    </div>
        
                    <div className="contant_box_404">
                        <h3 className="h2">
                            Look like you're lost
                        </h3>
        
                        <p>the page you are looking for is not available!</p>
        
                        <Link to='/' className="homePage">Go to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NotFound;