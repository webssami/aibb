import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { Router, Route, Switch, useLocation } from 'wouter';
import ErrorBoundary from './components/ErrorBoundary';
import { ShopProvider, useShop } from './contexts/ShopContext';
import { Header, Footer } from './components/shop/SiteLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Editorial from './pages/Editorial';
import Service from './pages/Service';
import Lookbook from './pages/Lookbook';
import Brand from './pages/Brand';
import Notice from './pages/Notice';
import Event from './pages/Event';
import MyPage from './pages/MyPage';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function AppRoutes() {
  const [location] = useLocation();
  const { setQuery } = useShop();
  useEffect(() => {
    if (!location.startsWith('/shop')) setQuery('');
  }, [location, setQuery]);
  return <>
    <Header />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/event" component={Event} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/cart" component={Cart} />
      <Route path="/event/color-days">{() => <Editorial type="event" />}</Route>
      <Route path="/lookbook">{() => <Lookbook />}</Route>
<Route path="/lookbook/blur">
  {() => <Lookbook initialCategory="look1" />}
</Route>

<Route path="/lookbook/glow">
  {() => <Lookbook initialCategory="look2" />}
</Route>

<Route path="/lookbook/syrup">
  {() => <Lookbook initialCategory="look3" />}
</Route>


      <Route path="/lookbook/soft-glow">{() => <Lookbook initialCategory="look2" />}</Route>
      <Route path="/brand" component={Brand} />
      <Route path="/notice" component={Notice} />
      <Route path="/service" component={Service} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
    <Toaster position="bottom-center" richColors toastOptions={{ className: 'aibb-toast' }} />
  </>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ShopProvider>
        <Router base="/aibb">
          <AppRoutes />
        </Router>
      </ShopProvider>
    </ErrorBoundary>
    );
}
