export const getPathName = (string: string) => {
    return "/" + string.toLowerCase().split(" ").join("_");
}