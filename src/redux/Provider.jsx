import { Provider } from "react-redux"; // import provider trong react-redux
import { store } from "./store"; // nhúng store vào

// tạo function Provider
// Children là các component con nó được truyền cái props sẽ được hưởng tất cả những gì trong store
// Nó được thừa kế, được truyền vô props store
// => Sau đó đi nhúng Provider vô app => layout.js
// => Nhúng Provider vô trên header đưới footer trong layout.js
function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
