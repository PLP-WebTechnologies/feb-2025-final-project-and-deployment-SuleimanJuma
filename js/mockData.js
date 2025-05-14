// Mock Data for the Prototype

// Sample Products
const mockProducts = [
    { id: 1, name: "Wireless Headphones", price: 25999.87, image: "image/men's clothing.png" },
    { id: 2, name: "Smart Watch Pro", price: 32499.87, image: "image/women's clothing.png" },
    { id: 3, name: "Modern Sofa Set", price: 45000.00, image: "image/household furniture.jpg" }
];

// Sample Users
const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", address: "123 Main St, Nairobi", phone: "+254700123456" }
];

// Sample Cart Items
let mockCart = [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 }
];

// Export Mock Data
export { mockProducts, mockUsers, mockCart };