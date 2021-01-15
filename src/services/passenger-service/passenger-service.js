const passengersMock = [
    { idClient: 111, idSeat: 1, idMeal: 202 },
    { idClient: 222, idSeat: 2, idMeal: 101 },
    { idClient: 333, idSeat: 11, idMeal: 303 },
];

const getAllPassengers = () => Promise.resolve([...passengersMock]);

const passengerService = {
    getAllPassengers,
};

export default passengerService;
