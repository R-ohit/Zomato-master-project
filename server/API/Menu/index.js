import Express from "express";

//db model
import { MenuModel, ImageModel } from "../../database/allModels";

const Router = express.Router();

/*
Route        /list
des          get list of menu based on id
params       _id
access       Public
Method       Get
*/

Router.get("/r/:_id", async (req,res) => {
    try {
        const {_id} = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({menus});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});


/*
Route        /image
des          get menu image based on id
params       _id
access       Public
Method       Get
*/

Router.get("/image/:id", async(req,res) => {
    try {
        const {_id= req.params};
        const menus = await ImageModel.findOne(_id);

        return res.json({menus});
    }catch (eror) {
        return res.status.json:({error: error.message});
    }
});

export default Router;