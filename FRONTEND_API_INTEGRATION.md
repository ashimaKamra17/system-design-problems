# Frontend-Backend API Integration

## 🎯 Overview

The React frontend now connects to the Node.js/Express backend API instead of using local state. This provides a scalable foundation for a real-world news feed application.

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   React App     │ ◄──────────────► │   Express API   │
│   (Frontend)    │                 │   (Backend)     │
│                 │                 │                 │
│ • News Feed UI  │                 │ • Posts API     │
│ • WYSIWYG Post  │                 │ • Pagination    │
│ • Pagination    │                 │ • Validation    │
└─────────────────┘                 └─────────────────┘
     Port 5173                           Port 3002
```

## 🚀 Running the Application

### 1. Start Backend Server

```bash
cd server
npm run dev
# Server runs on http://localhost:3002
```

### 2. Start Frontend Server

```bash
# From project root
npm run dev
# Frontend runs on http://localhost:5173 (or next available port)
```

### 3. Access Application

- **Frontend**: http://localhost:5173/news-feed
- **Backend API**: http://localhost:3002/api/health

## 🔄 API Integration Features

### ✅ **Implemented**

1. **Posts API Connection**

   - Fetches posts from `/api/posts` with pagination
   - Displays loading states during API calls
   - Handles API errors with retry functionality

2. **Post Creation**

   - Creates posts via `/api/posts` POST endpoint
   - WYSIWYG content is sent as HTML to backend
   - Real-time UI updates after successful creation

3. **Pagination**

   - Backend provides pagination metadata
   - Frontend renders Previous/Next controls
   - Page navigation triggers new API requests

4. **Loading States**

   - Skeleton loading for initial page load
   - Disabled form during post creation
   - Loading indicators for pagination

5. **Error Handling**
   - Network error detection
   - User-friendly error messages
   - Retry functionality for failed requests

## 📡 API Service Architecture

### API Service (`src/services/api.js`)

```javascript
// Centralized API configuration
const apiService = {
  health: () => GET /api/health,
  posts: {
    getAll: (page, limit) => GET /api/posts?page=1&limit=10,
    create: (postData) => POST /api/posts,
    getById: (id) => GET /api/posts/:id
  }
};
```

### Key Features:

- **Axios instance** with base URL and timeout
- **Request/Response interceptors** for error handling
- **Future-ready** for authentication tokens
- **Consistent error handling** across all requests

## 🧪 Testing the Integration

### 1. **Backend Health Check**

```bash
curl http://localhost:3002/api/health
# Expected: {"status":"OK","timestamp":"..."}
```

### 2. **Fetch Posts**

```bash
curl "http://localhost:3002/api/posts?page=1&limit=3"
# Expected: {"posts":[...],"pagination":{...}}
```

### 3. **Create Post**

```bash
curl -X POST http://localhost:3002/api/posts \
  -H "Content-Type: application/json" \
  -d '{"userName":"Test","content":"<p>Hello API!</p>"}'
# Expected: {"success":true,"post":{...}}
```

### 4. **Frontend Integration Tests**

**Test 1: Page Load**

1. Open http://localhost:5173/news-feed
2. ✅ Should show loading skeletons
3. ✅ Should load posts from API
4. ✅ Should show pagination controls

**Test 2: Create Post**

1. Type content in WYSIWYG editor
2. Use formatting buttons (Bold, Italic, Lists)
3. Click "Post" button
4. ✅ Should disable form during creation
5. ✅ New post appears at top instantly
6. ✅ Editor clears after success

**Test 3: Pagination**

1. Click "Next" button
2. ✅ Should load page 2 posts
3. ✅ Should update pagination info
4. ✅ Previous button should be enabled

**Test 4: Error Handling**

1. Stop backend server
2. Try to create a post
3. ✅ Should show error message
4. ✅ Should show retry button
5. Restart server and click retry
6. ✅ Should recover successfully

## 📊 Data Flow

### 1. **Initial Load**

```
NewsFeed.jsx → apiService.posts.getAll(1, 10) → Server
              ← {posts: [...], pagination: {...}} ←
```

### 2. **Create Post**

```
CreatePost.jsx → NewsFeed.handleNewPost() → apiService.posts.create()
                                         ← {success: true, post: {...}}
                NewsFeed.setPosts([newPost, ...existingPosts])
```

### 3. **Pagination**

```
PaginationButton → NewsFeed.handlePageChange(2) → apiService.posts.getAll(2, 10)
                                                ← {posts: [...], pagination: {...}}
```

## 🔧 Configuration

### Environment Variables (Future)

```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3002/api",
  TIMEOUT: 10000,
  POSTS_PER_PAGE: 10,
};
```

### CORS Setup (Backend)

```javascript
// server/index.js
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true,
  })
);
```

## 🐛 Debugging

### Common Issues

1. **CORS Errors**

   - Check backend CORS configuration
   - Verify frontend URL in CORS origin

2. **Connection Refused**

   - Ensure backend server is running on port 3002
   - Check if port is available: `lsof -i :3002`

3. **404 Not Found**

   - Verify API endpoint URLs
   - Check server routes configuration

4. **Network Timeouts**
   - Check axios timeout configuration
   - Verify server response times

### Debug Tools

```bash
# Check running processes
ps aux | grep node

# Check port usage
lsof -i :3002
lsof -i :5173

# Test API directly
curl -v http://localhost:3002/api/posts
```

## 🚀 Next Steps

### Immediate Improvements

- [ ] **Error boundaries** for React error handling
- [ ] **Optimistic updates** for better UX
- [ ] **Debounced search** functionality
- [ ] **Infinite scroll** pagination

### Production Readiness

- [ ] **Environment configuration** for different environments
- [ ] **API caching** with React Query or SWR
- [ ] **Authentication** integration
- [ ] **Real-time updates** with WebSockets
- [ ] **Performance monitoring** and analytics

## 💡 System Design Benefits

1. **Separation of Concerns**: Clean API layer separation
2. **Scalability**: Ready for microservices architecture
3. **Maintainability**: Centralized API configuration
4. **Testability**: Mockable API service layer
5. **Performance**: Efficient pagination and loading states

Your News Feed now operates like a production application with proper client-server architecture! 🎉
