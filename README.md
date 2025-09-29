This project is a dynamic landing page designed to showcase various aspects of a product or service, including sections like services, insights, testimonials, success stories, and a contact form to submit inquiries. The page is built with **Next.js**, making it scalable and SEO-friendly. It dynamically fetches and displays content from databases, providing a seamless user experience.
It uses **Next.js** for SSR, **Prisma** for database management, **Bootstrap** for styling, and **Cloudinary** for assets storage , and **React-Admin** for managing dynamic sections in the backend.

## **Features**

* **Dynamic Sections**:

  * **Services**: Display a list of product/services offered.
  * **Insights**: Showcase blog posts or industry insights.
  * **Testimonials**: Customer feedback for social proof.
  * **Success Stories**: Highlight client success stories and case studies.
  * **Contact Form**: A form to submit inquiries, which integrates with the backend.

* **Responsive Design**: Optimized for all devices using **Bootstrap**.

* **Prisma**: A modern ORM to manage the database (e.g., for storing services, testimonials, and success stories).

* **Cloudinary**: Store and serve images (e.g., for logos, service images, and success story visuals).

* **React-Admin**: Easily manage dynamic sections (like services, testimonials) from an admin panel.


## **Tech Stack**

* **Next.js**: A React framework for building server-rendered applications.
* **Prisma**: ORM for database management (e.g., PostgreSQL, MySQL).
* **Bootstrap**: A responsive CSS framework for front-end development.
* **Cloudinary**: Cloud-based service to manage and serve media (images, videos).
* **React-Admin**: An open-source framework for building admin panels to manage data.
* **Node.js**: JavaScript runtime for backend services.


## **Setup and Installation**

### 1. Clone the repository

```bash
git clone https://github.com/mfsi-garimas/landing-page.git
cd landing-page
```

### 2. Install dependencies

Make sure you have **Node.js** installed, then run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set up Prisma

Prisma is used for database management. To set up Prisma, you'll need to configure it to connect to your database.

#### Set up `.env` file

Create a `.env` file in the root directory of your project and add your database credentials:

```env
DATABASE_URL="mysql://Username:XXXXXX@localhost:3306/landingDB"
CLOUDINARY_CLOUD_NAME=XXXXXX
CLOUDINARY_API_KEY=XXXXXX
CLOUDINARY_API_SECRET=XXXXXX

#### Migrate the database

After configuring your database connection, run the Prisma migration to set up your tables.

```bash
npx prisma migrate dev
```

This will set up your database schema.

To Run Database seed

tsx prisma/seed.ts 

### 4. To Access Admin Panel
Url: http://localhost:XXXX/admin
Login Credentials:
Username: admin@admin.com
Password: admin123

### 5. Start the development server

Once everything is set up, run the following command to start the development server:

```bash
npm run dev