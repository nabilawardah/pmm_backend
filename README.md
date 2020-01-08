<p align="center">
  <a href="https://herlambang.design">
    <img src="https://res.cloudinary.com/vasilenka/image/upload/v1577427376/covers/pmm.png" width="100%">
  </a>
</p>

# Getting Started

This project built using Laravel Framework (PHP). To run it on your local development, follow these instructions:

1. **Clone this repo to your computer**

   ```
   git clone https://github.com/vasilenka/pmm.git
   ```

2. **Create a `.env` file at the root directory**

   You can use `.env.example` file as an example. Just copy the whole file.

3. **Run the initial setup**

   ```
   // 1. Install all dependencies
   composer install
   npm install

   // 2. Generate App Key
   php artisan key:generate
   ```

4. **Config Laravel Mix**

   **Using Laravel Valet**

   Adjust the proxy on browsersync to your own valet TLD.

   **Not with Laravel Valet (Common Setup)**

   Adjust the proxy into `http://localhost:3000`

   > Check `webpack.mix.js` on the root directory for detailed instructions

5. **Run the app**

   **Using Laravel Valet**

   If you're using laravel valet, you just need to run single command `npm run hot` on your terminal. This command will generate all the assets (images, js, css) whenever there're changes on your files.

   **Not with Laravel Valet (Common Setup)**

   If you're not using laravel valet, you need to run `php artisan serve` on your terminal, and then also run `npm run hot` in another tab of your terminal.

If all done correctly, your browser will open and run the PMM website automatically.

# API Endpoints, Requests, and Responses

## Authentication

1. Sign in
2. Sign out

## Users

1. Get all users
2. Get one user
3. Update user info
4. Update user photo
5. Update user role
6. Update user points

## Articles

1. Get all articles
2. Get one article
3. Create article
4. Update an article
5. Submit article
6. Approve/Publish article
7. Delete article
8. Decline article (?)

## Events

1. Get all events
2. Get one article
3. Create an event
4. Update an event
5. Register to event
6. Remove event
7. Cancel participation (?)

## Gallery

1. Get all gallery items
2. Get one gallery item
3. Add new gallery item
4. Remove gallery item
