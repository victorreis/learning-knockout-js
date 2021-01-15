import * as ko from 'knockout';

const ClientAllocator = ({
    meals,
    clients,
    seats,
    freeSeats,
    passengers,
    onAddPassenger,
}) => {
    const selectedClient = ko.observable(0);
    const seletedSeat = ko.observable(0);
    const selectedMeal = ko.observable(0);

    const clientsNotAllocated = ko.computed(() =>
        clients().filter(
            (client) =>
                !passengers().find(
                    (passenger) => passenger.idClient === client.id
                )
        )
    );

    const addPassenger = () =>
        onAddPassenger(
            selectedClient().id,
            seletedSeat().id,
            selectedMeal().id
        );

    return {
        meals,
        clients,
        seats,
        passengers,
        clientsNotAllocated,
        selectedClient,
        freeSeats,
        seletedSeat,
        selectedMeal,

        addPassenger,
    };
};

export default ClientAllocator;
