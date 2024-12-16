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

app.get('/searchId/:id', (request, response) => { 
    const {id} = request.params;
    console.log(id)
    const db = dbService.getDbServiceInstance()
    const result =  db.searchById(id)
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err))
})


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
  })

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

app.patch('/updatepaystatus/:order_id', 
     (request, response) => {
          console.log("app: update for payment status is called");
          const{order_id, payment_status} = request.body
          console.log(order_id)
          console.log(payment_status)
          const db = dbService.getDbServiceInstance();
          const result = db.updatePayStatus(order_id, payment_status);
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
          .catch(err => console.log(err))
     }
)

// Route to fetch top clients
app.get('/top-clients', async (request, response) => {
    console.log("Search for top clients is called");
    const db = dbService.getDbServiceInstance();
    try {
      const result = await db.getTopClients(); // This should retrieve data
      console.log("Top clients result:", result); // Log the data to ensure it's retrieved
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No top clients found' });
      }
    } catch (error) {
      console.error("Error fetching top clients:", error);
      response.status(500).json({ success: false, message: 'Error fetching top clients' });
    }
  })

// Route to fetch difficult clients
app.get('/difficult-clients', async (request, response) => {
    console.log("Search for difficult clients is called")
    const db = dbService.getDbServiceInstance()
    try {
      const result = await db.getDifficultClients()
      console.log("Difficult clients result:", result)
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No difficult clients found' });
      }
    } catch (error) {
      console.error("Error fetching difficult clients:", error);
      response.status(500).json({ success: false, message: 'Error fetching difficult clients' });
    }
  })

// Route to fetch thsi month quotes
app.get('/this-month-quotes', async (request, response) => {
    console.log("Search for this month quote is called")
    const db = dbService.getDbServiceInstance()
    try {
      const result = await db.getThisMonthQuotes()
      console.log("This month quotes result:", result)
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No quotes found for this month found' });
      }
    } catch (error) {
      console.error("Error fetching this month quotes:", error);
      response.status(500).json({ success: false, message: 'Error fetching thsi month quotes' });
    }
  })

// Route to fetch largest driveway clients
app.get('/largest-driveway', async (request, response) => {
    console.log("Search for largest driveway clients is called");
    const db = dbService.getDbServiceInstance();
    try {
      const result = await db.getLargestDriveway(); // This should retrieve data
      console.log("Largest Driveway clients result:", result); // Log the data to ensure it's retrieved
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No Largest Driveway clients found' });
      }
    } catch (error) {
      console.error("Error fetching largest driveway clients:", error);
      response.status(500).json({ success: false, message: 'Error fetching top clients' });
    }
  });
  
// Route to fetch prospective clients
app.get('/prospective-clients', async (request, response) => {
    console.log("Search for prospective clients is called")
    const db = dbService.getDbServiceInstance()
    try {
      const result = await db.getProspectiveClients()
      console.log("Prospective clients result:", result)
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No prospective clients found' });
      }
    } catch (error) {
      console.error("Error fetching prospective clients:", error);
      response.status(500).json({ success: false, message: 'Error fetching prospective clients' });
    }
  })

// Route to fetch overdue bills
app.get('/overdue-bills', async (request, response) => {
    console.log("Search for overdue bills is called")
    const db = dbService.getDbServiceInstance()
    try {
      const result = await db.getOverdueBills()
      console.log("Overdue Bills result:", result)
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No ovrdue bills found' });
      }
    } catch (error) {
      console.error("Error fetching overdue bills:", error);
      response.status(500).json({ success: false, message: 'Error fetching overdue bills' });
    }
  })

// Route to fetch bad clients
app.get('/bad-clients', async (request, response) => {
    console.log("Search for bad clients is called")
    const db = dbService.getDbServiceInstance()
    try {
      const result = await db.getBadClients()
      console.log("Bad clients result:", result)
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No bad clients found' });
      }
    } catch (error) {
      console.error("Error fetching bad clients:", error);
      response.status(500).json({ success: false, message: 'Error fetching bad clients' });
    }
  })

// Route to fetch good clients
app.get('/good-clients', async (request, response) => {
    console.log("Search for good clients is called")
    const db = dbService.getDbServiceInstance()
    try {
      const result = await db.getGoodClients()
      console.log("Good clients result:", result)
      if (result && result.length > 0) {
        response.json({ success: true, data: result });
      } else {
        response.status(404).json({ success: false, message: 'No good clients found' });
      }
    } catch (error) {
      console.error("Error fetching good clients:", error);
      response.status(500).json({ success: false, message: 'Error fetching good clients' });
    }
  })


// set up the web server listener
app.listen(process.env.PORT, 
    () => {
        console.log("I am listening.")
    }
);
