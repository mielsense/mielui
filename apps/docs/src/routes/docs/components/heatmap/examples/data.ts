export const days = Array.from({ length: 182 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 2, 18 + index));
    return {
        date: date.toISOString().slice(0, 10),
        count: index % 7 === 0 ? 0 : (index * 17 + (index % 11)) % 24
    };
});
