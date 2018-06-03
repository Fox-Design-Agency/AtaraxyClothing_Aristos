const express = require("express")
const router = express.Router();
// const isAdmin = auth.isAdmin;

/*
* GET types
*/
router.get("/:item", function (req, res) {
    let product = req.params.item
    switch (product) {
        case "raglan":
            res.status(200).send(`<div class='form-group'><label for=''>Type</label><select id='typeselector' name='productType'><option value='none' ></option><option value='tultex'>Tultex 245</option></select></div>`)
            break;
        case "t-shirt":
            res.send("<div class='form-group'><label for=''>Type</label><select id='typeselector' name='productType'><option value='none'></option><option value='bella_canvas_3413'>Bella + Canvas 3413</option></select></div>")
            break;
        case "leggings":
            res.send("<div class='form-group'><label for=''>Type</label><select id='typeselector' name='productType'><option value='none'></option><option value='all-over'>All-Over </option></select></div>")
            break;
        default:
            res.send("<div>no</div>")
    }
})

/*
* GET types
*/
router.get("/:item/:choice", function (req, res) {
    let product = req.params.item
    let options = req.params.choice
    switch (product) {
        case "raglan":
            switch (options) {
                case "none":
                    res.send(" ")
                    break;
                case "tultex":
                    res.send(`<div class="size-holder">
                    <h4 for="">Color</h4>
                    </div>
                    <div class="size-holder">
                        <div>
                            <label for="color_white_black">white / black</label>
                            <input type="checkbox" class="checkbox" value="white_black" name="color" >
                        </div>
                            <div>
                            <label for="color_white_black">white / black</label>
                            <input type="checkbox" class="checkbox" value="white_black" name="color">
                        </div>
                        <div>
                            <label for="color_white_heathercharcoal">white / heather charcoal</label>
                            <input type="checkbox" value="white_heathercharcoal" name="color">
                        </div>
                        <div>
                            <label for="color_white_kelly">white / kelly</label>
                            <input type="checkbox" value="white_kelly" name="color">
                        </div>
                        <div>
                            <label for="color_white_navy">white / navy</label>
                            <input type="checkbox" value="white_navy" name="color">
                        </div>
                        <div>
                            <label for="color_white_red">white / red</label>
                            <input type="checkbox" value="white_red" name="color">
                        </div>
                        <div>
                            <label for="color_white_royal">white / royal</label>
                            <input type="checkbox" value="white_royal" name="color">
                        </div>
                        <div>
                            <label for="color_black_white">black / white</label>
                            <input type="checkbox" value="black_white" name="color">
                        </div>
                        <div>
                            <label for="color_heatherdenim_navy">heather denim /  navy</label>
                            <input type="checkbox" value="heatherdenim_navy" name="color">
                        </div>
                        <div>
                            <label for="color_heathergrey_heathercharcoal">heather grey / heather charcoal</label>
                            <input type="checkbox" value="heathergrey_heathercharcoal" name="color">
                        </div>
                        <div>
                            <label for="color_heathergrey_heatherred">heather grey / heather red</label>
                            <input type="checkbox" value="heathergrey_heatherred" name="color">
                        </div>
                        <div>
                            <label for="color_heathergrey_navy">heather grey / navy</label>
                            <input type="checkbox" value="heathergrey_navy" name="color">
                        </div>
                        <div>
                            <label for="color_heathergrey_black">heather grey / black</label>
                            <input type="checkbox" value="heathergrey_black" name="color">
                        </div>
                    </div>

                </div>
                <div class="size-holder">
                    <h4 for="">Sizes</h4>
                </div>
                <div class="size-holder">
                <div>
                        <label for="sizes_xsm">XSM</label>
                        <input type="checkbox" value="xsm" name="sizes" >
                    </div>
                    <div>
                        <label for="sizes_xsm">SM</label>
                        <input type="checkbox" value="sm" name="sizes">
                    </div>
                    <div>
                        <label for="sizes_xsm">MD</label>
                        <input type="checkbox" value="md" name="sizes">
                    </div>
                    <div>
                        <label for="sizes_xsm">LG</label>
                        <input type="checkbox" value="lg" name="sizes">
                    </div>
                    <div>
                        <label for="sizes_xsm">XLG</label>
                        <input type="checkbox" value="xlg" name="sizes">
                        </div>
                        <div>
                        <label for="sizes_xsm">2XLG</label>
                        <input type="checkbox" value="2xlg" name="sizes">
                        </div>
                        </div>
                        `)
                    break;
                default:
                    res.send("<div>no</div>")
            }
            break;
        case "t-shirt":
            switch (options) {
                case "none":
                    res.send(" ")
                    break;
                case "bella_canvas_3413":
                    res.send(`<div class="size-holder">
                    <h4 for="">Color</h4>
                </div>
                <div class="size-holder">

                    <div>
                        <label for="white_black">Emerald</label>
                        <input type="checkbox" class="checkbox" value="emerald" name="color">
                    </div>
                    <div>
                        <label for="white_heathercharcoal">Charcoal-Black</label>
                        <input type="checkbox" value="charcoalblack" name="color">
                    </div>
                    <div>
                        <label for="color_white_kelly">black</label>
                        <input type="checkbox" value="black" name="color">
                    </div>
                    <div>
                        <label for="color_white_navy">brown</label>
                        <input type="checkbox" value="brown" name="color">
                    </div>
                    <div>
                        <label for="color_white_red">grey</label>
                        <input type="checkbox" value="grey" name="color">
                    </div>
                    <div>
                        <label for="color_white_royal">navy</label>
                        <input type="checkbox" value="navy" name="color">
                    </div>
                    <div>
                        <label for="color_black_white">Athletic Grey</label>
                        <input type="checkbox" value="athletic_grey" name="color">
                    </div>
                    <div>
                        <label for="color_heatherdenim_navy">teal</label>
                        <input type="checkbox" value="teal" name="color">
                    </div>
                    <div>
                        <label for="color_heathergrey_heathercharcoal">true royal</label>
                        <input type="checkbox" value="true_royal" name="color">
                    </div>
                    <div>
                        <label for="color_heathergrey_heatherred">clay</label>
                        <input type="checkbox" value="clay" name="color">
                    </div>
                    <div>
                        <label for="color_heathergrey_navy">purple</label>
                        <input type="checkbox" value="purple" name="color">
                    </div>
                    <div>
                        <label for="color_heathergrey_black">green</label>
                        <input type="checkbox" value="green" name="color">
                    </div>
                    <div>
                        <label for="">maroon</label>
                        <input type="checkbox" value="maroon" name="color">
                    </div>
                    <div>
                        <label for="">blue</label>
                        <input type="checkbox" value="blue" name="color">
                    </div>
                    <div>
                        <label for="">oatmeal</label>
                        <input type="checkbox" value="oatmeal" name="color">
                    </div>
                    <div>
                    <label for="">white fleck</label>
                    <input type="checkbox" value="white_fleck" name="color">
                </div>
                <div>
                    <label for="">aqua</label>
                    <input type="checkbox" value="aqua" name="color">
                </div>
                <div>
                    <label for="">orange</label>
                    <input type="checkbox" value="orange" name="color">
                </div>
                <div>
                    <label for="">berry</label>
                    <input type="checkbox" value="berry" name="color">
                </div>
                <div>
                    <label for="">red</label>
                    <input type="checkbox" value="red" name="color">
                </div>
                </div>

            </div>
            <div class="size-holder">
                <h4 for="">Sizes</h4>
            </div>
            <div class="size-holder">

                <div>
                    <label for="sizes_xsm">XSM</label>
                    <input type="checkbox" value="xsm" name="sizes">
                </div>
                <div>
                    <label for="sizes_xsm">SM</label>
                    <input type="checkbox" value="sm" name="sizes">
                </div>
                <div>
                    <label for="sizes_xsm">MD</label>
                    <input type="checkbox" value="md" name="sizes">
                </div>
                <div>
                    <label for="sizes_xsm">LG</label>
                    <input type="checkbox" value="lg" name="sizes">
                </div>
                <div>
                    <label for="sizes_xsm">XLG</label>
                    <input type="checkbox" value="xlg" name="sizes">
                </div>
                <div>
                    <label for="sizes_xsm">2XLG</label>
                    <input type="checkbox" value="2xlg" name="sizes">
                </div>
                <div>
                    <label for="sizes_xsm">3XLG</label>
                    <input type="checkbox" value="3xlg" name="sizes">
                </div>
            </div>`)
                    break;
                default:
                    res.send("<div>no</div>")
            }
            break;
        case "leggings":
            switch (options) {
                case "none":
                    res.send(" ")
                    break;
                case "all-over":
                    res.send(`<div class="size-holder">
                    <h4 for="">Sizes</h4>
                </div>
                <div class="size-holder">

                    <div>
                        <label for="sizes_xsm">XSM</label>
                        <input type="checkbox" value="xsm" name="sizes">
                    </div>
                    <div>
                        <label for="sizes_xsm">SM</label>
                        <input type="checkbox" value="sm" name="sizes">
                    </div>
                    <div>
                        <label for="sizes_xsm">MD</label>
                        <input type="checkbox" value="md" name="sizes">
                    </div>
                    <div>
                        <label for="sizes_xsm">LG</label>
                        <input type="checkbox" value="lg" name="sizes">
                    </div>
                    <div>
                        <label for="sizes_xsm">XLG</label>
                        <input type="checkbox" value="xlg" name="sizes">
                    </div>
                </div>`)
                    break;
                default:
                    res.send("<div>no</div>")
            }
            break;
        default:
            res.send("something")
    }
})

//Exports
module.exports = router;