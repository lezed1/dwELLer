import { actionCreator } from './helpers';

export type IAddIDPayload = { id: string };

export const addID = actionCreator('ADD_ID');
