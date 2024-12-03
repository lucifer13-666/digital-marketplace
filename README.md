https://www.youtube.com/watch?v=yhYT0LO65vk

## Getting Started

1. Kinde: Authentication (Login,Logout,Register)

   - dashboard :
     - https://digitalmarketytb.kinde.com/admin
   - docs :
     - https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/
   - install :
     - npm i @kinde-oss/kinde-auth-nextjs
   - User SignUp Kinde -> stores user in kinde db

2. Khi dùng images nhớ khai báo trong next.config.mjs

## Package

1. Tiptap: thay đổi các thông tin text editor (thẻ h1,h2,code,Bold ...)

   - https://tiptap.dev/docs/editor/getting-started/install
   - npm install @tiptap/react @tiptap/pm @tiptap/starter-kit

2. Uploadthing :

   - https://uploadthing.com/dashboard/lucifer13-666-personal-team

3. Supabase : quản lý database

   - Lưu trữ data user khi signup qua Kinde
   - Dashboard :
     - https://supabase.com/dashboard/project/kunbidincjxvabmkdoer/settings/database
   - Setup :
     - https://supabase.com/partners/integrations/prisma
   - Prisma
     - npx prisma init
     - npx prisma db push
     - npx prisma studio

4. stripe : payment

   - https://dashboard.stripe.com/connect/set-up/profile
   - https://dashboard.stripe.com/test/payments
   - stripe CLI

     - download file window (stripe_1.22.0_windows_x86_64.zip) : https://github.com/stripe/stripe-cli/releases/tag/v1.22.0
     - lưu vào C:\stripe-cli
     - Edit the system environment variables -> Advanced : Environment Variables -> Tìm mục Path trong "System variables", sau đó chọn Edit. -> Nhấn New và nhập đường dẫn đến thư mục chứa stripe.exe (ví dụ: C:\stripe-cli).
     - Kiểm tra : stripe version
     - Login : stripe login

   - lấy code : STRIPE_CONNECT_WEBHOOK_SECRET
     - stripe listen --forward-to localhost:3000/api/stripe/connect --forward-connect-to localhost:3000/api/stripe/connect
   - lấy code : STRIPE_SECRET_WEBHOOK
     - stripe listen --forward-to http://localhost:3000/api/stripe

5. resend : gửi mail , React Email : tạo giao diện(template)

   - https://resend.com/home
   - https://react.email/docs/getting-started/automatic-setup

     - cd react-email-starter
     - npm install
     - npm run dev

   - thêm webhook vào stripe :
     - https://dashboard.stripe.com/test/webhooks/create?events=checkout.session.completed
