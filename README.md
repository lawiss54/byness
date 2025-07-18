# Project Bynes - E-commerce Platform

This is a modern, full-featured e-commerce web application built with Next.js, React, and TypeScript. It serves as the online storefront for a fashion brand, providing a seamless shopping experience from product browsing to checkout.

## Key Features

*   **Modern Tech Stack:** Utilizes Next.js 15, React 19, and TypeScript for a high-performance, type-safe, and scalable application.
*   **Component-Based Architecture:** Organized into reusable components for easy maintenance and development.
*   **Comprehensive E-commerce Workflow:** Includes pages for browsing products, viewing product details, managing a shopping cart, and completing the checkout process.
*   **User Authentication:** Features for user registration and login.
*   **Admin Dashboard:** A dedicated section for administrators to manage the store.
*   **Responsive Design:** Styled with Tailwind CSS for a mobile-first, responsive user interface.
*   **Rich Animations:** Uses Framer Motion to create engaging and smooth user interactions.
*   **State Management:** Employs Zustand for efficient and predictable global state management, particularly for the shopping cart.
*   **Form Handling:** Uses React Hook Form and Zod for robust and schema-validated forms.

## Getting Started

### Prerequisites

*   Node.js (v20 or later)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd project-bynes
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server with Turbopack for high-performance development:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js `src` directory structure:

```
/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── app/             # Next.js App Router: pages and layouts
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── auth/        # Authentication pages (login, signup)
│   │   ├── boutique/    # Main shop/product listing page
│   │   ├── checkout/    # Checkout process pages
│   │   ├── panier/      # Shopping cart page
│   │   └── produit/     # Dynamic product details pages
│   ├── components/      # Reusable React components
│   │   ├── Boutique/    # Components for the main shop page
│   │   ├── cart/        # Shopping cart components
│   │   ├── Checkout/    # Checkout-related components
│   │   ├── Dashboard/   # Admin dashboard components
│   │   ├── Home/        # Components for the homepage
│   │   ├── Layout/      # Global layout components (Header, Footer)
│   │   ├── Produit/     # Components for the product details page
│   │   └── ui/          # Generic UI components (Button, Input, etc.)
│   ├── lib/             # Utility functions and libraries
│   └── pages/           # Next.js pages directory (for API routes or older pages structure)
├── next.config.ts       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Styling

The project utilizes a sophisticated styling system built on top of Tailwind CSS, with a custom theme and a rich set of design tokens. This ensures a consistent and visually appealing user interface throughout the application.

### Key Styling Features

*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Custom Theme:** The `tailwind.config.js` file defines a custom theme with a specific color palette, fonts, and other design tokens.
    *   **Color Palette:** A carefully selected color scheme including `brand.darkGreen`, `brand.camel`, `brand.sage`, `brand.ivory`, and `brand.greenBlack`.
    *   **Typography:** The primary font is "Playfair Display" (serif) for headings and prominent text, and "Open Sans" (sans-serif) for body text.
*   **HeroUI:** The project incorporates `@heroui/theme`, suggesting the use of a pre-built component library or design system.
*   **Animations:** `tailwindcss-animate` and `@designbycode/tailwindcss-text-shadow` are used to add animations and text effects.
*   **Dark Mode:** The application is configured for dark mode support.

## Application Pages

The application is structured using the Next.js App Router, with a clear separation of pages based on their functionality.

*   **/ (Home):** The main landing page of the application.
*   **/admin:** The main entry point for the admin dashboard.
*   **/admin/Dashboard:** The main dashboard page for administrators.
*   **/auth/connexion:** The login page for users.
*   **/auth/inscription:** The registration page for new users.
*   **/boutique:** The main shop page where users can browse and filter products.
*   **/checkout:** The checkout page for completing purchases.
*   **/panier:** The shopping cart page where users can view and manage their selected items.
*   **/produit/[slug]:** A dynamic page that displays the details of a specific product.

## Core Technologies

*   **Framework:** [Next.js](https://nextjs.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **HTTP Client:** [Axios](https://axios-http.com/)

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Creates a production-ready build.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the codebase for errors and style issues.

This documentation provides a high-level overview of the project. For more detailed information on specific components or functionalities, please refer to the source code and inline comments.
#   b y n e s s  
 