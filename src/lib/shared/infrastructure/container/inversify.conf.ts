import { Container } from 'inversify';
import { CLIENT_SHARED_CONTAINER_TYPES } from './types';
import { HttpService } from '../services/HttpService';

const SharedContainer = new Container();

SharedContainer.bind(CLIENT_SHARED_CONTAINER_TYPES.HttpService).to(HttpService);

export { SharedContainer }; 