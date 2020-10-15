/**
 * Class representing a review
 */
class Review {
    /**
     * 
     * @param {string} author 
     * @param {image} author_profil_picture 
     * @param {number} stars 
     * @param {string} comment 
     * @param {string} place_id 
     * @param {string} relative_time_description 
     */
    constructor(author, author_profil_picture, stars, comment, place_id, relative_time_description) {
        this.author = author;
        this.author_profil_picture = author_profil_picture
        this.stars = stars;
        this.comment = comment;
        this.place_id = place_id;
        this.relative_time_description = relative_time_description;
    }
}