import App from "./App";

App.listen(Bun.env.PORT || 3000, () => {
    console.log('Server is Running!');
});