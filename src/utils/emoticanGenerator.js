export default function generateEmoji() {
        const cuteEmojis = [
                0x1F60A, // Smiling Face with Smiling Eyes
                0x1F60D, // Smiling Face with Heart-Eyes
                0x1F618, // Face Blowing a Kiss
                0x1F61A, // Kissing Face with Closed Eyes
                0x1F970, // Smiling Face with Hearts
                0x1F63A, // Smiling Cat Face with Open Mouth
                0x1F638, // Grinning Cat Face with Smiling Eyes
                0x1F431, // Cat Face
                0x1F436, // Dog Face
                0x1F42D, // Mouse Face
                0x1F430, // Rabbit Face
                0x1F43C, // Panda Face
                0x1F981, // Lion Face
                0x1F42F, // Tiger Face
                0x1F439, // Hamster Face
                0x1F43B, // Bear Face
                0x1F43A, // Wolf Face
                0x1F424, // Chick
                0x1F426, // Bird
                0x1F427, // Penguin
                0x1F43D, // Pig Nose
                0x1F428, // Koala
                0x1F98B, // Butterfly
                0x1F98E, // Lizard
                0x1F984, // Unicorn Face
                0x1F493, // Beating Heart
                0x1F496, // Sparkling Heart
                0x1F49B, // Yellow Heart
                0x1F49A, // Green Heart
                0x1F499, // Blue Heart
                0x1F49C, // Purple Heart
                0x1F495, // Two Hearts
                0x1F48B, // Kiss Mark
                0x1F44D, // Thumbs Up
                0x1F44C, // OK Hand
                0x1F44F, // Clapping Hands
                0x1F389, // Party Popper
                0x1F381, // Wrapped Gift
                0x1F3C6, // Trophy
                0x1F37E, // Bottle with Popping Cork
                0x1F9E1, // Orange Heart
                0x1F9E2, // Party Hat
                0x1F497, // Growing Heart
                0x1F9F8, // Teddy Bear
                0x1F43E, // Paw Prints
                0x1F430, // Rabbit Face
                0x1F98A, // Fox Face
                0x1F99D, // Raccoon
                0x1F43F, // Chipmunk
                0x1F425, // Front-Facing Baby Chick
                0x1F418, // Elephant
                0x1F422, // Turtle
                0x1F98C, // Deer
                0x1F40C, // Snail
                0x1F43B, // Bear Face
                0x1F987, // Bat
                0x1F419, // Octopus
                0x1F41F, // Fish
                0x1F996, // T-Rex
        ];

        const randomEmoji = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];
        return String.fromCodePoint(randomEmoji);
}
