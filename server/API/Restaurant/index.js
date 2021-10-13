import { RestaurantModel } from "../../database/allModels";

const Router = expres.Router();

/*
Route        /
des          get all restaurants details
params       none
access       Public
Method       Get
*/

Router.get("/", async(req, res) => {
    try{
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route        /
des          get get restaurants details on id
params       _id
access       Public
Method       Get
*/
Router.get("/:_id", async(req,res) => {
    try {
        const { _id} = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if(!restaurant)
        return res.status(404).json({error: error.message});

        return res.json({restaurant});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route        /search
des          get restaurants details on search
params       none
body         searchstring
access       Public
Method       Get
*/

Router.get("/search", (req,res) => {
    try {
        const {searchString} = req.body;

        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"}
        });
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;