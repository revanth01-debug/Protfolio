// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------- LOGIN -----------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM user1 WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      if (result.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = result[0];
      res.json({
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
  );
});

// ----------------- GET MENU -----------------
app.get("/menu/:restaurant_id", (req, res) => {
  const { restaurant_id } = req.params;
  db.query(
    "SELECT * FROM menuitems WHERE restaurant_id=?",
    [restaurant_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      res.json(result);
    }
  );
});

// ----------------- PLACE ORDER -----------------
app.post("/orders", (req, res) => {
  const { user_id, restaurant_id, items, total_amount } = req.body;

  db.query(
    "INSERT INTO orders1 (user_id, restaurant_id, total_amount) VALUES (?,?,?)",
    [user_id, restaurant_id, total_amount],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });

      const orderId = result.insertId;

      // Insert each item into order_items
      items.forEach(item => {
        db.query(
          "INSERT INTO order_items (order_id, item_id, quantity) VALUES (?,?,?)",
          [orderId, item.item_id, item.quantity]
        );
      });

      res.json({ message: "Order placed", orderId });
    }
  );
});

// ----------------- GET ORDERS BY ROLE -----------------

// Customer orders
app.get("/orders/customer/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query(
    "SELECT o.*, r.name AS restaurant_name FROM orders o JOIN restaurants r ON o.restaurant_id=r.restaurant_id WHERE o.user_id=?",
    [user_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      res.json(result);
    }
  );
});

// Restaurant orders (pending, accepted, preparing)
app.get("/orders/restaurant", (req, res) => {
  db.query(
    "SELECT o.*, u.name AS customer_name FROM orders1 o JOIN users u ON o.user_id=u.user_id WHERE o.status IN ('pending','accepted','preparing')",
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      res.json(result);
    }
  );
});

// Delivery orders (on_the_way)
// Get orders for delivery
app.get("/orders/delivery", (req, res) => {
  const query = `
    SELECT o.*, u.name AS customer_name, r.name AS restaurant_name 
    FROM orders1 o
    JOIN user1 u ON o.user_id = u.user_id
    JOIN restaurants r ON o.restaurant_id = r.restaurant_id
    WHERE o.status='on_the_way'
  `;
  db.query(query, (err, result) => {
    if(err) return res.status(500).json({message:"DB Error"});
    res.json(result);
  });
});


// ----------------- UPDATE ORDER STATUS -----------------
app.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status, delivery_id } = req.body;

  db.query(
    "UPDATE orders SET status=?, delivery_id=? WHERE order_id=?",
    [status, delivery_id || null, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      res.json({ message: "Order updated" });
    }
  );
});

// ----------------- START SERVER -----------------
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
