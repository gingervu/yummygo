// // import React from 'react'
// // import './ExploreMenu.css'
// // import { menu_list } from '../../assets/assets'

// // const ExploreMenu = ({category, setCategory}) => {
// //   return (
// //     <div className='explore-menu' id='explore-menu'>
// //       {/* <h1>Khám phá thực đơn hấp dẫn</h1>
// //       <p className='explore-menu-text'>Thoả sức chọn các món ăn bạn muốn</p> */}
// //       <div className='explore-menu-list'>
// //         {menu_list.map((item,index)=>{
// //             return (
// //                 <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
// //                     <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
// //                     <p>{item.menu_name}</p>
// //                 </div>
// //             )
// //         }       
// //     )
// //         }</div>    
// //     </div>
// //   )
// // }

// // export default ExploreMenu
// import React, { useEffect, useState } from 'react';
// import './ExploreMenu.css';
// import axiosInstance from '../../services/axiosConfig';
// import { CategoryEnum } from '../../../../../fix-backend/models/schemas/';

// const ExploreMenu = ({ category, setCategory }) => {
//   const [categories, setCategories] = useState([]); // Lưu danh sách category
//   const token = localStorage.getItem('access_token'); // Lấy token từ localStorage
//   // Gọi API để lấy danh sách category
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get('/customers/filter', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           },
//           params: { category: CategoryEnum.trang_mieng }, // Sử dụng CategoryEnum.trang_mieng
//           withCredentials: true
//         });
//         setCategories(response.data); // Cập nhật state với dữ liệu trả về
//       } catch (error) {
//         console.error('Lỗi khi lấy danh sách category:', error);
//       }
//     };
  
//     fetchCategories();
//   }, []);
//   return (
//     <div className="explore-menu" id="explore-menu">
//       <div className="explore-menu-list">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => setCategory((prev) => (prev === item ? 'All' : item))}
//             className="explore-menu-list-item"
//           >
//             <img
//               className={category === item ? 'active' : ''}
//               src={item.menu_image || 'default-image-url.png'} // Nếu không có ảnh, sử dụng ảnh mặc định
//               alt={item.menu_name}
//             />
//             <p>{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ExploreMenu;

import React, { useEffect, useState } from 'react';
import './ExploreMenu.css';
import axiosInstance from '../../services/axiosConfig';

const ExploreMenu = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]); // Lưu danh sách category
  const token = localStorage.getItem('access_token'); // Lấy token từ localStorage

  // Gọi API để lấy danh sách category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/customers/filter', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { category: 'trang_mieng' }, // Use a string instead of CategoryEnum
          withCredentials: true
        });
        setCategories(response.data); // Cập nhật state với dữ liệu trả về
      } catch (error) {
        console.error('Lỗi khi lấy danh sách category:', error);
      }
    };

    fetchCategories();
  }, [token]);

  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-list">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? 'active' : ''}
              src={item.menu_image || 'default-image-url.png'} // Use default image if no menu_image is available
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p> {/* Make sure to access the correct property */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
