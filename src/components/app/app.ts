import * as ko from 'knockout';
import { Observable } from 'knockout';
import '../seat-reservations';

interface AppParams {
    message: string;
}

export default class App {
    message?: Observable<string>;

    constructor({ message }: AppParams) {
        this.message = ko.observable(message);
    }

    dispose() {}
}
