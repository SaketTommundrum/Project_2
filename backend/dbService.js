const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); 

let instance = null; 

const connection = mysql.createConnection({
     host: process.env.HOST,
     user: process.env.USER,        
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
});


connection.connect((err) => {
     if(err){
        console.log(err.message);
     }
     console.log('db ' + connection.state);  
});

class DbService{
   static getDbServiceInstance(){ 
      return instance? instance: new DbService();
   }

   async getAllData(){
      try{
           // use await to call an asynchronous function
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT * FROM users_quote;"
               connection.query(query, (err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
      }
   }

   async getIdData(order_id){
      try{
           // use await to call an asynchronous function
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT customer_id FROM users_quote WHERE order_id =?;"
               connection.query(query,[order_id],(err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
      }
   }

   async getOrderDetails(order_id){
      try{
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT * FROM users_quote WHERE order_id=?;"
               connection.query(query,[order_id], (err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
   }
   }

   async getOrderChats(order_id){
      try{
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT message, sent_by FROM quotechat WHERE order_id=?;"
               connection.query(query,[order_id], (err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
   }
   }

   async getBill(order_id){
      try{
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT * FROM bills WHERE order_id=?;"
               connection.query(query,[order_id], (err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
   }
   }
   async getBillId(bill_id){
      try{
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT * FROM bills WHERE bill_id=?;"
               connection.query(query,[bill_id], (err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
   }
   }

   async getAllQuotes(id){
      try{
           // use await to call an asynchronous function
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT * FROM users_quote WHERE customer_id=?;"
               connection.query(query,[id], (err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
      }
   }


   async insertNew(firstname, lastname, email, password){
         try{
            // const sign_up_time = new Date()
            const insertId = await new Promise((resolve, reject) => 
            {
               const query = "INSERT INTO users (first_name,last_name, email,password) VALUES (?,?,?,?);"
               connection.query(query, [firstname,lastname,email,password], (err, result) => {
                   if(err) reject(new Error(err.message));
                   else resolve(result.insertId);
               })
            })
            console.log(insertId)
            return{
               id: insertId,
               firstname: firstname,
               lastname: lastname,
               email: email,
               password: password

            }
         } catch(error){
               console.log(error)
         }
   }

   async insertQuote(id, address, sqft, budget, pictures, date) {
      try {
        const insertId1 = await new Promise((resolve, reject) => {
          const query = `
            INSERT INTO users_quote 
            (customer_id, address, square_feet, budget, pictures, date) 
            VALUES (?, ?, ?, ?, ?, ?);
          `;
          connection.query(query, [id, address, sqft, budget, pictures, date], (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.insertId1);
          });
        });
    
        console.log(insertId1);
        return {
          customer_id: id,
          order_id:insertId1,
          address: address,
          square_feet: sqft,
          budget: budget,
          pictures: pictures,
          date: date
        };
      } catch (error) {
        console.error(error.message);
        throw error;
      }
   }

   async insertChat(orderid, customerid, message, sent_by) {
      try {
        const insertId2 = await new Promise((resolve, reject) => {
         const query = `
            INSERT INTO quotechat 
            (order_id, customer_id, message, sent_by) 
            VALUES (?, ?, ?, ?);
          `;
         connection.query(query, [orderid, customerid, message, sent_by], (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.insertId2);
         });
         });
    
         console.log(insertId2);
         return {
            customer_id: customerid,
            order_id:orderid,
            message:message
         }
      }
      catch (error) {
         console.error(error.message);
         throw error
      }
   }

   async insertBill(orderid, total_amount) {
      try {
        const insertId3 = await new Promise((resolve, reject) => {
         const query = `
            INSERT INTO bills 
            (order_id, total_amount) 
            VALUES (?, ?);
          `;
         connection.query(query, [orderid,total_amount], (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.insertId2);
         });
         });
    
         console.log(insertId3);
         return {
            order_id:orderid,
            total_amount: total_amount
         }
      }
      catch (error) {
         console.error(error.message);
         throw error
      }
   }
                 
   async deleteRowById(id){
         try{
            id = parseInt(id, 10)
            // use await to call an asynchronous function
            const response = await new Promise((resolve, reject) => 
               {
                  const query = "DELETE FROM users WHERE id = ?;"
                  connection.query(query, [id], (err, result) => {
                     if(err) reject(new Error(err.message));
                     else resolve(result.affectedRows);
                  });
               }
            );
            console.log(response);  // for debugging to see the result of select
            return response === 1? true: false;
         }  catch(error){
            console.log(error);
         }
   }

  async getExisting(email, password) {
   try {
     const response = await new Promise((resolve, reject) => {
       const query = "SELECT id FROM users WHERE email=? AND password=?";
       connection.query(query, [email, password], (err, results) => {
         if (err) return reject(new Error(err.message));
         if (results.length === 0) {
           return reject(new Error("Invalid Credentials!"));
         }
         resolve(results[0]); // Return the first result (user object)
       });
     });
     return response;
   } catch (error) {
     console.error(error.message);
     throw new Error(error.message); // Let the app route handle this
   }
 }

 async getExistingid(id) {
   try {
     const response = await new Promise((resolve, reject) => {
       const query = "SELECT first_name, email FROM users WHERE id=?";
       connection.query(query, [id], (err, results) => {
         if (err) return reject(new Error(err.message));
         if (results.length === 0) {
           return reject(new Error("Invalid Credentials!"));
         }
         resolve(results[0]); // Return the first result (user object)
       });
     });
     return response;
   } catch (error) {
     console.error(error.message);
     throw new Error(error.message); // Let the app route handle this
   }
 }

 async updateStatus(order_id, status){
   try{
      const response = await new Promise((resolve, reject) => 
         {
            const query = "UPDATE users_quote SET status = ? WHERE order_id = ?"
            connection.query(query, [status, order_id], (err, result) => {
               if(err) reject(new Error(err.message));
               else resolve(result.affectedRows);
            });
         });
      // console.log(response);  // for debugging to see the result of select
      return response === 1? true: false;
   }catch(error){
      console.log(error);
   } 
 }

 async updatePayStatus(order_id, payment_status){
   try{
      const response = await new Promise((resolve, reject) => 
         {
            const query = "UPDATE users_quote SET payment_status = ? WHERE order_id = ?"
            connection.query(query, [payment_status, order_id], (err, result) => {
               if(err) reject(new Error(err.message));
               else resolve(result.affectedRows);
            });
         });
      // console.log(response); // for debugging to see the result of select
      return response === 1? true: false;
   }catch(error){
      console.log(error);
   } 
 }

 async updateBillStatus(bill_id, bill_status){
   try{
      const response = await new Promise((resolve, reject) => 
         {
            const query = "UPDATE bills SET bill_status = ? WHERE bill_id = ?"
            connection.query(query, [bill_status, bill_id], (err, result) => {
               if(err) reject(new Error(err.message));
               else resolve(result.affectedRows);
            });
         });
      return response === 1? true: false;
   }catch(error){
      console.log(error);
   } 
 }

 async updateCredit(id, credit_card){
   try{
      const response = await new Promise((resolve, reject) => 
         {
            const query = "UPDATE users SET credit_card = ? WHERE id = ?"
            connection.query(query, [credit_card, id], (err, result) => {
               if(err) reject(new Error(err.message));
               else resolve(result.affectedRows);
            });
         });
      return response === 1? true: false;
   }catch(error){
      console.log(error);
   } 
 }

   async queryDatabase(query, params){
      return new Promise((resolve,reject) =>{
         connection.query(query,params, (err, results) => {
            if (err){
               reject(new Error(err.message))
            } else {
               resolve(results)
            }
         })
      })
   }

   async searchByName(name){
      const [firstName, lastName] = name.split(' ')
      const query = "SELECT * FROM users where name LIKE ? OR name LIKE ?"
      return await this.queryDatabase(query, [`%${firstName}%`, `%${lastName}%`])
   }

   async searchById(id){
      id = parseInt(id, 10)
      const query = "SELECT * FROM users WHERE id =?"
      return await this.queryDatabase(query, [id])
   }

   async searchBySalaryRange(min,max){
      const query = "SELECT * FROM users WHERE salary BETWEEN ? AND ?"
      return await this.queryDatabase(query,[min,max])
   }

   async searchByAgeRange(min,max){
      const query = "SELECT * FROM users WHERE age BETWEEN ? AND ?"
      return await this.queryDatabase(query,[min,max])
   }

   async searchAfterUserId(id){
      id = parseInt(id, 10)
      const query = "SELECT * FROM users WHERE sign_up_time > (SELECT sign_up_time FROM users WHERE id = ?)"
      return await this.queryDatabase(query,[id])
   }

   async searchAfterUserName(name){
      const query = "SELECT * FROM users WHERE sign_up_time > (SELECT sign_up_time FROM users WHERE name = ?)"
      return await this.queryDatabase(query,[name])
   }

   async searchNeverSignedIn(){
      const query = "SELECT * FROM users WHERE sign_in_time IS NULL"
      return await this.queryDatabase(query)
   }

   async searchSameDayAsUserId(id){
      id = parseInt(id, 10)
      const query = "SELECT * FROM users WHERE DATE(sign_up_time) = (SELECT DATE(sign_up_time) FROM users WHERE id =?)"
      return await this.queryDatabase(query,[id])
   }

   async searchSameDayAsUserName(name){
      const query = "SELECT * FROM users WHERE DATE(sign_up_time) = (SELECT DATE(sign_up_time) FROM users WHERE name =?)"
      return await this.queryDatabase(query,[name])
   }

   async searchByRegisteredToday(){
      const query = "SELECT * FROM users WHERE DATE(sign_up_time) = CURDATE()"
      return await this.queryDatabase(query)
   }

}

module.exports = DbService;
