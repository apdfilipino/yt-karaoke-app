import { Action } from "@ngrx/store";
import { Video } from "../model/video";

export enum VideoActionTypes {
    Queue = "[Video] Queue",
    Remove = "[Video] Remove",
    SetActive = "[Video] SetActive",
    PlayNext = "[Video] PlayNext",
    Move = "[Video] Move"
}

export interface VideoProps { 
    video: Video,
    isPriority?: boolean,
    removeIndex?: number,
    moveIndex?: number,
    upDown?: number
};

export class VideoActionWithProps {
    video: Video;
    isPriority?: boolean;
    removeIndex?: number;
    moveIndex?: number;
    upDown?: number;

    constructor({ video, isPriority, removeIndex, moveIndex, upDown }: VideoProps) {
        this.video = video;
        this.isPriority = isPriority;
        this.removeIndex = removeIndex;
        this.moveIndex = moveIndex;
        this.upDown = upDown;
    }
}

   
export class Queue extends VideoActionWithProps implements Action {
    type = VideoActionTypes.Queue;

    constructor(props: VideoProps) {
        super(props);
    }
}

export class Remove extends VideoActionWithProps implements Action {
    type = VideoActionTypes.Remove;

    constructor(props: VideoProps) {
        super(props);
    }
}

export class SetActive extends VideoActionWithProps implements Action {
    type = VideoActionTypes.Queue;

    constructor(props: VideoProps) {
        super(props);
    }
}

export class Move extends VideoActionWithProps implements Action {
    type = VideoActionTypes.Move;

    constructor(props: VideoProps) {
        super(props);
    }
}

export class Play extends VideoActionWithProps implements Action {
    type = VideoActionTypes.PlayNext;
    constructor(props: VideoProps) {
        super(props);
    }
}