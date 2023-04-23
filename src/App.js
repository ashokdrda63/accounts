import './App.css';
import DropDownVoucher from './components/DropDownVoucher';
import VoucherEntry from './components/VoucherEntry';
import AccountMaster from './components/AccountMaster';
import BudgetMaster from './components/BudgetMaster';
import SchemeMaster from './components/SchemeMaster';
import AccountEntryScheme from './components/AccountEntryScheme';
import AccountEntry from './components/AccountEntry';
import ObMaster from './components/ObMaster';
import AccEnt from './components/AccEnt';
import ObmasterTable from './components/ObMasterTable';
import TableEntryTest from './components/TableEnteryTest';
import VoutcherEntryTable from './components/VoutcherEntryTable';
import AtrocityEntryTest from './components/AtrocityEntryTest';
import Dashboard from './components/DashBoard';
import ListItems from "./components/ListItems";
import Header from "./NewComp/Header";
import DayBook from './components/DayBook';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/Scheme-Entries" component={SchemeMaster} />
          <Route path="/Bud-Acc-Entries" component={AccEnt} />
          <Route path="/Voucher-Entry" component={VoucherEntry} />
          <Route path="/DayBook" component={DayBook} />
          <Route Path="/OB-master-Entry" component={ObMaster} />
        </Switch>
      </Router>
      <>
        {/* <DayBook /> */}
        {/* <AccEnt /> */}
        {/* <AccountMaster/> */}
      </>
    </>
  )
}

export default App;


