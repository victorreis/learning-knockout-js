import * as ko from 'knockout';

import viewModel from './client-allocator';
import template from './client-allocator.html';

ko.components.register('client-allocator', { template, viewModel });
