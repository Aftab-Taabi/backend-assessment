const Trade = require("../models/trades");

const postTrade = async (req, res) => {
    try {
      // Extract the trade object from the request body
      const { type, user_id, symbol, shares, price, timestamp } = req.body;
  
      // Create a new trade in the database
      const newTrade = await Trade.create({
        type,
        user_id,
        symbol,
        shares,
        price,
        timestamp,
      });
  
      // Respond with the created trade object
      res.status(201).json(newTrade);
    } catch (error) {
      console.error("Error creating trade:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  const getTrades = async (req, res) => {
    try {
      // Build the query based on the optional parameters
      const whereClause = {};
      if (req.query.type) {
        whereClause.type = req.query.type;
      }
      if (req.query.user_id) {
        whereClause.user_id = parseInt(req.query.user_id);
      }
  
      // Fetch trades from Sequelize based on the query
      const trades = await Trade.findAll({
        where: whereClause,
        order: [["id", "ASC"]],
      });
  
      // Respond with the array of trades
      res.status(200).json(trades);
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


const getTradeById = async (req, res) => {
    try {
      // Extract the trade ID from the request parameters
      const tradeId = parseInt(req.params.id);

      // Find the trade in the database by ID
      const trade = await Trade.findByPk(tradeId);

      // Respond based on whether the trade is found or not
      if (trade) {
        res.status(200).json(trade);
      } else {
        res.status(404).send("ID not found");
      }
    } catch (error) {
      console.error("Error retrieving trade:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  const operationForbidden = (req, res) => {
    res.status(405).send("Operation Not Allowed");
  }

  module.exports = {
    postTrade,
    getTrades,
    getTradeById,
    operationForbidden,
  }