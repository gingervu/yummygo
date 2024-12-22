-- STEP 1: CREATE DATABASE AND INSTALL POSTGIS
-- Tạo cơ sở dữ liệu có tên 'food_delivery'
CREATE DATABASE food_delivery;

-- Chuyển sang sử dụng cơ sở dữ liệu vừa tạo
\c food_delivery;

-- Cài đặt extension PostGIS để hỗ trợ dữ liệu địa lý (geospatial)
CREATE EXTENSION postgis;

-- STEP 2: CREATE TABLES

-- Bảng users: Lưu thông tin người dùng chung
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Bảng admin: Lưu thông tin quản trị viên
CREATE TABLE IF NOT EXISTS admin (
    admin_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    CONSTRAINT fk_admin_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng customers: Lưu thông tin khách hàng
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    customer_level SMALLINT DEFAULT 0 CHECK (customer_level BETWEEN 0 AND 10),
    CONSTRAINT fk_customer_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng drivers: Lưu thông tin tài xế
CREATE TABLE IF NOT EXISTS drivers (
    driver_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    driver_status TEXT DEFAULT 'available' CHECK (driver_status IN ('available', 'busy', 'inactive')),
    CONSTRAINT fk_driver_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng drivers_location: Lưu vị trí địa lý hiện tại của tài xế
CREATE TABLE IF NOT EXISTS drivers_location (
    driver_id INT PRIMARY KEY,
    location GEOGRAPHY(Point, 4326) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_driver_location FOREIGN KEY (driver_id) REFERENCES drivers(driver_id) ON DELETE CASCADE
);

-- Bảng merchants: Lưu thông tin nhà cung cấp
CREATE TABLE IF NOT EXISTS merchants (
    merchant_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('noodles_pho', 'bread_sticky_rice', 'fried_chicken_burger', 'vegetarian_food', 'seafood', 'rice', 'milk_tea', 'dessert', 'snack', 'pizza', 'hotpot_grill', 'coffee')),
    num_of_branches INT DEFAULT 1,
    CONSTRAINT fk_merchant_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng restaurants: Lưu thông tin chi nhánh của nhà cung cấp
CREATE TABLE IF NOT EXISTS restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    merchant_id INT NOT NULL,
    name TEXT NOT NULL,
    address TEXT,
    geom GEOGRAPHY(Point, 4326),
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'under_maintenance', 'temporarily_closed', 'inactive')),
    CONSTRAINT fk_restaurant_merchant FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id) ON DELETE CASCADE
);

-- Bảng menu_items: Lưu thông tin món ăn của chi nhánh nhà cung cấp
CREATE TABLE IF NOT EXISTS menu_items (
    item_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    img_url TEXT,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'unavailable')),
    CONSTRAINT fk_menuitem_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

-- Bảng orders: Lưu thông tin đơn hàng
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    driver_id INT,
    address TEXT NOT NULL,
    geom GEOGRAPHY(Point, 4326),
    delivery_fee DECIMAL(10, 2) DEFAULT 0 CHECK (delivery_fee >= 0),
    food_fee DECIMAL(10, 2) DEFAULT 0 CHECK (food_fee >= 0),
    order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'awaiting_payment', 'accepted', 'on_the_way', 'delivered', 'failed', 'canceled', 'refunded', 'disputed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP,
    note TEXT,
    promo_id INT,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    CONSTRAINT fk_order_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    CONSTRAINT fk_order_driver FOREIGN KEY (driver_id) REFERENCES drivers(driver_id)
);

-- Bảng order_items: Lưu thông tin các món ăn trong đơn hàng
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT fk_orderitems_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- Bảng payments: Lưu thông tin thanh toán cho đơn hàng
CREATE TABLE IF NOT EXISTS payments (
    order_id INT PRIMARY KEY,
    delivery_fee DECIMAL(10, 2) NOT NULL CHECK (delivery_fee >= 0),
    food_fee DECIMAL(10, 2) NOT NULL CHECK (food_fee >= 0),
    method TEXT NOT NULL CHECK (method IN ('cash', 'credit_card', 'paypal')),
    status BOOLEAN NOT NULL,
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- Bảng DriversRating: Lưu đánh giá của khách hàng cho tài xế
CREATE TABLE IF NOT EXISTS DriversRating (
    driver_id INT PRIMARY KEY,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    CONSTRAINT fk_driversrating_driver FOREIGN KEY (driver_id) REFERENCES Drivers(driver_id) ON DELETE CASCADE
);

-- Bảng RestaurantRating: Lưu đánh giá của khách hàng cho chi nhánh nhà hàng
CREATE TABLE IF NOT EXISTS RestaurantRating (
    restaurant_id INT PRIMARY KEY,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    CONSTRAINT fk_restaurantrating_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

-- STEP 3: ADD INDEXES FOR OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_restaurant_geom ON restaurants USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_driver_location ON drivers_location USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_menuitems_restaurant_id ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_payments_method ON payments(method);
CREATE INDEX IF NOT EXISTS idx_order_items_price ON order_items(price);