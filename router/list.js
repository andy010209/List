import express from "express";
import { query } from "../server.js";
import Order from "../models/order/index.js";
const router = express.Router();

router.post("/single", async(req,res)=>{
  try {
    const sql=`SELECT orderID FROM myproject.patient WHERE id=${req.body.id}`;
    const result=await query(sql);
    if(result.err) throw result.err;
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: error.name,
      msg: "Database error",
    });
  }
})

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT myproject.patient.id,myproject.patient.name,myproject.order.message FROM myproject.patient LEFT JOIN myproject.order ON myproject.patient.orderID=myproject.order.id";
    const result = await query(sql);
    if (result.err) throw result.err;
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: error.name,
      msg: "Database error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body.id, req.body.message);
    const sql1 = `INSERT INTO myproject.order(message) VALUES('${newOrder.getMessage()}')`;
    const result1 = await query(sql1);
    if (result1.err) throw result.err;
    const sql2 =`UPDATE myproject.patient SET orderID=${result1.insertId} WHERE id=${newOrder.getID()}`;
    const result2=await query(sql2);
    console.log(result2);
    res.send(result2);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: error.name,
      msg: "Database error",
    });
  }
});

router.patch("/", async (req, res) => {
  try {
    console.log(req.body.id);
    const newOrder = new Order(req.body.id, req.body.message);
    const sql = `UPDATE myproject.order SET message='${newOrder.getMessage()}' WHERE id=${newOrder.getID()}`;
    const result=await query(sql);
    if(result.err) throw result.err;
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: error.name,
      msg: "Database error",
    });
  }
});

export default router;
