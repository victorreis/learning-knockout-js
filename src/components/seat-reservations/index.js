import * as ko from 'knockout';

import viewModel from './seat-reservations';
import template from './seat-reservations.html';

ko.components.register('seat-reservations', { template, viewModel });
