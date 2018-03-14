export const numerical = value => {
    const chunked = Array.from(`${value}`).reduceRight((chunks, el) => {
        if (chunks[chunks.length - 1].length === 3) {
            return [...chunks, [el]];
        }

        chunks[chunks.length - 1].unshift(el);

        return chunks;
    }, [[]]);

    const formatted = chunked
        .reduce((formatted, chunk) => [chunk.join(''), ...formatted], [])
        .join(',');

    return formatted;
};
