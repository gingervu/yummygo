-- 1. Tạo dữ liệu trong bảng `users`
INSERT INTO users (user_name, phone, email, password)
SELECT
    'User_' || i, -- Tên người dùng
    '09' || lpad(floor(random() * 100000000)::TEXT, 8, '0'), -- Số điện thoại
    'user_' || i || '@example.com', -- Email
    md5(random()::TEXT) -- Mật khẩu hash
FROM generate_series(1, 100) AS i
ON CONFLICT (email) DO NOTHING; -- Bỏ qua email trùng lặp

-- 2. Gán quyền cho `admin`
INSERT INTO admin (user_id, role)
SELECT
    user_id,
    CASE WHEN random() < 0.5 THEN 'admin' ELSE 'super_admin' END
FROM users
WHERE user_id <= 10; -- Chỉ 10 người đầu tiên làm admin

-- 3. Thêm khách hàng vào bảng `customers`
INSERT INTO customers (user_id, customer_level)
SELECT
    user_id,
    floor(random() * 11)::SMALLINT -- Level từ 0 đến 10
FROM users
WHERE user_id > 10 AND user_id <= 60; -- 50 người tiếp theo là khách hàng

-- 4. Thêm tài xế vào bảng `drivers`
INSERT INTO drivers (user_id, driver_status)
SELECT
    user_id,
    CASE 
        WHEN random() < 0.33 THEN 'available'
        WHEN random() < 0.66 THEN 'busy'
        ELSE 'inactive'
    END
FROM users
WHERE user_id > 60 AND user_id <= 80; -- 20 người tiếp theo là tài xế

-- 5. Thêm vị trí của tài xế vào bảng `drivers_location`
INSERT INTO drivers_location (driver_id, location, last_updated)
SELECT
    driver_id,
    ST_SetSRID(ST_MakePoint(-122.4 + random() * 0.1, 37.7 + random() * 0.1), 4326), -- Tọa độ ngẫu nhiên quanh San Francisco
    CURRENT_TIMESTAMP - (random() * interval '1 day') -- Thời gian cập nhật trong 1 ngày qua
FROM drivers
WHERE driver_status != 'inactive'; -- Chỉ thêm tài xế "available" hoặc "busy"

-- 6. Thêm nhà cung cấp vào bảng `merchants`
INSERT INTO merchants (user_id, name, category, num_of_branches)
SELECT
    user_id,
    'Merchant_' || user_id,
    CASE floor(random() * 5 + 1)::INT
        WHEN 1 THEN 'noodles_pho'
        WHEN 2 THEN 'bread_sticky_rice'
        WHEN 3 THEN 'fried_chicken_burger'
        WHEN 4 THEN 'vegetarian_food'
        ELSE 'seafood'
    END,
    floor(random() * 5 + 1)::INT -- Số chi nhánh từ 1 đến 5
FROM users
WHERE user_id > 80 AND user_id <= 100; -- 20 người cuối là nhà cung cấp

-- 7. Thêm nhà hàng vào bảng `restaurants`
INSERT INTO restaurants (merchant_id, name, address, geom, status)
SELECT
    merchant_id,
    'Restaurant_' || merchant_id,
    'Address_' || merchant_id,
    ST_SetSRID(ST_MakePoint(-122.4 + random() * 0.1, 37.7 + random() * 0.1), 4326), -- Tọa độ ngẫu nhiên quanh San Francisco
    CASE WHEN random() < 0.8 THEN 'open' ELSE 'closed' END
FROM merchants;

-- 8. Thêm món ăn vào bảng `menu_items`
INSERT INTO menu_items (restaurant_id, name, price, status)
SELECT
    restaurant_id,
    'MenuItem_' || gs.i, -- 5 món ăn mỗi nhà hàng
    round(random() * 50 + 10)::NUMERIC, -- Giá từ 10 đến 60
    CASE WHEN random() < 0.9 THEN 'available' ELSE 'unavailable' END
FROM restaurants, generate_series(1, 5) AS gs(i);

-- 9. Thêm đơn hàng vào bảng `orders`
INSERT INTO orders (customer_id, restaurant_id, address, geom, delivery_fee, food_fee, order_status)
SELECT
    customer_id,
    restaurant_id,
    'OrderAddress_' || customer_id,
    ST_SetSRID(ST_MakePoint(-122.4 + random() * 0.1, 37.7 + random() * 0.1), 4326), -- Tọa độ ngẫu nhiên
    round((random() * 10 + 5) * 100)::NUMERIC / 100, -- Phí giao hàng từ 5 đến 15
    round((random() * 100 + 20) * 100)::NUMERIC / 100, -- Giá trị đồ ăn từ 20 đến 120
    CASE floor(random() * 5 + 1)::INT
        WHEN 1 THEN 'pending'
        WHEN 2 THEN 'awaiting_payment'
        WHEN 3 THEN 'accepted'
        WHEN 4 THEN 'on_the_way'
        ELSE 'delivered'
    END
FROM customers, restaurants
LIMIT 50; -- Tạo 50 đơn hàng

-- 10. Thêm chi tiết đơn hàng vào bảng `order_items`
INSERT INTO order_items (order_id, price, quantity)
SELECT
    order_id,
    round((random() * 50 + 10) * 100)::NUMERIC / 100, -- Giá từ 10 đến 60
    floor(random() * 5 + 1)::INT -- Số lượng từ 1 đến 5
FROM orders, generate_series(1, 3); -- 3 món mỗi đơn hàng

-- 11. Thêm thanh toán vào bảng `payments`
INSERT INTO payments (order_id, delivery_fee, food_fee, method, status)
SELECT
    order_id,
    delivery_fee,
    food_fee,
    CASE floor(random() * 3 + 1)::INT
        WHEN 1 THEN 'cash'
        WHEN 2 THEN 'credit_card'
        ELSE 'paypal'
    END,
    random() < 0.95 -- 95% giao dịch thành công
FROM orders;

-- 12. Thêm đánh giá tài xế vào bảng `DriversRating`
INSERT INTO DriversRating (driver_id, rating)
SELECT
    driver_id,
    round((random() * 5) * 10)::NUMERIC / 10 -- Điểm đánh giá từ 0.0 đến 5.0
FROM drivers;

-- 13. Thêm đánh giá nhà hàng vào bảng `RestaurantRating`
INSERT INTO RestaurantRating (restaurant_id, rating)
SELECT
    restaurant_id,
    round((random() * 5) * 10)::NUMERIC / 10 -- Điểm đánh giá từ 0.0 đến 5.0
FROM restaurants;
