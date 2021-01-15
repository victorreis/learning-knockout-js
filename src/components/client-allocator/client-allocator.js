import * as ko from 'knockout';

const ClientAllocator = ({
    meals,
    clients,
    seats,
    freeSeats,
    passengers,
    addPassenger,
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
        addPassenger: () =>
            addPassenger(
                selectedClient().id,
                seletedSeat().id,
                selectedMeal().id
            ),
    };
};

export default ClientAllocator;
