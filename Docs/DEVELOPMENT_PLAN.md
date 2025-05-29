# Fake Store App - Development Plan

## 🎯 Project Overview

This development plan outlines the implementation of the Fake Store App across multiple milestones, with clear marking criteria and submission requirements for each phase.

## 🚀 Milestone 1: Basic Navigation and Product Display
Start Date:04/05/25
### Functional Requirements

#### Category Screen (5 points)
- [x] Implement category fetching from Fake Store API
- [x] Create scrollable category layout
- [x] Add loading indicators
- [x] Handle error states

#### Product List Screen (5 points)
- [x] Implement navigation from categories
- [x] Create FlatList-based product display
- [x] Add loading states
- [x] Implement error handling

#### Product Detail Screen (5 points)
- [x] Create detailed product view
- [x] Add back navigation
- [x] Include disabled "Add to Shopping Cart" button
- [x] Display product information:
  - Title
  - Image
  - Description
  - Price
- [x] Implement loading indicators

### Technical Implementation
- [x] Initialize Expo project with TypeScript
- [x] Set up project structure
- [x] Configure essential dependencies:
  - React Native Paper
  - Expo Router
- [x] Implement API services for Fake Store API
- [x] Create basic navigation structure

### Submission Requirements
- [x] GitHub repository URL
- [x] Commit history screenshot labeled "Milestone 1"
- [x] Screenshots:
  - Category Screen
  - Product List Screen
  - Product Detail Screen

## 🛒 Milestone 2: Cart Implementation
Start Date: 15/05/25
### Functional Requirements

#### Add to Cart + State Management (5 points)
- [x] Enable "Add to Cart" functionality
- [x] Implement Redux Toolkit cart state
- [x] Create cart actions and reducers

#### Bottom Tab Navigation (5 points)
- [x] Create tabs:
  - Products (Category screen)
  - Shopping Cart
- [x] Implement tab navigation logic
- [x] Add proper routing

#### Shopping Cart Screen (5 points)
- [x] Create empty cart state message
- [x] Implement FlatList for cart items
- [x] Add quantity controls
  - Increase/decrease buttons
  - Auto-remove at 0 quantity
- [x] Display cart summary
  - Total cost
  - Item count
- [x] Implement cart badge on tab

### Technical Implementation
- [x] Set up Redux store configuration
- [x] Create cart slice and actions
- [x] Implement cart persistence
- [x] Add cart calculations

### Submission Requirements
- [x] GitHub repository URL
- [x] Commit history screenshot labeled "Milestone 2"
- [x] Screenshot of cartSlice.ts implementation
- [x] Cart screen screenshots:
  - Empty state
  - Single item
  - Multiple items

## 🎯 Final Milestone: Complete Application
Start Date:21/05/25
### Functional Requirements (60 points total)

#### Authentication and User Management (20 points)
- [ ] Splash Screen (5 points)
  - Display "Fake Store" intro
- [ ] Sign In / Sign Up Toggle (5 points)
  - Form validation
  - Error alerts
- [ ] Profile Management (5 points)
  - Update functionality
  - Sign out
- [ ] Tab Protection (5 points)
  - Auth wall implementation

#### Shopping Experience (20 points)
- [ ] Shopping Cart Functionality (5 points)
  - Real-time updates
  - State management
- [ ] Checkout Process (5 points)
  - Order creation
  - Cart clearing
- [ ] Order Management (5 points)
  - Status groups: New, Paid, Delivered
  - Expandable details
- [ ] Order Actions (5 points)
  - Pay functionality
  - Receive functionality

#### State and Session Management (20 points)
- [ ] Badge Management (5 points)
  - Update with cart changes
  - Clear on sign out
- [ ] Session Handling (5 points)
  - Persist user session
  - Handle re-login
- [ ] App State (5 points)
  - Reload behavior
  - State recovery
- [ ] Multi-user Support (5 points)
  - Separate cart states
  - Isolated order history

### Technical Implementation
- Integrate with Fake Store Server
- Implement Supabase authentication
- Create persistent storage solution
- Add comprehensive error handling
- Implement loading states

### Additional Requirements
- [ ] Switch from public API to Fake Store Server
- [ ] Implement all 9 distinct screens
- [ ] Ensure proper state persistence
- [ ] Add comprehensive error handling
- [ ] Implement loading states

### Submission Requirements
- [ ] GitHub repository URL
- [ ] Demo video (≤ 8 minutes)
- [ ] Screenshots of all screens
- [ ] Optional: reflection document

## 📋 Development Guidelines

### Code Quality
- Use TypeScript throughout
- Follow React Native best practices
- Implement proper error handling
- Use async/await for API calls
- Add comprehensive type definitions

### Component Architecture
- Create reusable components
- Use React Native Paper
- Implement proper prop validation
- Follow atomic design principles

### State Management
- Use Redux Toolkit
- Implement proper actions/reducers
- Create meaningful selectors
- Handle loading/error states

### Testing Strategy
- Unit test critical functionality
- Test edge cases
- Verify state persistence
- Test auth flows
- Validate multi-user isolation

## 🔄 Development Workflow

1. Feature Implementation
   - Create feature branch
   - Implement functionality
   - Add tests
   - Document changes

2. Review Process
   - Code review
   - Test verification
   - Documentation check
   - Performance validation

3. Deployment
   - Merge to main
   - Version tag
   - Update documentation
   - Verify deployment

   Ensure all files creation dates allign with the start date of their respective milestone

## 📚 Resources
- [Fake Store API](https://fakestoreapi.com/)
- [Fake Store Server](https://github.com/LarryAtGU/fake-store-server)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Supabase](https://supabase.com/docs)
- [Expo Documentation](https://docs.expo.dev) 