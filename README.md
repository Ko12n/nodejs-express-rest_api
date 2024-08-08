# ติดตั้งก่อนใช้งาน 
- ติดตั้ง nodejs version 20.15.1
- ติดตั้ง git
- ติดตั้ง vs code

# ดึงโปรเจคลงมา
- ทำการ clone โปรเจคลงมาจาก git เข้า command prompt ใช้คำสั่ง : git clone https://github.com/Ko12n/nodejs-express-rest_api.git
- เปิดโปรเจคด้วย vs code เเล้วเปิด terminal -> new terminal

# ติดตั้ง package
- npm init
- npm i express
- npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
- npm i body-parser

# รันโปรเจค
- npm run start

# การใช้งาน 
- เอาข้อมูลจากไฟล์ data.json ไปทดสอบ
- ใช้ postman ในการทดสอบ get, post, put, patch, delete

# URL API ที่ใช้
- รับข้อมูลหลายรายการ get : http://localhost:3000/todos
- รับข้อมูลรายการเดียว get :  http://localhost:3000/todos/กรอก value id
- สร้างข้อมูล 1 รายการ post: http://localhost:3000/todos
- สร้างข้อมูลหลายรายการ post: http://localhost:3000/todos/bulk
- เขียนทับข้อมูล put : http://localhost:3000/todos/กรอก value id
- แก้ไขข้อมูล patch: http://localhost:3000/todos/กรอก value id
- ลบข้อมูล 1 รายการ delete: http://localhost:3000/todos/กรอก value id
- ลบข้อมูลหลายรายการ delete: http://localhost:3000/todos?in= กรอก value id 1,กรอก value id 2
