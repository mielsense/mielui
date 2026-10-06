export type SearchEntry = {
    label: string;
    hint: string;
    href: string;
};

export type SearchIndex = {
    sections: SearchEntry[];
    props: SearchEntry[];
};
