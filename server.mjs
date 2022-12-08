import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fs from 'fs'
import admin from "firebase-admin";

const app = express()
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


const cakeSchema = new mongoose.Schema({
    name: { type: String },
    recipe: { type: String },
    createdOn: { type: Date, default: Date.now },
    cakeimage: { type: String},


});

let cakeModel = mongoose.model("cake", cakeSchema);



import multer from 'multer';
const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })


var serviceAccount = { //ye hum apna laye h storagebucket k siide pe project seting me service account generate krk


    "type": "service_account",
    "project_id": "cake-app-491ab",
    "private_key_id": "3fbc36d768b7bea4a06673510ee3d9f9f1af1a72",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwbobexl6W0ptw\nJeiPF4RCCHtEo/6Hx7WZfRGU6Ohd1PYcY6wGXuYqW/QsfuT/Nsy3ifRUU9/C1j2j\nxvdFRhAtOGuEayxyI9DuPteRmPKQ6idsva38fPlL4gZK6Qfb3JL5SRJDss9+dUrI\nNhOf1rutl8UQungumyPJnSutVuNApL1rcJAbUjk42BMLrSAH4l0vi7dYquc3ZAUB\n/OrrR3kMUNMrXmm/EWFiJTrkFneuZMR4EiVxE9Tdd3RNcYiwr5jf8B+JLogdr6s5\nAqDic02dKwJtpzhRsQwdoZ4yhf9caEFUsUZrenG6TtyxLBkJuQ7nnsQ6lCgqKMIk\n0yTFWjTXAgMBAAECggEAPaNfmxTSlv6dL2EPDm641hkAd8qTcfxjhWwcaFm2VJHC\nKcjooJEm+EWH2MO8XS1X+AdKROvIkNkoT7+DQ8BmhmXfqjOHI5k/tPxfc45rsBUe\nEO9ziXJf5hLg/+rJxBYbgtv0dZJSy2tO5QN/d6gdiVgskNuUgTPSHO28BKMGYd6X\njkEYOoS9iaZz7x1o0usP9JCjSpw03bQUT3B4rUJ4VPjOmiV57llbsSp7LyuQc7s6\nxuNmAWHVWc9dgluku0rnAEHoXiChKAMFs5akZycDAypeAguT+2InygMkHjEfFt7v\noZBe2Lv0cTE2/zFtUeZdIMpDLKedSPRbztFc2xppAQKBgQDWKFuFXUr2k6vpQNW0\nguMkcP2x015ToDQTxGl5wzVu0SvvzNsJo2OSGWfjYf13m0E0sizZKxWONTZXH9bk\nDR5qdjqhFWurgFUrLYw1KoelxVvJMdA2yNO8WtM9gSkmp2Z1ENwZmv3euVZnEuS+\nmC/HkLsSNP/w19xXRWn9Xb7XXwKBgQDS5zY+fgR8oB5qT78AW3MdMtSY++mnKIeU\nLOKaJigpGMiJtZcCJR+nc5sI3XAgdnlyxKnwckWUhpG21JcqMlSCjFCt2/T169eS\n7w8bxtH1ulIph/E8fg/nVCBVOoRps8beU+7udPM2ubTslFhjLBVdcUiMYFZiyWy+\nj3nW8OrtiQKBgQDOEetu+wRlHFexjPeWSNP0ft0/PZpocaFq2/Z6egJybcgPaVnj\nflsTfGrg+6uAad5mrIRHPBPz0PRHBZYrvwvjeXyVAB2o20YY1C00A4afVrcpdEtc\nTAaiGetmJWDJlw8Z2m1QHjnnFQQ1DpMZayuepn+710/oGm4lc9+3M3utlQKBgFax\nGdgIPtnni3kRvKZt8NyQt1kHO90tSMW8yYypoJp8CHqqvR7xmZhgadr0AxIlAPkP\nI/elUTqjMiRgMJ70v05GVSeSIZgw0JUiVSiKymViqEFQEvZVrz3ck8nU2vcEIfvj\nrnQweIUHQvp4Y/in90RIu5SQSRIkT+Ho4iFbOIZZAoGAOdf03sASfnboAtGJKmD+\nIYqScz1CGx/jLyjRu1zVPQyAilD5lrmkadjdgXjg30Th+Rl30OmRmF62dX8ZtsBW\n5tCJklrSncaTLljrwZKAHLpexfOgKGqbnQXfJpBbvWADtt1ZNVsZP2vmK8x2Vq7A\ndoIoOpTVuCsfijDB0uMnpIM=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-62ntl@cake-app-491ab.iam.gserviceaccount.com",
    "client_id": "104743814413964091793",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-62ntl%40cake-app-491ab.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cake-app-491ab.firebaseio.com" //apni project ki id lgo
});
const bucket = admin.storage().bucket("gs://cake-app-491ab.appspot.com");


app.post('/recipe', upload.any(), async (req, res) => {
    console.log("recipe received", req.body)

    console.log("files", req.files[0])


    bucket.upload(
        req.files[0].path,
        {
            destination: `uploads/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then(async (urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }


                        let newRecipe = new cakeModel({
                            name: req.body.name,
                            recipe: req.body.recipe,
                            cakeimage: urlData[0],
                        })
                        try {
                            let response = await newRecipe.save()
                            console.log("Recipe added", response)
                            console.log(urlData[0])
                            res.send({
                                message: "Recipe added",
                                data: {
                                    name: req.body.name,
                                    recipe: req.body.recipe,
                                    cakeimage: urlData[0],
                                }
                            })

                        }

                        catch (error) {
                            console.log("failed to add recipe", error)
                            res.status(500).send({
                                message: "failed to add recipe"
                            })
                        }
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });

})


app.get("/recipes" , (req ,res)=>{
cakeModel.find({} , (err ,result)=>{
    if(err){
        console.log("error in receiving recipe" , err);
        res.send({
            message : "error in getting recipes"
        })
        return
    }else{
        console.log("recipe of cake" , result);
        res.send({
            message : "recipe of cake",
            data : result
        })
    }
})
})

app.delete("/recipe/:id" , (req ,res)=>{
    cakeModel.findOneAndDelete({_id : req.params.id} , (err ,result)=>{
        if(err){
            console.log("error in deleting recipe" , err);
            res.send({
                message : "error in deleting recipes",
                
            })
            console.log("deleted" ,err);
            return;
        }else{
            console.log("deleted" , result);
            res.send({
                message : "recipe hasbeen deleted",
                data: result

            })
        }
    })
})


app.put('/recipe/:id', (req, res )=>{
    let update = {};
    if(req.body.name){
        update.name = req.body.name
    }
   
    if(req.body.recipe)update.recipe = req.body.recipe
 
  cakeModel.findByIdAndUpdate({_id : req.params.id} , update, {
    new: true} , (err ,result)=>{
        if(!err){
            res.send({
                message : "updated recipe",
                data : result
            })

        }else{
            res.send({
                message : "error in updating recipe"
            })
            console.log(err , "error in updating")
        }

    })



})












app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})















let dbURI = 'mongodb+srv://tasmiyah:web@cluster0.cj82tmo.mongodb.net/cakeapp?retryWrites=true&w=majority'
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

