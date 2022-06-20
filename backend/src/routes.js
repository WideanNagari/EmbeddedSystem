const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://51.79.161.0')
//handle errors
client.on("error",function(error){
    console.log("Can't connect" + error);
    process.exit(1)
});

client.on('connect', function () {
    client.subscribe('THWidean',{qos:1})
})

//handle incoming messages
client.on('message', async (topic, message, packet) => {
    // console.log("["+topic+"]: "+ message);
    try{
        let data = message.toString().split(",")
        let dataInsert = await executeQuery(`INSERT INTO activity VALUES(sysdate(), ${data[0]}, ${data[1]})`)
    }catch (err){
        console.log(err)
    }
})
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

router.get("/", async (req, res) => {
    // client.publish('THWidean', '10,20')
    // return res.status(200).send("a")
    try{
        let data = await executeQuery(`SELECT * FROM activity order by time desc`)
        return res.status(200).send(data)
    }catch (err){
        return res.status(500).send(err)
    }
})

module.exports = router