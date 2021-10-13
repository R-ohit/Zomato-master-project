// libraries
import Express from "express";
import passport from "passport";

// database model
import { FoodModel } from "../../database/allModels";

const Router = express.Router();

/* hello
Router     /
Descrip    get all food based on particular restaurant
params     _id
access     public
method     Get
*/

Router.get("/:id", async (req,res) => {
    try {
        const {_id} = req.params;
        const foods = await FoodModel.find({ restaurant: _id});
        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Router     /r
Descrip    get all food based on particular category
params     category
access     public
method     Get
*/
Router.get("/r/:category", async(req,res) => {
    try {
        const {category} = req.params;
        const foods = await FoodModel.find({
            category: { $regex: category, $options: "i"}
        });
        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;