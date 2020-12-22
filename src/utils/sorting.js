const item1First = -1;

export const sortAlphaByParam = (data, param, tieBreak) => data.sort((item1, item2) => {
    if (item1.name.[param] === item2.name.[param]) {
        if (item1.name.[tieBreak] < item2.name.[tieBreak]) {
            return item1First;
        }

        if (item1.name.[tieBreak] > item2.name.[tieBreak]) {
            return 1;
        }
    }

    if (item1.name.[param] < item2.name.[param]) {
        return item1First;
    }

    if (item1.name.[param] > item2.name.[param]) {
        return 1;
    }

    return 0;
});
