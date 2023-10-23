import { Action } from "@ngrx/store";
import { Video } from "../model/video";

export enum SearchActionTypes {
    SetList = "[Search] SetList",
    Reset = "[Search] Reset"
}

export interface SearchProps { videos: Video[] };

export class SearchActionWithProps {
    videos: Video[];

    constructor({ videos }: SearchProps) {
        this.videos = videos;
    }
}

   
export class SetList extends SearchActionWithProps implements Action {
    type = SearchActionTypes.SetList;

    constructor(props: SearchProps) {
        super(props);
    }
}

export class Reset extends SearchActionWithProps implements Action {
    type = SearchActionTypes.Reset;

    constructor(props: SearchProps) {
        super(props);
    }
}