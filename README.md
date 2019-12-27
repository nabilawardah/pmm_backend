<p align="center">
  <a href="https://herlambang.design">
    <img src="https://res.cloudinary.com/vasilenka/image/upload/v1577417254/covers/pmm.png" width="100%">
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
