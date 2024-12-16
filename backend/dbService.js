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
                   if(err) reject(new Error(err.message))
                   else resolve(result.insertId)
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
          `
          connection.query(query, [id, address, sqft, budget, pictures, date], (err, result) => {
            if (err) reject(new Error(err.message))
            else resolve(result.insertId1)
          })
        })
    
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
        console.error(error.message)
        throw error
      }
   }

   async insertChat(orderid, customerid, message, sent_by) {
      try {
        const insertId2 = await new Promise((resolve, reject) => {
         const query = `
            INSERT INTO quotechat 
            (order_id, customer_id, message, sent_by) 
            VALUES (?, ?, ?, ?);
          `
         connection.query(query, [orderid, customerid, message, sent_by], (err, result) => {
            if (err) reject(new Error(err.message))
            else resolve(result.insertId2)
         })
         })
    
         console.log(insertId2);
         return {
            customer_id: customerid,
            order_id:orderid,
            message:message
         }
      }
      catch (error) {
         console.error(error.message)
         throw error
      }
   }

   async insertBill(orderid, total_amount) {
      try {
         const createBillTime = new Date().toISOString()
         const insertId3 = await new Promise((resolve, reject) => {
         const query = `
            INSERT INTO bills 
            (order_id, total_amount, bill_status,create_bill_date) 
            VALUES (?, ?,?, ?);
          `
         connection.query(query, [orderid,total_amount,"Unpaid",createBillTime], (err, result) => {
            if (err) reject(new Error(err.message))
            else resolve(result.insertId2)
         })
         })
         console.log(insertId3)
         return {
            order_id:orderid,
            total_amount: total_amount,
            bill_status: "Unpaid",
            create_bill_date: createBillTime
         }
      }
      catch (error) {
         console.error(error.message)
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
                  if(err) reject(new Error(err.message))
                  else resolve(result.affectedRows)
               })
            }
         )
         console.log(response) // for debugging to see the result of select
         return response === 1? true: false
      }
      catch(error){
         console.log(error)
      }
   }

  async getExisting(email, password) {
   try {
     const response = await new Promise((resolve, reject) => {
       const query = "SELECT id FROM users WHERE email=? AND password=?"
       connection.query(query, [email, password], (err, results) => {
         if (err) return reject(new Error(err.message))
         if (results.length === 0) {
           return reject(new Error("Invalid Credentials!"))
         }
         resolve(results[0])
       })
     })
     return response
   } catch (error) {
     console.error(error.message)
     throw new Error(error.message) 
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
   async searchById(id){
   id = parseInt(id, 10)
   const query = "SELECT * FROM users WHERE id =?"
   return await this.queryDatabase(query, [id])
   }
   

 async getExistingid(id) {
   try {
     const response = await new Promise((resolve, reject) => {
       const query = "SELECT first_name, email FROM users WHERE id=?"
       connection.query(query, [id], (err, results) => {
         if (err) return reject(new Error(err.message))
         if (results.length === 0) {
           return reject(new Error("Invalid Credentials!"))
         }
         resolve(results[0])
       })
     })
     return response
   } catch (error) {
     console.error(error.message)
     throw new Error(error.message) // Let the app route handle this
   }
   }

 async updateStatus(order_id, status){
   try{
      const response = await new Promise((resolve, reject) => 
         {
            const query = "UPDATE users_quote SET status = ? WHERE order_id = ?"
            connection.query(query, [status, order_id], (err, result) => {
               if(err) reject(new Error(err.message))
               else resolve(result.affectedRows)
            })
         })
      // console.log(response);  // for debugging to see the result of select
      return response === 1? true: false
   }catch(error){
      console.log(error)
   } 
   }

 async updateBillStatus(bill_id, bill_status){
   try{
      const payBillTime = new Date().toISOString()
      const response = await new Promise((resolve, reject) => 
         {
            const query = "UPDATE bills SET bill_status = ?, pay_bill_date = ? WHERE bill_id = ?"
            connection.query(query, [bill_status,payBillTime, bill_id], (err, result) => {
               if(err) reject(new Error(err.message))
               else resolve(result.affectedRows)
            })
         })
      return response === 1? true: false
   }catch(error){
      console.log(error)
   } 
   }

 async updatePayStatus(order_id,payment_status){
   try{
      const response = await new Promise((resolve, reject) => 
         {
            const query = "UPDATE users_quote SET payment_status = ? WHERE order_id = ?"
            connection.query(query, [payment_status,order_id], (err, result) => {
               if(err) reject(new Error(err.message))
               else resolve(result.affectedRows)
            })
         })
      return response === 1? true: false
   }catch(error){
      console.log(error)
   } 
   }

 async updateCredit(id, credit_card){
   try{
      const response = await new Promise((resolve, reject) => 
         {
            const query = `UPDATE users SET credit_card = ? WHERE id = ?`
            connection.query(query, [credit_card, id], (err, result) => {
               if(err) reject(new Error(err.message))
               else resolve(result.affectedRows)
            });
         });
      return response === 1? true: false
   }catch(error){
      console.log(error)
   }
   }

   // Method to get top clients with the most orders
   async getTopClients() {
      try {
         const query = `
            SELECT customer_id, COUNT(order_id) AS order_count
            FROM users_quote
            WHERE payment_status IS NOT NULL
            GROUP BY customer_id
            HAVING COUNT(order_id) = (
                SELECT MAX(order_count)
                FROM (
                    SELECT COUNT(order_id) AS order_count
                    FROM users_quote
                    WHERE payment_status IS NOT NULL
                    GROUP BY customer_id
                ) AS subquery
            );
         `

         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching top clients:', error);
      }
   }

   // Method to get difficult clients with the most orders
   async getDifficultClients() {
      try {
         const query = `
            SELECT customer_id 
            FROM users_quote
            WHERE payment_status IS NULL 
            GROUP BY customer_id 
            HAVING COUNT(order_id) >= 3;
         `
         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching difficult clients:', error);
      }
   }

   // Method to get this month quotes
   async getThisMonthQuotes() {
      try {
         const query = `
            SELECT *
            FROM users_quote
            WHERE status = 'Accepted'
            AND DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m');
         `
         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching this month quotes:', error);
      }
   }

   // Method to get propective clients
   async getProspectiveClients() {
      try {
         const query = `
            SELECT id, first_name, last_name, email
            FROM users
            WHERE id NOT IN(
               SELECT DISTINCT customer_id
               FROM users_quote);
         `
         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching prospective clients:', error);
      }
   }

   // Method to get largest driveway
   async getLargestDriveway() {
      try {
         const query = `
            SELECT *
            FROM users_quote
            WHERE status = "Accepted"
            ORDER BY square_feet DESC;
         `
         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching top clients:', error);
      }
   }

   // Method to get overdue bills
   async getOverdueBills() {
      try {
         const query = `
            SELECT *
            FROM bills
            WHERE bill_status = "Unpaid"
            AND DATE_ADD(create_bill_date, INTERVAL 7 day) < NOW();
         `
         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching overdue bills', error);
      }
   }

   // Method to get bad clients
   async getBadClients() {
      try {
         const query = `
            SELECT DISTINCT *
            FROM users_quote uq
            JOIN bills b ON uq.order_id = b.order_id
            WHERE b.bill_status = "Unpaid"
            AND DATE_ADD(b.create_bill_date, INTERVAL 7 day) < NOW();
         `
         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching bad clients', error);
      }
   }

   // Method to get good clients
   async getGoodClients() {
      try {
         const query = `
            SELECT u.customer_id,b.bill_id, b.create_bill_date, b.pay_bill_date
            FROM bills b
            JOIN users_quote u ON u.order_id = b.order_id
            WHERE u.payment_status = "Paid"
            AND TIMESTAMPDIFF(HOUR, b.create_bill_date, b.pay_bill_date) <= 24;
         `
         const response = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
               if (err) reject(new Error(err.message));
               else resolve(results);
            });
         });

         return response;
      } catch (error) {
         console.log('Error fetching Good Clients', error);
      }
   }

}

module.exports = DbService;
