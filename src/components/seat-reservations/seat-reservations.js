import * as ko from 'knockout';

import '../client-allocator';
import clientService from '../../services/client-service/client-service';
import mealService from '../../services/meal-service/meal-service';
import passengerService from '../../services/passenger-service/passenger-service';
import seatService from '../../services/seat-service/seat-service';

const SeatReservations = () => {
    const meals = ko.observableArray();
    const clients = ko.observableArray();
    const seats = ko.observableArray();
    const passengers = ko.observableArray();
    const freeSeats = ko.computed(() =>
        seats().filter(
            (seat) =>
                !passengers().find((passenger) => passenger.idSeat === seat.id)
        )
    );

    const loadServerData = () => {
        const mealsData = mealService.getAllMeals();
        const clientsData = clientService.getAllClients();
        const seatsData = seatService.getAllSeats();
        const passengersData = passengerService.getAllPassengers();

        const updateViewModels = (resolvedPromises) => {
            meals(resolvedPromises[0]);
            clients(resolvedPromises[1]);
            seats(resolvedPromises[2]);
            passengers(resolvedPromises[3]);
        };

        Promise.all([mealsData, clientsData, seatsData, passengersData]).then(
            updateViewModels
        );
    };
    loadServerData();

    const formatPrice = (price) => () =>
        price ? `$${price.toFixed(2)}` : 'None';

    const updatePassengerSeat = (clientId, newSeatId) => {
        const modifiedPassengers = passengers().map((passenger) => {
            if (passenger.idClient === clientId) {
                return {
                    ...passenger,
                    idSeat: newSeatId,
                };
            }
            return passenger;
        });
        passengers(modifiedPassengers);
    };
    const updatePassengerMeal = (clientId, newMealId) => {
        const modifiedPassengers = passengers().map((passenger) => {
            if (passenger.idClient === clientId) {
                return {
                    ...passenger,
                    idMeal: newMealId,
                };
            }
            return passenger;
        });
        passengers(modifiedPassengers);
    };

    const createSeatReservation = (client, seat, meal) => {
        const seatObservable = ko.observable(seat);
        const updatePassengerSeatSubscribe = (newSeat) =>
            updatePassengerSeat(client.id, newSeat.id);
        seatObservable.subscribe(updatePassengerSeatSubscribe);

        const mealObservable = ko.observable(meal);
        const updatePassengerMealSubscribe = (newMeal) =>
            updatePassengerMeal(client.id, newMeal.id);
        mealObservable.subscribe(updatePassengerMealSubscribe);

        return {
            idClient: client.id,
            fullname: `${client.name} ${client.lastname}`,
            seat: seatObservable,
            isAtWindow: seat && seat.isAtWindow ? 'x' : '',
            meal: mealObservable,
            formattedPrice: ko.computed(formatPrice(meal.price)),
        };
    };
    const createSeatReservationFromPassenger = (passenger) => {
        const clientData = clients().find(
            (client) => client.id === passenger.idClient
        );
        const seatData = seats().find((seat) => seat.id === passenger.idSeat);
        const mealData = meals().find((meal) => meal.id === passenger.idMeal);

        return createSeatReservation(clientData, seatData, mealData);
    };

    const createSeatsReservations = () =>
        passengers().map((passenger) =>
            createSeatReservationFromPassenger(passenger)
        );
    const seatsReservations = ko.computed(createSeatsReservations);

    const addPassenger = (selectedClientId, seletedSeatId, selectedMealId) => {
        if (!selectedClientId) {
            return;
        }

        const passenger = {
            idClient: selectedClientId,
            idSeat: seletedSeatId,
            idMeal: selectedMealId,
        };
        passengers.push(passenger);
    };

    const removePassengerSeatReservation = (data) =>
        passengers.remove((passenger) => passenger.idClient === data.idClient);

    return {
        meals,
        clients,
        seats,
        freeSeats,
        passengers,
        seatsReservations,

        loadServerData,
        addPassenger,
        removePassengerSeatReservation,
    };
};

export default SeatReservations;
