# Fake Store App - Development Plan

## 🎯 Project Overview

This development plan outlines the implementation of the Fake Store App across multiple milestones, with clear marking criteria and submission requirements for each phase.

## 🚀 Milestone 1: Basic Navigation and Product Display
Start Date:04/05/25
### Functional Requirements

#### Category Screen (5 points)
- [ ] Implement category fetching from Fake Store API
- [ ] Create scrollable category layout
- [ ] Add loading indicators
- [ ] Handle error states

#### Product List Screen (5 points)
- [ ] Implement navigation from categories
- [ ] Create FlatList-based product display
- [ ] Add loading states
- [ ] Implement error handling

#### Product Detail Screen (5 points)
- [ ] Create detailed product view
- [ ] Add back navigation
- [ ] Include disabled "Add to Shopping Cart" button
- [ ] Display product information:
  - Title
  - Image
  - Description
  - Price
- [ ] Implement loading indicators

### Technical Implementation
- Initialize Expo project with TypeScript
- Set up project structure
- Configure essential dependencies:
  - React Native Paper
  - Expo Router
- Implement API services for Fake Store API
- Create basic navigation structure

### Submission Requirements
- [ ] GitHub repository URL
- [ ] Commit history screenshot labeled "Milestone 1"
- [ ] Screenshots:
  - Category Screen
  - Product List Screen
  - Product Detail Screen

## 🛒 Milestone 2: Cart Implementation
Start Date: 15/05/25
### Functional Requirements

#### Add to Cart + State Management (5 points)
- [ ] Enable "Add to Cart" functionality
- [ ] Implement Redux Toolkit cart state
- [ ] Create cart actions and reducers

#### Bottom Tab Navigation (5 points)
- [ ] Create tabs:
  - Products (Category screen)
  - Shopping Cart
- [ ] Implement tab navigation logic
- [ ] Add proper routing

#### Shopping Cart Screen (5 points)
- [ ] Create empty cart state message
- [ ] Implement FlatList for cart items
- [ ] Add quantity controls
  - Increase/decrease buttons
  - Auto-remove at 0 quantity
- [ ] Display cart summary
  - Total cost
  - Item count
- [ ] Implement cart badge on tab

### Technical Implementation
- Set up Redux store configuration
- Create cart slice and actions
- Implement cart persistence
- Add cart calculations

### Submission Requirements
- [ ] GitHub repository URL
- [ ] Commit history screenshot labeled "Milestone 2"
- [ ] Screenshot of cartSlice.ts implementation
- [ ] Cart screen screenshots:
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