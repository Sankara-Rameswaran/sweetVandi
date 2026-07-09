# SweetVandi - Database Design

## Overview

SweetVandi is a single-vendor e-commerce platform where customers can browse sweets, customize quantities, place orders, make online payments, and track deliveries. This document defines the database entities before implementing Mongoose models.

---

# Collections

1. User
2. Address
3. Category
4. Product
5. Cart
6. Order
7. Review
8. Coupon

---

# 1. User

### Purpose

Stores customer and admin information.

### Fields

| Field        | Type     | Description       |
| ------------ | -------- | ----------------- |
| _id          | ObjectId | Primary Key       |
| name         | String   | Full Name         |
| email        | String   | Unique Email      |
| password     | String   | Hashed Password   |
| mobileNumber | String   | Contact Number    |
| dateOfBirth  | Date     | DOB               |
| avatar       | String   | Profile Image     |
| role         | Enum     | customer, admin   |
| isVerified   | Boolean  | Email Verified    |
| isActive     | Boolean  | Active Account    |
| refreshToken | String   | JWT Refresh Token |
| createdAt    | Date     | Created Time      |
| updatedAt    | Date     | Updated Time      |

---

# 2. Address

### Purpose

Stores multiple delivery addresses for each user.

### Fields

| Field        | Type            | Description                       |
| ------------ | --------------- | --------------------------------- |
| _id          | ObjectId        | Primary Key                       |
| user         | ObjectId (User) | Owner                             |
| receiverName | String          | Receiver Name                     |
| mobileNumber | String          | Contact Number                    |
| houseNo      | String          | House Number                      |
| street1      | String          | Street                            |
| street2      | String          | Optional Street                   |
| landmark     | String          | Landmark                          |
| town         | String          | Town                              |
| city         | String          | City                              |
| state        | String          | State                             |
| country      | String          | Country                           |
| pincode      | String          | Postal Code                       |
| addressType  | Enum            | Home, Office, Other               |
| locationType | Enum            | Villa, Apartment, Gated Community |
| isDefault    | Boolean         | Default Address                   |
| createdAt    | Date            | Created Time                      |
| updatedAt    | Date            | Updated Time                      |

---

# 3. Category

### Purpose

Groups products.

### Fields

| Field       | Type     | Description    |
| ----------- | -------- | -------------- |
| _id         | ObjectId | Primary Key    |
| name        | String   | Category Name  |
| slug        | String   | URL Slug       |
| image       | String   | Category Image |
| description | String   | Description    |
| isActive    | Boolean  | Status         |
| createdAt   | Date     | Created Time   |
| updatedAt   | Date     | Updated Time   |

Example Categories

* Sweets
* Snacks
* Chocolates
* Cakes
* Gift Boxes

---

# 4. Product

### Purpose

Stores all sweets sold by the shop.

### Fields

| Field            | Type                | Description                                               |
| ---------------- | ------------------- | --------------------------------------------------------- |
| _id              | ObjectId            | Primary Key                                               |
| name             | String              | Product Name                                              |
| slug             | String              | SEO Slug                                                  |
| description      | String              | Product Description                                       |
| category         | ObjectId (Category) | Category Reference                                        |
| basePricePerKg   | Number              | Price per KG                                              |
| availableWeights | Array(Number)       | Example: 250, 500, 1000, 2000                             |
| images           | Array(String)       | Product Images                                            |
| stock            | Number              | Available Stock (grams or kilograms based on your design) |
| averageRating    | Number              | Average Rating                                            |
| totalReviews     | Number              | Review Count                                              |
| isAvailable      | Boolean             | Available for Sale                                        |
| createdAt        | Date                | Created Time                                              |
| updatedAt        | Date                | Updated Time                                              |

---

# 5. Cart

### Purpose

Temporary shopping cart for each customer.

### Fields

| Field     | Type              | Description      |
| --------- | ----------------- | ---------------- |
| _id       | ObjectId          | Primary Key      |
| user      | ObjectId (User)   | Customer         |
| items     | Array             | Cart Items       |
| subtotal  | Number            | Before Discount  |
| discount  | Number            | Discount Applied |
| total     | Number            | Final Total      |
| coupon    | ObjectId (Coupon) | Applied Coupon   |
| createdAt | Date              | Created Time     |
| updatedAt | Date              | Updated Time     |

### Cart Item

* product
* quantity
* selectedWeight
* pricePerKg
* subtotal

---

# 6. Order

### Purpose

Stores placed orders.

### Fields

| Field           | Type               | Description                                                               |
| --------------- | ------------------ | ------------------------------------------------------------------------- |
| _id             | ObjectId           | Primary Key                                                               |
| user            | ObjectId (User)    | Customer                                                                  |
| items           | Array              | Purchased Products                                                        |
| shippingAddress | ObjectId (Address) | Delivery Address                                                          |
| paymentMethod   | Enum               | COD, Razorpay                                                             |
| paymentStatus   | Enum               | Pending, Paid, Failed, Refunded                                           |
| orderStatus     | Enum               | Pending, Confirmed, Packed, Shipped, OutForDelivery, Delivered, Cancelled |
| coupon          | ObjectId (Coupon)  | Coupon Used                                                               |
| subtotal        | Number             | Before Discount                                                           |
| discount        | Number             | Discount                                                                  |
| deliveryCharge  | Number             | Delivery Fee                                                              |
| totalAmount     | Number             | Final Amount                                                              |
| placedAt        | Date               | Order Time                                                                |
| createdAt       | Date               | Created Time                                                              |
| updatedAt       | Date               | Updated Time                                                              |

### Order Item

Each item stores a snapshot of the product.

* productId
* productName
* selectedWeight
* quantity
* priceAtPurchase
* subtotal

---

# 7. Review

### Purpose

Stores customer reviews.

### Fields

| Field     | Type               | Description  |
| --------- | ------------------ | ------------ |
| _id       | ObjectId           | Primary Key  |
| user      | ObjectId (User)    | Reviewer     |
| product   | ObjectId (Product) | Product      |
| rating    | Number             | 1–5          |
| comment   | String             | Review       |
| createdAt | Date               | Created Time |
| updatedAt | Date               | Updated Time |

---

# 8. Coupon

### Purpose

Stores discount coupons.

### Fields

| Field              | Type     | Description       |
| ------------------ | -------- | ----------------- |
| _id                | ObjectId | Primary Key       |
| code               | String   | Coupon Code       |
| discountType       | Enum     | Percentage, Fixed |
| discountValue      | Number   | Discount Value    |
| minimumOrderAmount | Number   | Minimum Order     |
| maximumDiscount    | Number   | Maximum Discount  |
| expiryDate         | Date     | Expiration        |
| usageLimit         | Number   | Maximum Usage     |
| usedCount          | Number   | Current Usage     |
| isActive           | Boolean  | Status            |
| createdAt          | Date     | Created Time      |
| updatedAt          | Date     | Updated Time      |

---

# Relationships

```
User
 ├── Address (One → Many)
 ├── Cart (One → One)
 └── Order (One → Many)

Category
 └── Product (One → Many)

Product
 └── Review (One → Many)

Coupon
 ├── Cart
 └── Order

Order
 ├── User
 ├── Address
 └── Coupon
```

---

# Database Notes

* Passwords must always be stored as hashed values.
* Never store plain-text passwords.
* Order items must store a snapshot of the product price and name at the time of purchase.
* Products should not be deleted permanently if they have existing orders; consider soft deletion (`isAvailable` or `isDeleted`).
* One user can save multiple delivery addresses.
* A cart belongs to exactly one user.
* Reviews should be allowed only after a successful purchase (business rule to enforce in the service layer).
* Use MongoDB timestamps (`createdAt` and `updatedAt`) for all collections.
