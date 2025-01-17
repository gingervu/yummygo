// // đúng

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../services/axiosConfig";

// const FoodDisplay = () => {
//     const [restaurants, setRestaurants] = useState([]); // Danh sách nhà hàng
//     const navigate = useNavigate();
//     const token = localStorage.getItem("access_token");
//     // Lấy danh sách nhà hàng đang hoạt động
//     useEffect(() => {
//         const fetchActiveRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get("/restaurants/active", {
//                     headers: { Authorization: `Bearer ${token}` },
//                     withCredentials: true,
//                   }
//                 );
//                 setRestaurants(response.data);
//             } catch (error) {
//                 console.error("Error fetching active restaurants:", error);
//             }
//         };
//         fetchActiveRestaurants();
//     }, []);

//     // Xử lý khi chọn nhà hàng và chuyển đến trang thực đơn
//     const handleRestaurantSelect = (restaurant_id) => {
//         navigate(`/menu/${restaurant_id}`); // Chuyển hướng đến MenuRestaurant với restaurant_id
//     };

//     return (
//         <div>
//             <h1>Danh sách Nhà Hàng</h1>
//             <div>
//                 {restaurants.length > 0 ? (
//                     <ul>
//                         {restaurants.map((restaurant) => (
//                             <li
//                                 key={restaurant.restaurant_id}
//                                 onClick={() => handleRestaurantSelect(restaurant.restaurant_id)}
//                                 style={{ cursor: "pointer", marginBottom: "10px" }}
//                             >
//                                 {restaurant.name}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Không có nhà hàng nào đang hoạt động.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FoodDisplay;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../services/axiosConfig';
// import './FoodDisplay.css';

// const FoodDisplay = ({ category }) => {
//   const [restaurants, setRestaurants] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axiosInstance.get('/customers/filter', {
//           params: { category },
//           headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//         });
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error('Lỗi khi tải danh sách nhà hàng:', error);
//       }
//     };

//     if (category && category !== 'All') {
//       fetchRestaurants();
//     } else {
//       setRestaurants([]); // Nếu không chọn danh mục, reset danh sách nhà hàng
//     }
//   }, [category]);

//   const handleRestaurantClick = (restaurantId) => {
//     navigate(`/menu/${restaurantId}`); // Chuyển hướng đến MenuRestaurant với restaurant_id
//   };

//   if (!category || category === 'All') {
//     return <p className="no-category">Vui lòng chọn một danh mục để xem nhà hàng!</p>;
//   }

//   return (
//     <div className="food-display">
//       {restaurants.length === 0 ? (
//         <p className="loading">Không tìm thấy nhà hàng nào cho danh mục "{category}"</p>
//       ) : (
//         <div className="restaurant-list">
//           {restaurants.map((restaurant) => (
//             <div
//               key={restaurant.restaurant_id}
//               className="restaurant-card"
//               onClick={() => handleRestaurantClick(restaurant.restaurant_id)}
//             >
//               <h3>{restaurant.name}</h3>
//               <p>Địa chỉ: {restaurant.address}</p>
//               <p>Trạng thái: {restaurant.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodDisplay;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../services/axiosConfig';
// import './FoodDisplay.css';

// const FoodDisplay = ({ category }) => {
//   const [restaurants, setRestaurants] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         let response;

//         // Nếu category không được chọn hoặc chọn "All", gọi API /restaurants/active
//         if (!category || category === 'All') {
//           response = await axiosInstance.get('/restaurants/active', {
//             headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//             withCredentials: true
//           });
//         } else {
//           // Nếu có category được chọn, gọi API với category đó
//           response = await axiosInstance.get('/customers/filter', {
//             params: { category },
//             headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//             withCredentials: true
//           });
//         }

//         setRestaurants(response.data);
//       } catch (error) {
//         console.error('Lỗi khi tải danh sách nhà hàng:', error);
//       }
//     };

//     fetchRestaurants();
//   }, [category]);

//   const handleRestaurantClick = (restaurantId) => {
//     navigate(`/menu/${restaurantId}`);
//   };

//   return (
//     <div className="food-display">
//       {restaurants.length === 0 ? (
//         <p className="loading">Không tìm thấy nhà hàng nào!</p>
//       ) : (
//         <div className="restaurant-list">
//           {restaurants.map((restaurant) => (
//             <div
//               key={restaurant.restaurant_id}
//               className="restaurant-card"
//               onClick={() => handleRestaurantClick(restaurant.restaurant_id)}
//             >
//               <h3>{restaurant.name}</h3>
//               <p>Địa chỉ: {restaurant.address}</p>
//               <p>Trạng thái: {restaurant.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodDisplay;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosConfig';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                let response;

                // Nếu category không được chọn hoặc chọn "All", gọi API /restaurants/active
                if (!category || category === 'All') {
                    response = await axiosInstance.get('/restaurants/active', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                        withCredentials: true
                    });
                } else {
                    // Nếu có category được chọn, gọi API với category đó
                    response = await axiosInstance.get('/customers/filter', {
                        params: { category },
                        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                        withCredentials: true
                    });
                }

                setRestaurants(response.data);
            } catch (error) {
                console.error('Lỗi khi tải danh sách nhà hàng:', error);
            }
        };

        fetchRestaurants();
    }, [category]);

    const getImageForCategory = (category) => {
        const basePath = '/images';
        switch (category) {
            case 'Gà rán - Burger':
                return `${basePath}/Gà rán - Burger.jpg`;
            case 'Bún - Phở - Cháo':
                return `${basePath}/Bún - Phở - Cháo.jpg`;
            case 'Cà phê':
                return `${basePath}/Cà phê.jpg`;
            case 'Pizza - Mì Ý':
                return `${basePath}/Pizza - Mì Ý.jpg`;
            case 'Ăn vặt':
                return `${basePath}/Ăn vặt.jpg`;
            case 'Bánh Mì - Xôi':
                return `${basePath}/Bánh Mì - Xôi.jpg`;
            case 'Trà sữa':
                return `${basePath}/Trà sữa.jpg`;
            case 'Bánh Việt Nam':
                return `${basePath}/Bánh Việt Nam.jpg`;
            case 'Cơm':
                return `${basePath}/Cơm.jpeg`;
            case 'Đồ chay':
                return `${basePath}/Đồ chay.jpg`;
            case 'Hải sản':
                return `${basePath}/Hải sản.jpg`;
            case 'Lẩu - Nướng':
                return `${basePath}/Lẩu - Nướng.jpg`;
            case 'Tráng miệng':
                return `${basePath}/Tráng miệng.jpg`;

            case 'default':
                return `${basePath}/default.jpg`;
            default:
                return `${basePath}/default.jpg`;
        }
    };

    const handleRestaurantClick = (restaurantId) => {
        navigate(`/menu/${restaurantId}`);
    };

    return (
        <div className="food-display">
            {restaurants.length === 0 ? (
                <p className="loading">Không tìm thấy nhà hàng nào!</p>
            ) : (
                <div className="restaurant-list">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.restaurant_id}
                            className="restaurant-card"
                            onClick={() => handleRestaurantClick(restaurant.restaurant_id)}
                        >
                            <img
                                src={getImageForCategory(restaurant.category || 'default')}
                                alt={restaurant.category}
                                className="restaurant-image"
                            />
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.address}</p>
                            {/* <p>Trạng thái: {restaurant.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}</p> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodDisplay;
