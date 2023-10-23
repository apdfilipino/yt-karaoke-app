import { Action } from '@ngrx/store';
import { Video } from '../model/video';
import { VideoActionTypes, VideoActionWithProps } from "./video.actions";

export interface VideoState {
    activeVideo: Video;
    playlist: Video[];
}

type VideoPropsAction = Action & VideoActionWithProps;

export const videosInitialState: VideoState = {
    activeVideo: {
        videoId: '',
        thumbnailUrl: '',
        title: ''
    },
    playlist: []
};

export function videosReducer(state = videosInitialState, action: Action) {
    const stateCopy = { ...state };
    const video = (<VideoPropsAction>action).video;
    switch(action.type) {
        case VideoActionTypes.Queue: {
            const isPriority = (<VideoPropsAction>action).isPriority;
            if (stateCopy.playlist.length === 0) stateCopy.playlist = [ video ];                
            else if (!isPriority) stateCopy.playlist = [ ...stateCopy.playlist, video ];
            else {
                const [ active, ...remaining ] = stateCopy.playlist;
                stateCopy.playlist = [ active, video, ...remaining ];
            }
            if (state.playlist.length === 0) {
                stateCopy.activeVideo = stateCopy.playlist[0];
            }
            return stateCopy;
        }
        case VideoActionTypes.SetActive: { 
            stateCopy.activeVideo = video;
            return stateCopy;
        }
        case VideoActionTypes.Remove: {
            const removeIndex = (<VideoPropsAction>action).removeIndex;
            stateCopy.playlist = stateCopy.playlist.filter((v, i) => i !== removeIndex);
            if (stateCopy.playlist.length === 0) {
                stateCopy.activeVideo = {
                    videoId: '',
                    thumbnailUrl: '',
                    title: ''
                };
            } else {
                stateCopy.activeVideo = stateCopy.playlist[0];
            }
            return stateCopy;
        }
        case VideoActionTypes.PlayNext: {
            const index = (<VideoPropsAction>action).removeIndex ?? 0;
            const playlistCopy = [ ...stateCopy.playlist ];
            const playNext = { ...playlistCopy[index] };
            const removedCopy = playlistCopy.filter((v, i) => i !== index);
            removedCopy[0] = playNext;
            stateCopy.playlist = [ ...removedCopy ];
            stateCopy.activeVideo = stateCopy.playlist[0];
            return stateCopy;
        }
        case VideoActionTypes.Move: {
            const index = (<VideoPropsAction>action).moveIndex ?? 0;
            const upDown = (<VideoPropsAction>action).upDown ?? 0;
            const playlistCopy = [ ...stateCopy.playlist ];
            const newIndex = { ...playlistCopy[index - upDown] };
            const present = { ...playlistCopy[index] };
            playlistCopy[index] = newIndex;
            playlistCopy[index - upDown] = present;
            stateCopy.playlist = [ ...playlistCopy ];
            return stateCopy;
        }
        default: return state;
    }
}
 

