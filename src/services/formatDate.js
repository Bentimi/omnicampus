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

    if (type === 'normal') {
        return format(d, 'yyyy-MM-dd')
    }

    // default
    return format(d, 'dd MMM yyyy, hh:mm a');
}