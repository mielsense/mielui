const PREFIX = '#theme=';

function toBase64Url(bytes: Uint8Array) {
    let binary = '';
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function fromBase64Url(text: string) {
    const binary = atob(text.replaceAll('-', '+').replaceAll('_', '/'));

    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function pipe(bytes: Uint8Array, transform: CompressionStream | DecompressionStream) {
    const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(transform);

    return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Builds a Studio link that carries the theme in its hash. Nothing is sent to a server. */
export async function themeShareLink(json: string, origin: string) {
    const compact = JSON.stringify(JSON.parse(json));
    const bytes = await pipe(
        new TextEncoder().encode(compact),
        new CompressionStream('deflate-raw')
    );

    return `${origin}/studio${PREFIX}${toBase64Url(bytes)}`;
}

/** Reads the theme JSON from a Studio share link hash, or returns null when there is none. */
export async function readSharedTheme(hash: string) {
    if (!hash.startsWith(PREFIX)) {
        return null;
    }
    const bytes = await pipe(
        fromBase64Url(hash.slice(PREFIX.length)),
        new DecompressionStream('deflate-raw')
    );

    return new TextDecoder().decode(bytes);
}
