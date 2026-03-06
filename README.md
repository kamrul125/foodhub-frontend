FoodHub - Frontend :
FoodHub একটি মডার্ন ফুড ডেলিভারি প্ল্যাটফর্ম যেখানে ইউজাররা খাবার অর্ডার করতে পারেন, সেলাররা খাবার যোগ করতে পারেন এবং অ্যাডমিন সব অর্ডার ম্যানেজ করতে পারেন।

প্রজেক্টের বৈশিষ্ট্য (Features):

Role-Based Access: ইউজার, সেলার এবং অ্যাডমিনের জন্য আলাদা আলাদা ড্যাশবোর্ড এবং এক্সেস কন্ট্রোল।
Authentication: নিরাপদ লগইন এবং রেজিস্ট্রেশন সিস্টেম।
Product Management: সেলাররা নতুন ফুড আইটেম যোগ করতে পারেন।
Order Tracking: ইউজাররা তাদের অর্ডারের লিস্ট দেখতে পারেন।
Responsive UI: Tailwind CSS ব্যবহার করে মোবাইল এবং ডেস্কটপ ফ্রেন্ডলি ডিজাইন।

টেকনোলজি স্ট্যাক (Tech Stack)

Framework: React.js (Vite)
Styling: Tailwind CSS, PostCSS
Routing: React Router DOM
State Management: LocalStorage & React Hooks
Icons: Lucide React 

লোকাল মেশিনে রান করার নিয়ম (Installation)

প্রজেক্টটি ক্লোন :
git clone

প্রজেক্ট ফোল্ডার :
cd foodhub-frontend

ডিপেন্ডেন্সিগুলো ইনস্টল :
npm install

প্রজেক্টটি রান :
npm run dev

ফোল্ডার স্ট্রাকচার (Folder Structure)

src/
  ├── auth/          # Login & Register components
  ├── components/    # Reusable components (Navbar, Footer)
  ├── food/          # Food listing & creation
  ├── order/         # Order related components
  ├── routes/        # Protected routes logic
  └── App.jsx        # Main application component

  ### 🔑 Test Credentials (MANDATORY)
| Role     | Email               | Password  |
| :------- | :------------------ | :-------- |
| Admin    | admin2@foodhub.com   | admin123  |
| Seller   | seller1@foodhub.com  | 123456    |
| Customer | user1@foodhub.com    | 123456    |

  Github link: https://github.com/kamrul125/foodhub-frontend

  লেখক (Author)
  Md Kamruzzaman


  গিট কমিট আইডিয়া (Commit #15 +):