CREATE DATABASE IF NOT EXISTS little_shop_of_horticulture;

USE little_shop_of_horticulture;

CREATE TABLE IF NOT EXISTS plants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    difficulty_level ENUM('easy', 'medium', 'haard') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plant_care_tips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plant_id INT NOT NULL,
    tip_description TEXT NOT NULL,
    climate_recommendation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (plant_id) REFERENCES plants(id)
);
