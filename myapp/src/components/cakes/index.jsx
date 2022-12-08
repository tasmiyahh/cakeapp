import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Cake = () => {

    const [cake, setcake] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: "http://localhost:5000/recipes"
        })
            .then(res => {
                console.log("recipes", res.data.data)
                setcake(res.data.data)

            })
            .catch(err => {
                console.log("error", err)
            })
    }, [])
    return (
        <div className="display">
            <h1 className="cakes">CAKES</h1>
            {cake.map(eachcake => (
                <div className="display">
                    <h2>{eachcake.name}</h2>
                    
                        <p>
                            <img className="cakeimg" width="300px" src={eachcake.cakeimage} alt="" />
                        </p>
                        <h2>INGREDIENTS</h2>
                      <p className="recipe">{eachcake.recipe}</p> 



                </div>

            ))}


        </div>
    )
}

export default Cake;