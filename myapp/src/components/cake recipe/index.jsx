import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";



const CakeApp = () => {

  const [name, setName] = useState("")
  const [recipe, setrecipe] = useState("")

  const [data, setdata] = useState([])
  const [toggle, settoggle] = useState(false)
  const [editrecipe, seteditrecipe] = useState(null)


  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/recipes',

    })

      .then(res => {
        console.log(res.data.data)
        setdata(res.data.data)
      })

      .catch(err => {
        console.log("error ni getting all recipes", err)
      })
  }, [toggle])




  const submithandler = () => {

    
    let cakeimage = document.getElementById("cakeimage")
    console.log("url of cake image", cakeimage.files)



    let formdata = new FormData();

    formdata.append("name", name)
    formdata.append("recipe", recipe)
    formdata.append("cakeimage", cakeimage.files[0])
    axios({
      method: "post",
      url: "http://localhost:5000/recipe",
      data: formdata,
      header: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        console.log("recipe created", res.data.data)
        settoggle(!toggle)

      })
      .catch(err => {
        console.log("error in creating recipe", err)
      })
  }


 

  let updatehandler = (e) => {
     e.preventDefault();




    axios.put(`http://localhost:5000/recipe/${editrecipe?._id}`,
            {
        name: editrecipe.name,
        recipe : editrecipe.recipe

      }
    )
      .then(function (response) {
        console.log("updated: ", response.data);

        settoggle(!toggle)
        seteditrecipe(null)

      })


      .catch(function (e) {
        console.log("Error in api call: ", e);

      }


      )
  }




  return (
    <div className="form">
      <form onSubmit={submithandler} >
        name : <input type="text"
          onChange={(e) => {
            setName(e.target.value)
          }}
        /> <br />
        recipe : <textarea name="" id="" cols="30" rows="10"
          onChange={(e) => {
            setrecipe(e.target.value)
          }}
        ></textarea> <br />

        <input type="file" id="cakeimage" accept="image/*"
          onChange={() => {
            var cakeimage = document.getElementById("cakeimage")
            var url = URL.createObjectURL(cakeimage.files[0])
            document.getElementById("img").innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `
          }}
        />





        <div id="img">

        </div>
        <button >add recipe</button>


      </form>

      {(editrecipe === null) ? null :
        <div className="form">
          <h2>updated form</h2>
          <form action="" onSubmit={updatehandler} >
            name : <input type="text" value={editrecipe.name}

              onChange={(e) => {
                seteditrecipe({ ...editrecipe, name: e.target.value })
              }

              }
            /> <br />

            recipe <textarea value={editrecipe.recipe} id="" cols="30" rows="10"
              onChange={(e) => {
                seteditrecipe({ ...editrecipe, recipe: e.target.value })
              }
              }


            ></textarea>

            <button>update recipe</button>

          </form>
        </div>}


      
    <div>
    <h1 className="cakes">CAKE RECIPE</h1>
    {data.map(eachcake => (
        <div  className="display">
             
          <h2>{eachcake.name}</h2>
          
          <p>
            <img className="cakeimg" width="300px" src={eachcake.cakeimage} alt="" />
          </p>
            <h2>INGREDIENTS</h2>
            <p className="recipe">{eachcake.recipe}</p>
         
          <button onClick={() => {
            axios({
              method: "delete",
              url: `http://localhost:5000/recipe/${eachcake._id}`

            })
              .then(res => {
                console.log(res.data.message, "deleted")
                settoggle(!toggle)
              })
              .catch(err => {
                console.log("error in deleting recipe", err)
              })
          }}>delete</button>

          <button onClick={() => {
            seteditrecipe({
              _id: eachcake?._id,
              name: eachcake?.name,
              recipe: eachcake?.recipe

            })
          }}>update</button>

        </div>

      ))}
    </div>





    </div>
  )
}

export default CakeApp;