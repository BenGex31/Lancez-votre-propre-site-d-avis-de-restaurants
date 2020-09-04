class Restaurant {
   
}

const restaurants = [
    {
       id:1,
       restaurantName:"Bronco",
       address:"39 Rue des Petites Écuries, 75010 Paris",
       lat:48.8737815,
       long:2.3501649,
       ratings:[
          {
            stars:4,
            comment:"Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
          },
          {
            stars:5,
            comment:"Tout simplement mon restaurant préféré !"
          }
       ]
    },
    {
       id:2, 
       restaurantName:"Babalou",
       address:"4 Rue Lamarck, 75018 Paris",
       lat:48.8865035,
       long:2.3442197,
       ratings:[
          {
            stars:5,
            comment:"Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
          },
          {
            stars:3,
            comment:"J'ai trouvé ça correct, sans plus"
          }
       ]
    },
    {
        id:3,
        restaurantName:"Gabriel",
        address:"42 Avenue Gabriel, 75008 Paris",
        lat:48.8697092,
        long:2.313439,
        ratings:[
           {
            stars:5,
            comment:"le Gabriel restera mon souvenir gastronomique le plus mémorable"
           },
           {
            stars:5,
            comment:"Une excellente adresse que je recommande absolument."
           }
        ]
    },
    {
        id:4,
        restaurantName:"Ciel-de-Paris",
        address:"Tour Maine Montparnasse, 56ème, Avenue du Maine, 75015 Paris",
        lat:48.8430359,
        long:2.3205622,
        ratings:[
           {
            stars:5,
            comment:"Un très bel accueil, une ambiance chaleureuse. Les serveurs étaient au petit soin avec nous."
           },
           {
            stars:1,
            comment:"Grosse déception. Le serveur et le service désastreux."
           }
        ]
    },
    {
        id:5,
        restaurantName:"Epicure",
        address:"112 Rue du Faubourg Saint-Honoré, 75008 Paris",
        lat:48.8717179,
        long:2.3148011,
        ratings:[
           {
            stars:4,
            comment:"Service impeccable et pas froid comme peuvent l’être de nombreux restaurants étoilés."
           },
           {
            stars:3,
            comment:"Un peu déçu pour cet étoilé."
           }
        ]
    },
    {
        id:6,
        restaurantName:"Boutary",
        address:"25 Rue Mazarine, 75006 Paris",
        lat:48.8548953,
        long:2.3380191,
        ratings:[
           {
            stars:5,
            comment:"Merci pour cette expérience culinaire mémorable et pour le professionnalisme de l'ensemble du personnel. Chef très talentueux !"
           },
           {
            stars:5,
            comment:"Un grand moment !! Raffinement du service mais pas guindé, raffinement des goûts, un cadre moderne et sobre."
           }
        ]
    }
]

console.log(restaurants);