import React, {useState, useEffect} from 'react';

function Counter() {
    // L'état initial est "100" car nous n'avons pas encore les données de l'API
    const [seats, setSeats] = useState(206); // Remplacez 100 par null pour mettre en place le décompte

    useEffect(() => {
        // On définit une fonction asynchrone pour récupérer les données de l'API
        const fetchData = async () => {
            try {
                // On utilise la fonction "fetch" pour envoyer une requête GET à l'API.
                // La réponse est stockée dans la variable "response"
                const response = await fetch('https://mon-api.com/places'); // Remplacez l'URL de l'API
                // On convertit la réponse de l'API en JSON
                // La réponse est stockée dans la variable "data"
                const data = await response.json();
                // On utilise la fonction "setSeats" pour mettre à jour la variable d'état "seats" avec les données récupérées de l'API
                setSeats(data.places);
            } catch (error) {
                // Si une erreur se produit lors de la récupération des données, on affiche un message d'erreur dans la console
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        // On appelle la fonction "fetchData" pour récupérer les données de l'API
        fetchData();
    }, []);

    // Si les données de l'API ne sont pas encore disponibles, on affiche un message de chargement
    if (seats === null) {
        return <div>Chargement des informations...</div>;
    }

    // Si les données de l'API sont disponibles, on affiche les informations
    return (
        <span>
            {seats}
        </span>
    );
}

export default Counter;
