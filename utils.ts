export function random(len: number): string {
    const options = "sdfjkdfaksjfahsada12345678";
    const length = options.length;
    let ans = "";

    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }

    return ans;
}
