import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors=async (req:Request,res:Response,next:NextFunction)=>
{
    const errors=validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    next();
}

export const validateMyUserRequest=
[
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("address").isString().notEmpty().withMessage("Address must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors
];

export const validateMyRestaurantRequest=
[
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("estimatedDeliveryTime").isInt({ min: 0 }).withMessage("Estimated Delivery Time must be a postivie integer"),
    body("deliveryPrice").isFloat({ min: 0 }).withMessage("Delivery Price must be a positive number"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu Items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu Item Name is required"),
    body("menuItems.*.price").isFloat({ min: 0 }).withMessage("Menu Item Price is required and must be a postive number"),
    handleValidationErrors,
];