class Rating {
    constructor(stars, comment, author, idRestaurant) {
        this.stars = stars;
        this.comment = comment;
        this.author = author;
        this.idRestaurant = idRestaurant;
    }
}

const ratings = [
    new Rating(4, "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande.", "P BERNARD", 1),
    new Rating(5, "Tout simplement mon restaurant préféré !", "F OCANA", 1),
    new Rating(4, "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !", "R MATTHIEU", 2),
    new Rating(2, "J'ai trouvé ça correct, sans plus", "D CROCHET", 2),
    new Rating(5, "le Gabriel restera mon souvenir gastronomique le plus mémorable.", "M COHEN", 3),
    new Rating(5, "Une excellente adresse que je recommande absolument.", "D MICHEL", 3),
    new Rating(5, "Un très bel accueil, une ambiance chaleureuse. Les serveurs étaient au petit soin avec nous.", "L.K DARLY", 4),
    new Rating(1, "Grosse déception. Le serveur et le service désastreux.", "M DIAMOND", 4),
    new Rating(4, "Service impeccable et pas froid comme peuvent l’être de nombreux restaurants étoilés.", "D LAURY", 5),
    new Rating(3, "Un peu déçu pour cet étoilé.", "A BRUN", 5),
    new Rating(5, "Merci pour cette expérience culinaire mémorable et pour le professionnalisme de l'ensemble du personnel. Chef très talentueux !", "Nathalie", 6),
    new Rating(5, "Un grand moment !! Raffinement du service mais pas guindé, raffinement des goûts, un cadre moderne et sobre.", "B ELISE", 6)
];

console.log(ratings);