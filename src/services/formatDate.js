import {
    format, formatDistanceToNow, isValid
} from 'date-fns';

export const formatDate = (date, type = 'full') => {
    if (!date) return '-';

    const d = new Date(date);

    if (!isValid(d)) return 'Invalid date';

    if (type === 'relative') {
        return formatDistanceToNow(d, { addSuffix: true });
    }

    if (type === 'date') {
        return format(d, 'dd MMM, yyyy');
    }

    if (type === 'time') {
        return format(d, 'hh:mm a');
    }

    // default
    return format(d, 'dd MMM yyyy, hh:mm a');
}