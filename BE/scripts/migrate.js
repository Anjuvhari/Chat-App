require('dotenv').config();
const mysql = require('mysql2/promise');

const migrate = async () => {
    try {
        // Create connection
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        // Create database
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.query(`USE ${process.env.DB_NAME}`);

        // Create Users Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create Activities Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS activities (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT,
                creator_id INT,
                location VARCHAR(255),
                date DATETIME,
                max_participants INT,
                FOREIGN KEY (creator_id) REFERENCES users(id)
            )
        `);

        // Create Activity Participants Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS activity_participants (
                activity_id INT,
                user_id INT,
                status ENUM('joined', 'pending', 'declined'),
                joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (activity_id, user_id),
                FOREIGN KEY (activity_id) REFERENCES activities(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Create Chat Messages Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                activity_id INT,
                message TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (activity_id) REFERENCES activities(id)
            )
        `);

        console.log('Database migration completed successfully');
        await connection.end();
    } catch (error) {
        console.error('Database migration failed:', error);
        process.exit(1);
    }
};

migrate();