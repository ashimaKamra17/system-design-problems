# News Feed API Server

A RESTful API server for the News Feed application with pagination support.

## 🚀 Features

- **Feed Posts API**: Fetch posts with pagination metadata
- **Create Posts**: Add new posts to the feed
- **CORS Support**: Ready for frontend integration
- **Security**: Helmet.js for security headers
- **Logging**: Morgan HTTP request logging
- **Error Handling**: Comprehensive error responses

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

Server runs on `http://localhost:3002`

## 📡 API Endpoints

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2025-07-25T05:16:34.759Z"
}
```

### Get Posts (with Pagination)

```http
GET /api/posts?page=1&limit=10
```

**Query Parameters:**

- `page` (optional): Page number (default: 1, min: 1)
- `limit` (optional): Posts per page (default: 10, min: 1, max: 50)

**Response:**

```json
{
  "posts": [
    {
      "id": "post-1",
      "userName": "John Doe",
      "userAvatar": "linear-gradient(45deg, #667eea, #764ba2)",
      "time": "2h ago",
      "createdAt": "2025-07-25T03:16:11.300Z",
      "content": "Just finished an amazing hike...",
      "hasImage": true,
      "imageGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imageUrl": null,
      "likes": 124,
      "comments": 18,
      "shares": 5,
      "avatarGradient": "linear-gradient(45deg, #667eea, #764ba2)"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalPosts": 5,
    "postsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextPage": 2,
    "prevPage": null
  }
}
```

### Create New Post

```http
POST /api/posts
Content-Type: application/json
```

**Request Body:**

```json
{
  "userName": "Test User",
  "content": "<p>This is a <strong>test post</strong> from the API! 🎉</p>",
  "hasImage": false,
  "imageUrl": null
}
```

**Response:**

```json
{
  "success": true,
  "post": {
    "id": "e35377e1-78a1-4561-a1fd-44b1112c1cbe",
    "userName": "Test User",
    "userAvatar": "linear-gradient(45deg, #667eea, #764ba2)",
    "time": "Just now",
    "createdAt": "2025-07-25T05:16:55.927Z",
    "content": "<p>This is a <strong>test post</strong> from the API! 🎉</p>",
    "hasImage": false,
    "imageGradient": null,
    "imageUrl": null,
    "likes": 0,
    "comments": 0,
    "shares": 0,
    "avatarGradient": "linear-gradient(45deg, #667eea, #764ba2)"
  },
  "message": "Post created successfully"
}
```

### Get Single Post

```http
GET /api/posts/:id
```

**Response:**

```json
{
  "post": {
    "id": "post-1",
    "userName": "John Doe",
    "content": "Just finished an amazing hike...",
    "time": "2h ago"
    // ... other post fields
  }
}
```

## 🔧 System Design Features

### Pagination

- **Offset-based pagination**: Uses `page` and `limit` parameters
- **Metadata**: Returns comprehensive pagination information
- **Performance**: Efficient for moderate dataset sizes
- **Scalability**: Ready for cursor-based pagination upgrade

### Data Structure

```javascript
// Post Schema
{
  id: string,           // UUID
  userName: string,     // Author name
  userAvatar: string,   // CSS gradient for avatar
  time: string,         // Human-readable time ago
  createdAt: string,    // ISO timestamp
  content: string,      // HTML content from WYSIWYG
  hasImage: boolean,    // Whether post has image
  imageGradient: string,// CSS gradient for placeholder
  imageUrl: string,     // Actual image URL (future)
  likes: number,        // Like count
  comments: number,     // Comment count
  shares: number        // Share count
}
```

### Error Handling

- **400**: Bad Request (validation errors)
- **404**: Not Found (post doesn't exist)
- **500**: Internal Server Error

## 🏗️ Architecture Decisions

1. **In-Memory Storage**: Simple for prototype, easy to replace with database
2. **UUID IDs**: Collision-resistant, database-agnostic
3. **Time Calculation**: Server-side for consistency
4. **CORS Enabled**: Ready for frontend integration
5. **Express.js**: Fast, minimal, and widely adopted

## 🔄 Next Steps

- [ ] **Database Integration**: MongoDB/PostgreSQL
- [ ] **Authentication**: JWT tokens
- [ ] **Real-time Updates**: WebSocket support
- [ ] **Image Upload**: File handling and storage
- [ ] **Caching**: Redis for performance
- [ ] **Rate Limiting**: Prevent API abuse
- [ ] **Testing**: Unit and integration tests

## 🧪 Testing Examples

```bash
# Health check
curl http://localhost:3002/api/health

# Get posts (page 1, 3 posts)
curl "http://localhost:3002/api/posts?page=1&limit=3"

# Create a post
curl -X POST http://localhost:3002/api/posts \
  -H "Content-Type: application/json" \
  -d '{"userName":"API User","content":"Hello from API!"}'

# Get specific post
curl http://localhost:3002/api/posts/post-1
```
