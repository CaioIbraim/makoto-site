"use strict";
(() => {
var exports = {};
exports.id = 118;
exports.ids = [118];
exports.modules = {

/***/ 8174:
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),

/***/ 2456:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
const stripe = __webpack_require__(8174)(process.env.STRIPE_SECRET_KEY);
async function handler(req, res) {
    if (req.method === "POST") {
        const items = req.body.cartItem;
        const transformedItems = items.map((item)=>({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [
                            req.headers.origin + item.image
                        ]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }));
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: transformedItems,
                mode: "payment",
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/`
            });
            res.json({
                "sessionURL": session.url
            });
        } catch (err) {
            console.log(err);
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2456));
module.exports = __webpack_exports__;

})();