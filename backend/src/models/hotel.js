const pool = require('../../index');
const bcrypt = require('bcryptjs');

// Function to create a new hotel
async function createHotel(hotelData) {
    const {
        userId,
        name,
        city,
        country,
        description,
        type,
        adultCount,
        childCount,
        facilities,
        pricePerNight,
        starRating,
        imageUrls,
        lastUpdated
    } = hotelData;

    const query = {
        text: `
            INSERT INTO hotels (user_id, name, city, country, description, type, adult_count, child_count, facilities, price_per_night, star_rating, image_urls, last_updated)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *
        `,
        values: [
            userId,
            name,
            city,
            country,
            description,
            type,
            adultCount,
            childCount,
            facilities,
            pricePerNight,
            starRating,
            imageUrls,
            lastUpdated
        ]
    };

    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating hotel:', error);
        throw error;
    }
}

// Export the createHotel function
module.exports = { createHotel };
