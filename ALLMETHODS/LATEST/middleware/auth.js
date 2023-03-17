// AUTH

export const auth = (req, res, next) => {
    if (req.session.user) {
        console.log('logged in');
        next();
    } else {
        console.log("not logged in");
        next();
    }
}