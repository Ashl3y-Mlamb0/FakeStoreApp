# Fake Store App - Project Flow and Feature Overview

## Overview
The **Fake Store App** is a mobile shopping application developed using **React Native with TypeScript**, **Expo**, and **Expo Router**. The app integrates with both the [public Fake Store API](https://fakestoreapi.com/) and a custom backend server (`fake-store-server`) for cart persistence, user management, and order tracking. Supabase is used for authentication and auxiliary backend tasks. The UI is constructed using **React Native Paper** for a professional and consistent appearance.

## 📊 Tech Stack
| Layer        | Technology                            |
|--------------|----------------------------------------|
| Frontend     | React Native + TypeScript + Expo      |
| Navigation   | Expo Router (React Navigation)        |
| Backend      | `fake-store-server` (Node.js Express) |
| Auth         | Supabase Auth                         |
| UI Library   | React Native Paper                    |
| State Mgmt   | Redux Toolkit                         |
| Storage      | AsyncStorage (for temporary cart state)|

## 📁 Project Structure
```
/fake-store-app
├── App.tsx
├── app.json
├── tsconfig.json
├── babel.config.js
├── /src
│   ├── /assets
│   │   ├── /images
│   │   ├── /icons
│   │   └── /fonts
│   ├── /components
│   │   ├── /common
│   │   │   ├── Button.tsx
│   │   │   ├── LoadingIndicator.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── /products
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   └── CategoryList.tsx
│   │   ├── /cart
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── /orders
│   │   │   ├── OrderItem.tsx
│   │   │   └── OrderList.tsx
│   │   └── /layout
│   │       ├── Header.tsx
│   │       └── TabBar.tsx
│   ├── /config
│   │   ├── constants.ts
│   │   ├── theme.ts
│   │   └── api.ts
│   ├── /hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useOrders.ts
│   │   └── useProducts.ts
│   ├── /navigation
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── types.ts
│   ├── /redux
│   │   ├── store.ts
│   │   ├── /slices
│   │   │   ├── cartSlice.ts
│   │   │   ├── authSlice.ts
│   │   │   └── orderSlice.ts
│   │   └── /selectors
│   │       ├── cartSelectors.ts
│   │       └── orderSelectors.ts
│   ├── /screens
│   │   ├── /auth
│   │   │   ├── SignInScreen.tsx
│   │   │   └── SignUpScreen.tsx
│   │   ├── /products
│   │   │   ├── CategoryScreen.tsx
│   │   │   ├── ProductListScreen.tsx
│   │   │   └── ProductDetailScreen.tsx
│   │   ├── /cart
│   │   │   ├── CartScreen.tsx
│   │   │   └── CheckoutScreen.tsx
│   │   ├── /orders
│   │   │   └── OrdersScreen.tsx
│   │   ├── /profile
│   │   │   └── ProfileScreen.tsx
│   │   └── SplashScreen.tsx
│   ├── /services
│   │   ├── /api
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   └── auth.ts
│   │   ├── /supabase
│   │   │   ├── client.ts
│   │   │   └── types.ts
│   │   └── /storage
│   │       └── asyncStorage.ts
│   ├── /types
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   └── user.ts
│   └── /utils
│       ├── validation.ts
│       ├── formatting.ts
│       └── testing.ts
├── /tests
│   ├── /components
│   ├── /screens
│   └── /utils
├── .env.example
├── .gitignore
└── README.md
```

## 🧭 App Navigation Flow
```
SplashScreen
    ↓
SignIn / SignUp (Supabase Auth)
    ↓
Main Tabs (Protected)
├── Products Tab → CategoryScreen → ProductListScreen → ProductDetailScreen
│                                      └── Add to Cart (Redux action)
├── Cart Tab → CartScreen
│        └── Checkout → Create Order (API call)
├── Orders Tab → OrdersScreen → Expand/Collapse Details → Pay/Receive buttons
└── Profile Tab → ProfileScreen → Update / Sign Out
```

## 🔹 Feature Implementation

### Splash Screen
- Brief app intro with animated or static branding ("Fake Store").

### Authentication (Sign Up / Sign In)
- Supabase email/password auth.
- Screens toggle via prompt ("Already have an account? Sign in").
- On success, redirect to Profile tab.

### Category Screen
- Fetch categories from Fake Store API.
- Display using `FlatList` with `ActivityIndicator` while loading.

### Product List Screen
- Fetch products by category.
- Use `FlatList` to render product cards.
- Show `ActivityIndicator` during loading.

### Product Detail Screen
- Display product image, title, description, price.
- Buttons:
  - Back
  - Add to Cart → dispatch `addToCart(product)` via Redux.

### Cart Screen
- If empty: show "Your shopping cart is empty."
- If items present:
  - Render with `FlatList`
  - Increase/decrease quantity buttons
  - Show total price and item count
  - Automatically remove items with 0 quantity

### Orders Screen
- Display orders grouped by status: New, Paid, Delivered
- Expand for detail view with products
- Buttons:
  - Pay → update status via API
  - Receive → update to Delivered

### Checkout
- Accessible when cart has items
- On checkout, call backend API to create an order
- Clear cart post-order creation

### Profile Screen
- View name/email
- Update popup form (name + password)
- Sign out functionality

## 📝 State Management
- Redux Toolkit used for cart state:
```ts
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}
```
- `cartSlice.ts` handles add, remove, increment, decrement.

## ⚖️ API Integration
### Public API:
- Fetch products and categories from `https://fakestoreapi.com/`

### Fake Store Server:
- Hosted locally or deployed instance
- Used for:
  - Cart persistence
  - Order creation & management
  - User profile updates
- Example endpoints:
  - `POST /auth/signup`
  - `POST /auth/login`
  - `POST /cart`
  - `GET /orders`

## 🚀 Dev Features
- Use `ActivityIndicator` for all async actions
- Protect tabs using conditional rendering based on auth state
- Store auth session in `AsyncStorage`

## 👥 User Isolation and Data Separation

To ensure that each user has a personalized experience within the app, including isolated shopping carts, orders, and profiles, the Fake Store App integrates both **Supabase Authentication** and the custom **Fake Store Server**.

### 🔐 Authentication with Supabase
Supabase is responsible for managing user identity:
- Handles sign-up, sign-in, and session persistence.
- Issues a secure `access_token` upon successful authentication.
- Provides a unique `user.id` that is used to associate user-specific data.

### 🔄 Data Isolation via Fake Store Server
The Fake Store Server is responsible for all data operations that must be user-specific, including:
- 🛒 Shopping cart management
- 📦 Order creation and status tracking
- 👤 User profile updates

All API requests to the Fake Store Server must include the authenticated user's token in the request header:
```http
Authorization: Bearer <supabase_token>

## 🔧 Testing Checklist
- [ ] Category screen loads categories
- [ ] Product lists render correctly per category
- [ ] Product details are shown properly
- [ ] Cart adds/removes products correctly
- [ ] Badge updates on tab bar
- [ ] Orders reflect correct status and items
- [ ] Profile updates persist
- [ ] Auth flow behaves as expected (sign up, in, out)
- [ ] All screens use consistent Paper UI components

## ✨ Future Improvements
- Payment gateway integration
- Product reviews & ratings
- Enhanced cart animations
- AI-based recommendations

## 🧗 Milestone 1

### Functional Requirements

#### Category Screen
- Fetch product categories from the public [Fake Store API](https://fakestoreapi.com/)
- Display categories in a scrollable layout
- Use `ActivityIndicator` while loading data

#### Product List Screen
- Navigate from a selected category to display products in that category
- Show products using `FlatList`
- Use `ActivityIndicator` during data fetch

#### Navigation
- Include a back button to return from the Product List to the Category screen

#### Product Detail Screen
- Navigate from the product list to view product details
- Include a back button and a disabled "Add to Shopping Cart" button
- Display product details (title, image, description, price)
- Use loading indicators appropriately

### Marking Criteria
| Component | Points |
|-----------|--------|
| Category Screen | 5 |
| Product List Screen | 5 |
| Product Detail Screen | 5 |

### Submission Requirements
- GitHub repository URL
- Commit history screenshot labeled "Milestone 1"
- Screenshots of Category, Product List, and Product Detail screens

## 🛒 Milestone 2

### Functional Requirements

#### Add to Cart + State Management
- Enable the "Add to Cart" button on the Product Detail screen
- Use `reduxjs/toolkit` to manage cart state

#### Bottom Tab Navigation
- Tabs: `Products`, `Shopping Cart`
- Products tab routes to Category screen
- Cart tab opens Shopping Cart screen

#### Shopping Cart Screen
- Show "Your shopping cart is empty" if no items
- Use `FlatList` to display items when present
- Include quantity controls (increase/decrease)
- Auto-remove items when quantity reaches 0
- Display total cost and item count at the top
- Show a badge on the Cart tab indicating item quantity

### Marking Criteria
| Component | Points |
|-----------|--------|
| Bottom Tab Navigation | 5 |
| Cart Screen Implementation | 5 |
| Cart Badge Functionality | 5 |

### Submission Requirements
- GitHub repository URL
- Commit history screenshot labeled "Milestone 2"
- Screenshot of the `cartSlice.ts` Redux implementation
- Cart screen screenshots: empty, single item, multiple items

## 🚀 Final Submission

### Project Integration
- Switch from public API to [Fake Store Server](https://github.com/LarryAtGU/fake-store-server)
- Ensure all cart, order, and user profile features persist via the server

### Application Requirements
#### Required Screens
1. **Splash Screen**
   - Shows "Fake Store" intro
2. **Sign In / Sign Up**
   - Toggle between forms
   - Input validation with alerts
   - Navigate to profile on success
3. **User Profile**
   - Display name and email
   - Enable update and sign out functionality
4. **Product Browsing**
   - Category → Product List → Product Detail → Add to Cart
5. **Shopping Cart**
   - Fully functional with real-time state and badge
6. **Checkout**
   - Create order and clear cart
7. **My Orders**
   - Grouped by `New`, `Paid`, `Delivered`
   - Expandable order view
8. **Pay and Receive**
   - Buttons to mark orders as paid/received
   - Trigger status updates and UI refresh
9. **App Reload + Session**
   - Persist session and data after app reload
   - Restore state on re-login

### Additional Requirements
- Badge state must clear on sign out
- Demonstrate multiple users with different carts/orders in the demo
- Submit GitHub URL and demo video (≤ 8 minutes)
- Optional: reflection (required for Masters students)

### Marking Criteria (60 points)
| Feature | Points |
|---------|--------|
| Splash Screen | 5 |
| Tab Protection (auth wall) | 5 |
| Sign In / Sign Up Toggle | 5 |
| Signup and Form Validation | 5 |
| Profile Update + Sign Out | 5 |
| Re-login Behavior | 5 |
| Shopping Cart Functionality | 5 |
| Checkout & Cart Clear | 5 |
| My Orders + Order Details View | 5 |
| Pay and Receive Order Status Updates | 5 |
| Badge Reset and Session Restoration | 5 |
| App Reload and State Recovery | 5 |

**Peer Review**: +10 points

## 📄 Resources
- [Fake Store API](https://fakestoreapi.com/)
- [Fake Store Server GitHub](https://github.com/LarryAtGU/fake-store-server)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Supabase](https://supabase.com/docs)
- [Expo Docs](https://docs.expo.dev)
