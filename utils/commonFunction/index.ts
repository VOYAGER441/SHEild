/**
 * Converts a hex color (e.g. "#FF0000", "#F00", "#FF000080") to an rgba() string.
 * @param hex - The hex color string (with or without "#")
 * @param alpha - Optional alpha value (0–1)
 * @returns A valid CSS rgba() string usable in React Native
 */
const hexToRgba = (hex: string, alpha: number = 1): string => {
    if (!hex) return `rgba(0, 0, 0, ${alpha})`;

    // Remove "#" if present
    let cleanedHex = hex.replace('#', '');

    // Handle short hex (#F00 → #FF0000)
    if (cleanedHex.length === 3) {
        cleanedHex = cleanedHex
            .split('')
            .map((char) => char + char)
            .join('');
    }

    // Handle 8-character hex with alpha (#RRGGBBAA)
    if (cleanedHex.length === 8) {
        const r = parseInt(cleanedHex.slice(0, 2), 16);
        const g = parseInt(cleanedHex.slice(2, 4), 16);
        const b = parseInt(cleanedHex.slice(4, 6), 16);
        const a = parseInt(cleanedHex.slice(6, 8), 16) / 255;
        return `rgba(${r}, ${g}, ${b}, ${a * alpha})`;
    }

    // Default 6-character hex (#RRGGBB)
    if (cleanedHex.length === 6) {
        const r = parseInt(cleanedHex.slice(0, 2), 16);
        const g = parseInt(cleanedHex.slice(2, 4), 16);
        const b = parseInt(cleanedHex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Fallback color
    return `rgba(0, 0, 0, ${alpha})`;
};

/**
 * Lightens or darkens a hex color by a percentage.
 * @param hex - The hex color string (e.g. "#E76F51")
 * @param amount - Positive to lighten, negative to darken (e.g. 0.2 = 20%)
 */
const adjustColorBrightness = (hex: string, amount: number): string => {
    let cleanedHex = hex.replace('#', '');

    if (cleanedHex.length === 3) {
        cleanedHex = cleanedHex.split('').map((c) => c + c).join('');
    }

    const num = parseInt(cleanedHex, 16);
    let r = (num >> 16) + Math.round(255 * amount);
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * amount);
    let b = (num & 0x0000ff) + Math.round(255 * amount);

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};


/**
 * Encodes a value to a Base64 string.
 * @param value - The value to encode.
 */
const encodeBase64 = (value: any): string => {
    try {
        const str = typeof value === 'string' ? value : JSON.stringify(value);
        return btoa(str);
    } catch (error) {
        return '';
    }
};

/**
 * Decodes a Base64 string.
 * @param base64 - The Base64 string to decode.
 */
const decodeBase64 = (base64: string): string => {
    try {
        return atob(base64);
    } catch (error) {
        return '';
    }
};



export {
    hexToRgba,
    adjustColorBrightness,
    encodeBase64,
    decodeBase64
}