const express = require('express')
const cors = require ('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const dbService = require('./dbService')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// create
app.post('/signup', (request, response) => {
    console.log("app: signing up called")

    const {firstname,lastname,email,password} = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.insertNew(firstname,lastname,email,password)
    result 
    .then(data => response.json({data: data})) 
   .catch(err => console.log(err))
});

app.post('/quotes', (request, response) => {
    console.log("app: creating new quote")

    const {id, address, sqft,budget, pictures, date} = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.insertQuote(id, address, sqft,budget, pictures, date)
    result 
    .then(data => response.json({data: data})) 
   .catch(err => console.log(err))
});


app.post('/signin', async (request, response) => {
    console.log("app: signing in called");
    const { email, password } = request.body;
    const db = dbService.getDbServiceInstance();
  
    try {
      const user = await db.getExisting(email, password);
      response.json({ user }); // Respond with the user object
    } catch (error) {
      console.error(error.message);
      response.status(401).json({ error: error.message });
    }
});

app.post('/chat/:orderid', async (request, response) => {
  console.log("app: signing in called");
  const { orderid, customerid, message, sent_by } = request.body;
  const db = dbService.getDbServiceInstance();
  
  try {
    const user = await db.insertChat(orderid, customerid, message, sent_by);
    response.json({ user }); // Respond with the user object
  } catch (error) {
    console.error(error.message);
    response.status(401).json({ error: error.message });
  }
});

app.post('/bills/:order_id', async (request, response) => {
  console.log("app: Billing is called");
  const  {order_id} =request.params
  const { total_amount} = request.body;
  const db = dbService.getDbServiceInstance();
  
  try {
    const user = await db.insertBill(order_id, total_amount);
    response.json({ user }); // Respond with the user object
  } catch (error) {
    console.error(error.message);
    response.status(401).json({ error: error.message });
  }
});

app.get('/admin', (request, response) => {

    const db = dbService.getDbServiceInstance()
    const result =  db.getAllData()
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/admin/:order_id', (request, response) => {
    const {order_id} = request.params
    const db = dbService.getDbServiceInstance()
    const result =  db.getIdData(order_id)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.patch('/update', 
    (request, response) => {
         console.log("app: update is called");
         const{order_id, status} = request.body
         console.log(order_id)
         console.log(status)
         const db = dbService.getDbServiceInstance();
         const result = db.updateStatus(order_id, status);
         result.then(data => response.json({success: true}))
         .catch(err => console.log(err)); 

    }
);


app.get('/getdetails/:orderid', (request, response) => {

    const db = dbService.getDbServiceInstance()
    const {orderid} = request.params
    const result =  db.getOrderDetails(orderid)

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/getbill/:order_id', (request, response) => {
    const db = dbService.getDbServiceInstance()
    const {order_id} = request.params
    const result =  db.getBill(order_id)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})
app.get('/getbillid/:bill_id', (request, response) => {
    const db = dbService.getDbServiceInstance()
    const {bill_id} = request.params
    const result =  db.getBillId(bill_id)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})


app.get('/getchats/:orderid', (request, response) => {

    const db = dbService.getDbServiceInstance()
    const {orderid} = request.params
    
    const result =  db.getOrderChats(orderid);

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})


app.get('/quotes/:id', (request, response) => {

    const db = dbService.getDbServiceInstance()
    const {id} = request.params
    
    const result =  db.getAllQuotes(id);

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/signin/:id', async (request, response) => {
    console.log("app: signing in called");
    const { id } = request.body;
    const db = dbService.getDbServiceInstance();
  
    try {
      const user = await db.getExistingid(id);
      response.json({ user }); // Respond with the user object
    } catch (error) {
      console.error(error.message);
      response.status(401).json({ error: error.message });
    }
  });

// update
app.patch('/update/:orderid', 
     (request, response) => {
          console.log("app: update is called");
          const {id} = request.params
          const{name, email, password} = request.body
          console.log(id)
          console.log(name)
          console.log(email)
          console.log(password)
          const db = dbService.getDbServiceInstance();

          const result = db.updateNameById(id, name,email,password);

          result.then(data => response.json({success: true}))
          .catch(err => console.log(err)); 

     }
)

app.patch('/updatepaystatus/:orderid', 
     (request, response) => {
          console.log("app: update for payment is called");
          const {order_id} = request.params
          const{payment_status} = request.body
          const db = dbService.getDbServiceInstance();
          const result = db.updatePayStatus(order_id, payment_status);
          result.then(data => response.json({success: true}))
          .catch(err => console.log(err)); 
     }
)


app.patch('/updatebill/:order_id', 
     (request, response) => {
          console.log("app: update for bill status is called");
          const{bill_id,bill_status} = request.body
          console.log(bill_id)
          console.log(bill_status)
          const db = dbService.getDbServiceInstance();
          const result = db.updateBillStatus(bill_id, bill_status);
          result.then(data => response.json({success: true}))
          .catch(err => console.log(err)); 
     }
);
app.patch('/updatecredit/:id', 
     (request, response) => {
          console.log("app: update for credit card is called");
          const {id} = request.params
          const{credit_card} = request.body
          console.log(id)
          console.log(credit_card)
          const db = dbService.getDbServiceInstance();
          const result = db.updateCredit(id, credit_card);
          result.then(data => response.json({success: true}))
          .catch(err => console.log(err)); 
     }
);



// delete service
app.delete('/delete/:id', 
     (request, response) => {     
        const {id} = request.params;
        console.log("delete");
        console.log(id);
        const db = dbService.getDbServiceInstance();

        const result = db.deleteRowById(id);

        result.then(data => response.json({success: true}))
        .catch(err => console.log(err));
     }
)   

//search
app.get('/searchName/:name', (request, response) => { 
    const {name} = request.params;
    console.log(name)
    const db = dbService.getDbServiceInstance()
    let result;
    if(name === "all")
       result = db.getAllData()
    else 
       result =  db.searchByName(name)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchId/:id', (request, response) => { 
    const {id} = request.params;
    console.log(id)
    const db = dbService.getDbServiceInstance()
    const result =  db.searchById(id)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchSalary/:min&:max', (request, response) => { 
    const {min, max} = request.params;
    console.log(`Minimum salary: ${min} Maximum salary: ${max}`)
    const db = dbService.getDbServiceInstance()
    const result =  db.searchBySalaryRange(min,max)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchAge/:min&:max', (request, response) => { 
    const {min,max} = request.params;
    console.log(`Minimum age: ${min} Maximum age: ${max}`)
    const db = dbService.getDbServiceInstance()
    const result =  db.searchByAgeRange(min,max)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchAfterUserId/:id', (request, response) => { 
    const {id} = request.params;
    console.log(id)
    const db = dbService.getDbServiceInstance()
    let result;
    if(id === "all")
       result = db.getAllData()
    else 
       result =  db.searchAfterUserId(id)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchAfterUserName/:name', (request, response) => { 
    const {name} = request.params;
    console.log(name)
    const db = dbService.getDbServiceInstance()
    let result;
    if(name === "all")
       result = db.getAllData()
    else 
       result =  db.searchAfterUserName(name)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/neverSignedIn', (request, response) => { 
    console.log("Never signed in search called")
    const db = dbService.getDbServiceInstance()
    const result =  db.searchNeverSignedIn()
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchSameDayAsUserId/:id', (request, response) => { 
    const {id} = request.params;
    console.log(id)
    const db = dbService.getDbServiceInstance()
    let result;
    if(id === "all")
       result = db.getAllData()
    else 
       result =  db.searchSameDayAsUserId(id)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchSameDayAsUserName/:name', (request, response) => { 
    const {name} = request.params;
    console.log(name)
    const db = dbService.getDbServiceInstance()
    let result;
    if(name === "all")
       result = db.getAllData()
    else 
       result =  db.searchSameDayAsUserName(name)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})

app.get('/searchToday', (request, response) => { 
    console.log("Today's search is called")
    const db = dbService.getDbServiceInstance()
    const result =  db.searchByRegisteredToday()
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})


// set up the web server listener
app.listen(process.env.PORT, 
    () => {
        console.log("I am listening.")
    }
);
