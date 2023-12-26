export function isAbsolute(value: string) {
    const layers = [
        'entities',
        'pages',
        'widgets',
        'shared',
        'app',
        'features',
    ];

    if (layers.some((layer) => value.startsWith(layer))) {
        return true;
    }

    return false;
}
