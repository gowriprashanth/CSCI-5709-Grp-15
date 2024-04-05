import { Switch, Route } from "react-router-dom";
import Analytics from "./pages/Analytics";
import SignIn from "./pages/signin/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.min.css";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
import SignUp from "./pages/signup/SignUp";
import LandingPage from "./components/layout/LandingPage/LandingPage";
import ForgotPassword from "./pages/forget-password/ForgetPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Dashboard from "./pages/home/Dashboard";
import Settings from "./pages/settings";
import FAQ from "./pages/faq";
import TicketDetail from "./components/Tickets/TicketDetail";
import TicketHistory from "./components/Tickets/TicketHistory";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Main>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/analytics" component={Analytics} />
          <Route exact path="/profile" component={Settings} />
          <Route exact path="/knowledge-base" component={FAQ} />
          <Route exact path="/ticket-detail" component={TicketDetail} />
          <Route exact path="/archived-tickets" component={TicketHistory} />
          {/* <Redirect from="*" to="/" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
