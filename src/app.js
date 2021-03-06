import { useEffect, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StoreContext } from './store';
import { productsReducer } from './store/reducer';
import { initialState } from './store/state';
import { Layout } from './components/Layout';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { OrderPage } from './pages/OrderPage';
import * as types from './store/actions';
import { fetchService } from './api/fetchService';


function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const fetchData = useCallback(async () => {

    const categories = await fetchService.fetchCategories();
    dispatch({
      type: types.FETCH_CATEGORIES,
      payload: categories,
    });
    dispatch({
      type: types.SET_LOADING,
      payload: false
    });
    dispatch({
      type: types.SYNC_FROM_LOCALSTORAGE
    })
  }, [dispatch]);

  useEffect(() => {
    fetchData()
  }, [dispatch, fetchData])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Router>
        <Layout>
          <Route exact path="/delivery-app" component={CategoriesPage} />
          <Route path="/delivery-app/categories/:id" component={ProductsPage} />
          <Route path="/delivery-app/products" component={ProductsPage} />
          <Route path="/delivery-app/product/:id" component={ProductPage} />
          <Route path="/delivery-app/cart" component={CartPage} />
          <Route path="/delivery-app/order" component={OrderPage} />
        </Layout>
      </Router>
    </StoreContext.Provider>
  )
}

export {
  App
}