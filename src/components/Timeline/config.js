export const TIMELINE_HEIGHT = 80; // 80vh
export const FADE_IN_DELAY = 0.4; // fade out delay beside the first fade in
export const FADE_IN_DURATION = 1 - FADE_IN_DELAY; // fade in delay beside the first fade in


export const getTimelineHeight = (length, offset = 0) => `${((length) * TIMELINE_HEIGHT + offset)}%`;
