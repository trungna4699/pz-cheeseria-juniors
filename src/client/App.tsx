import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import RecentPurchases from './RecentPurchases/RecentPurchases';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};


const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const postPurchases = async (purchasedItems: CartItemType[]): Promise<CartItemType[]> => 
  await (await fetch(`api/purchases`, {
    method: 'POST' ,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(purchasedItems)
  })).json();


const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const [itemTitle, setItemTitle] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemImage, setItemImage] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [showRecentPurchases , setShowRecentPurchases] = useState(false); 

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  console.log("1st data: ",data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handleShowItemDetail = (clickedItem: CartItemType) => {
    setShowDialog(true);
    setItemTitle(clickedItem.title);
    setItemPrice(clickedItem.price);    
    setItemDescription(clickedItem.description);
    setItemCategory(clickedItem.category);
    setItemImage(clickedItem.image);
    console.log("Task1 Done!")
  };

  const purchaseItem = (cartItemsPurchased: CartItemType[]) => {
    postPurchases(cartItemsPurchased);
    console.log(cartItemsPurchased);

    // Reset the cart after purchased
    setCartItems([]);
    setCartOpen(false);  

    console.log("Task2 Done!")
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={() => setShowRecentPurchases(true)}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          purchaseItem={purchaseItem}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} handleShowItemDetail={handleShowItemDetail}/>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle>{itemTitle}</DialogTitle>
            <img src={itemImage} alt={itemTitle}/>
            <div>
              <h3>{itemDescription}</h3>
              <h4>{itemCategory}</h4>
              <h3>{itemPrice}</h3>
            </div>            
      </Dialog>

      <Drawer anchor='left' open={showRecentPurchases} onClose={() => setShowRecentPurchases(false)}>
        <RecentPurchases/>
      </Drawer>

    </Wrapper>

  );
};

export default App;
