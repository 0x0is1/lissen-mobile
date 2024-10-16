export default function generateEmoji() {
        const emoticonRangeStart = 0x1F600;
        const emoticonRangeEnd = 0x1F64F;
        const randomCodePoint = Math.floor(Math.random() * (emoticonRangeEnd - emoticonRangeStart + 1)) + emoticonRangeStart;
        return String.fromCodePoint(randomCodePoint);
}