FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    && docker-php-ext-install zip pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel project files
COPY . .

# Set ownership
RUN chown -R www-data:www-data /var/www

# Install PHP dependencies
RUN composer install

# Serve the Laravel application on port 8001
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8001"]

# Expose port 8001 to the outside world
EXPOSE 8001
