"use strict";
exports.id = 499;
exports.ids = [499];
exports.modules = {

/***/ 4499:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _atoms_cartState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8803);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6201);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_4__]);
react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const CartList = ({ data  })=>{
    const { id , name , image , quantity , price  } = data;
    const [cartItem, setCartItem] = (0,recoil__WEBPACK_IMPORTED_MODULE_2__.useRecoilState)(_atoms_cartState__WEBPACK_IMPORTED_MODULE_3__/* .cartState */ .d);
    const index = cartItem.findIndex((cartItem)=>cartItem === data);
    const addItemsToCart = ()=>{
        setCartItem((prevState)=>{
            return prevState.map((item)=>{
                return item.id === id ? {
                    ...item,
                    quantity: item.quantity + 1
                } : item;
            });
        });
    };
    const removeItem = ()=>()=>{
            const itemIndex = cartItem.findIndex((e)=>e === data);
            setCartItem([]);
        };
    const rmItemsToCart = ()=>{
        setCartItem((prevState)=>{
            return prevState.map((item)=>{
                if (item.quantity - 1 == 0 && item.id === id) {
                    //removar produto do carrinho
                    (0,react_hot_toast__WEBPACK_IMPORTED_MODULE_4__["default"])(`${item.name} removido do carrinho`);
                    return 0;
                }
                return item.id === id ? {
                    ...item,
                    quantity: item.quantity - 1 > 0 ? item.quantity - 1 : 0
                } : item;
            });
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "container p-2",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-[#fff] max-w-[800px] mx-auto mt-4 py-2 px-6 flex gap-6 items-center justify-between",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    className: "h-[80px]",
                    src: image,
                    alt: ""
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "font-bold text-1xl",
                            children: name
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex p-2",
                            children: [
                                quantity,
                                " x ",
                                price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "BRL"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex space-x-5",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-indigo-600 p-3 bg-indigo-300 rounded-full cursor-pointer",
                                    onClick: rmItemsToCart,
                                    children: " -  1"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-indigo-600 p-3 bg-indigo-300 rounded-full cursor-pointer",
                                    onClick: addItemsToCart,
                                    children: " +  1"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "text-1xl font-bold",
                    children: (price * quantity).toLocaleString("en-US", {
                        style: "currency",
                        currency: "BRL"
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartList);
function removeItemAtIndex(arr, index) {
    return [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ];
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;