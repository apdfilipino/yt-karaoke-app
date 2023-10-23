import { Action } from '@ngrx/store';
import { Video } from '../model/video';
import { SearchActionTypes, SearchActionWithProps } from './search.actions';

export interface SearchListState {
    videos: Video[];
}

type SearchPropsAction = Action & SearchActionWithProps;

export const searchListInitialState: SearchListState = {
    videos: []
};

export function searchListReducer(state = searchListInitialState, action: Action) {

    switch(action.type) {
        case SearchActionTypes.SetList: { 
            return { videos: (<SearchPropsAction>action).videos };
        }
        case SearchActionTypes.Reset: {
            return { ...searchListInitialState }
        }
        default: return state;
    }
}
 

