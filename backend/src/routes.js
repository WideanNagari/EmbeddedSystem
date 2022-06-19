const express = require("express");
const router = express.Router();
const mysql = require("mysql");
// const pool = mysql.createPool({
//     host: "51.79.161.0",
//     database: "adiputro_psytest",
//     user: "project",
//     password: "fjVsysWohRg3SUtKFbfPVYbeYZgvCxao"
// });

const pool = mysql.createPool({
    host: "localhost",
    database: "embeddedsystem",
    user: "root",
    password: ""
});

function executeQuery(q){
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err, conn){
            if(err){
                conn.release();
                reject(err);
            }
            else{
                conn.query(q, function (err, results) {
                    conn.release();
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(results);
                    }
                })
            }
        });
    });
}

// router.get("/", async (req, res) => {
//     // if(!req.body.username)
//     //     return res.status(400).send({"message":"Field tidak sesuai ketentuan!"})

//     // try{
//     //     let user = await executeQuery(`SELECT * FROM users WHERE username = '${username}%'`)
//     //     if(user.length > 0)
//     //         return res.status(400).send({"message":"Username sudah ada!"})
        
//     //     let newUser = await executeQuery(`insert into users values('${username}','${nama}','${tanggal}','${jenis_kelamin}','${hobi}')`)
        
//     //     let now = await executeQuery(`SELECT * FROM users WHERE username = '${username}%'`)
        
//     //     return res.status(200).send(now[0])
//     return res.status(200).send({"msg" : "Success"})
//     // }catch (err){
//     //     return res.status(500).send(err)
//     // }
// })

router.get("/", async (req, res) => {
    try{
        let data = await executeQuery(`SELECT * FROM activity order by time desc`)
        return res.status(200).send(data)
    }catch (err){
        return res.status(500).send(err)
    }
})

module.exports = router