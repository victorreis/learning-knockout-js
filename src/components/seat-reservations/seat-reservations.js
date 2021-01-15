import * as ko from 'knockout';
import '../client-allocator';

// Non-editable catalog data - would come from the server
const mealsMock = [
    { id: 101, name: 'Standard (sandwich)', price: 0 },
    { id: 202, name: 'Premium (lobster)', price: 34.95 },
    { id: 303, name: 'Ultimate (whole zebra)', price: 290 },
];
const clientsMock = [
    { id: 111, name: 'Lucas', lastname: 'Films' },
    { id: 222, name: 'Steve', lastname: 'Jobs' },
    { id: 333, name: 'Downey', lastname: 'Jr.' },
    { id: 444, name: 'Robert', lastname: 'De Niro' },
    { id: 555, name: 'John', lastname: 'Dee' },
    { id: 666, name: 'Al', lastname: 'Pacino' },
];
const seatsMock = [
    { id: 1, name: 'A1', isAtWindow: true },
    { id: 2, name: 'A2', isAtWindow: false },
    { id: 3, name: 'A3', isAtWindow: false },
    { id: 4, name: 'A4', isAtWindow: true },
    { id: 5, name: 'B1', isAtWindow: true },
    { id: 6, name: 'B2', isAtWindow: false },
    { id: 7, name: 'B3', isAtWindow: false },
    { id: 8, name: 'B4', isAtWindow: true },
    { id: 9, name: 'C1', isAtWindow: true },
    { id: 10, name: 'C2', isAtWindow: false },
    { id: 11, name: 'C3', isAtWindow: false },
    { id: 12, name: 'C4', isAtWindow: true },
];
const passengersMock = [
    { idClient: 111, idSeat: 1, idMeal: 202 },
    { idClient: 222, idSeat: 2, idMeal: 101 },
    { idClient: 333, idSeat: 11, idMeal: 303 },
];

const SeatReservations = () => {
    const meals = ko.observableArray(mealsMock);
    const clients = ko.observableArray(clientsMock);
    const seats = ko.observableArray(seatsMock);
    const passengers = ko.observableArray(passengersMock);
    const freeSeats = ko.computed(() =>
        seats().filter(
            (seat) =>
                !passengers().find((passenger) => passenger.idSeat === seat.id)
        )
    );

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

        addPassenger,
        removePassengerSeatReservation,
    };
};

export default SeatReservations;
