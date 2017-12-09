import { actionCreator } from './helpers';

export type IAddSwipePayload = {
    id: string;
    timestamp: Date;
    direction: string;
};

export const addSwipe = actionCreator('ADD_SWIPE');
