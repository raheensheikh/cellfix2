import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/redux/index"; // adjust path if needed
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe('pk_test_51RWO1nE9VVzqITqvrD8jNDdHLNWld12LRa78qapFBBGkekYSZk5vmWPxgaNTEijCFmsoS3SqQdk9Gmp7aDEMQqkc00h0jQZQTY');
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Elements>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
