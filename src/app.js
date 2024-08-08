import express, { response } from "express";
import bodyParser from "body-parser";


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


/**
 * วางแพลนก่อนจะใช้ Data กับอะไรใช้ทำอะไร
 * TODO
 * Create todo  #Post
 * update todo by id
 * delete todo by id
 * get to by id
 */

/*
    *id
    *status = completed, in-progress, canceled
    *name
*/

// สร้างตัวแปร todoList สำหรับเก็บข้อมูล  
let todoList = []

//สร้างหลายรายการ
app.post('/todos/bulk', (req, res) => {
    //เก็บข้อมูลไว้ในตัวแปร totoList ที่ประกาศรับข้อมูล ด้วย Destructuring การรับข้อมูลที่ไม่ทราบจำนวน,ขนาดของข้อมูล ข้อมูลจะเป็น array
    todoList.push(...req.body)
    //ส่งตอบกลับ client
    res.send(req.body)
})

// สร้างข้อมูล
app.post('/todos', (req, res) => {
    //เก็บข้อมูลไว้ในตัวแปร totoList ที่ประกาศรับข้อมูล
    todoList.push(req.body)
    //ส่งตอบกลับ client
    res.send(req.body)
})

// ลบข้อมูล
app.delete('/todos/:id', (req, res) => {
    // หาตำแหน่ง index ของ data ที่จะลบ ผ่าน id
    const todoIndex = todoList.findIndex((todo) => todo.id === req.params.id)
    if (todoIndex === -1) {
        // ตอบกลับ status 404 ถ้าไม่พบข้อมูล
        res.status(404).send("Todo not found")
        return
    }
    // ใช้ methode splice ลดค่าใน array ออก ใช้ parameter ตำเเหน่งใน array, จำนวนที่จะเอาออก
    todoList.splice(todoIndex, 1)
    //ส่งตอบกลับ client
    res.send(req.params.id)
})

//ลบหลายรายการ
app.delete('/todos', (req, res) => {
    // ใช้ methode split แยกตัวอักษร
    const listIds = req.query.in.split(',')
    // console.log(listIds)

    // ใช้ filter สำหรับกรองสมาชิกใน array ใช้ .includes ในการค้นหาค่าใน array ในการค้นหา โดย includes จะเป็นการเช็คว่า array นั้นมีค่าที่เราต้องการจะค้นหาอยู่หรือไม่
    // ใส่ ! คือห้ามอยู่ใน listIds ตัวแปรที่ประกาศ
    todoList = todoList.filter((todo) => !listIds.includes(todo.id))

    // ใช้ query เพื่อรับค่า params id หลายรายการ  && ส่วน url ใช้ ?in รับ params id หลายรายการ
    res.send(listIds)
})

// เขียนทับข้อมูล
app.put('/todos/:id', (req, res) => {
    // หาตำแหน่ง index ของ data ที่จะเขียนทับ ผ่าน id
    const todoIndex = todoList.findIndex((todo) => todo.id === req.params.id)
    if (todoIndex === -1) {
        // ตอบกลับ status 404 ถ้าไม่พบข้อมูล
        res.status(404).send("Todo not found")
        return
    }

    //เขียนทับข้อมูล ตามตำแหน่ง Index ที่ระบุไว้ผ่านตัวแปรที่รับค่ามา
    todoList[todoIndex] = req.body

    //ส่งตอบกลับ client
    res.send(todoList[todoIndex])
})

// แก้ไขข้อมูล
app.patch('/todos/:id', (req, res) => {
    // หาตำแหน่ง index ของ data ที่จะแก้ไข ผ่าน id
    const todoIndex = todoList.findIndex((todo) => todo.id === req.params.id)
    if (todoIndex === -1) {
        // ตอบกลับ status 404 ถ้าไม่พบข้อมูล
        res.status(404).send("Todo not found")
        return
    }

    //แก้ไขค่า ใช้วิธี Destructuring การ Marge Opj, Array เข้าด้วยกัน
    todoList[todoIndex] = { ...todoList[todoIndex], ...req.body }

    res.send(todoList[todoIndex])
})

// ค้นหาข้อมูล
app.get('/todos/:id', (req, res) => {
    // หาตำแหน่ง index ของ data ที่จะค้นหา ผ่าน id
    const todo = todoList.find((todo) => todo.id === req.params.id)

    if (todo) {
        res.send(todo)
    }

    res.status(404).send('Todo not found')
})

// รับข้อมูล
app.get('/todos', (req, res) => {
    //ส่งตอบกลับ client
    res.send(todoList)
})


//สร้าง serve port 3000
app.listen(3000, () => {
    console.log('http://localhost:3000')
})